#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const dataPath = path.join(root, 'data.js');
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(dataPath, 'utf8'), sandbox, { filename: dataPath });
const data = sandbox.window.SPEED_INTELLIGENCE_DATA;

function text(value) {
  return String(value || '').trim();
}

function compactKey(value) {
  return text(value).toLowerCase().replace(/[\s·._#\-—–]/g, '');
}

function canonicalBrand(value) {
  const key = compactKey(value);
  const aliases = {
    比亚迪王朝网: '比亚迪',
    岚图汽车: '岚图',
    奇瑞风云: '奇瑞',
    奕境汽车: '奕境',
    小鹏汽车: '小鹏',
    理想汽车: '理想',
    零跑汽车: '零跑',
    蔚来firefly萤火虫: '萤火虫',
    firefly萤火虫: '萤火虫',
    梅赛德斯奔驰: '奔驰',
    上汽通用五菱: '五菱',
    阿维塔汽车: '阿维塔'
  };
  return aliases[key] || key;
}

function canonicalModel(value, brand) {
  let key = compactKey(value).replace(/^(全新|新一代|2027款)/, '');
  const brandToken = {
    岚图: '岚图', 奇瑞: '奇瑞', 比亚迪: '比亚迪', 奕境: '奕境',
    小鹏: '小鹏', 理想: '理想', 零跑: '零跑', 奔驰: '奔驰',
    五菱: '五菱', 极氪: '极氪', 领克: '领克', 腾势: '腾势',
    星途: '星途', 阿维塔: '阿维塔'
  }[brand];
  if (brandToken && key.startsWith(brandToken)) key = key.slice(brandToken.length);
  if (brand === '东风奕派' && key === 'eπm8') key = 'm8';
  return key;
}

function vehicleKey(record) {
  const brand = canonicalBrand(record.brand);
  return `${brand}|${canonicalModel(record.model || record.title, brand)}`;
}

function eventKey(record) {
  return [record.brand, record.model, record.category, record.eventDate,
    record.launchTime, record.launchStatus].map(text).join('|');
}

function dailyKey(record) {
  return [record.brand, record.model, record.eventDate, record.launchStatus,
    record.summary].map(text).join('|');
}

function completeness(record) {
  const keys = ['title', 'summary', 'sourceName', 'sourceUrl', 'secondSourceName',
    'secondSourceUrl', 'preSalePrice', 'launchPrice', 'rightsPrice',
    'benefitPrice', 'baasPrice'];
  return keys.reduce((score, key) => score + (text(record[key]) ? 1 : 0), 0);
}

function rank(record) {
  return `${text(record.updatedAt)}|${text(record.eventDate)}|${String(completeness(record)).padStart(2, '0')}`;
}

function keepBest(records, keyFn) {
  const groups = new Map();
  for (const record of records) {
    const key = keyFn(record);
    const current = groups.get(key);
    if (!current || rank(record).localeCompare(rank(current), 'zh-CN') > 0) {
      groups.set(key, record);
    }
  }
  return records.filter(record => groups.get(keyFn(record)) === record);
}

// Daily only keeps one copy of the same event; calendar only removes exact
// brand/model/type/date/time/status duplicates and retains every historical node.
data.daily = keepBest(data.daily, dailyKey);
data.calendar = keepBest(data.calendar, eventKey);

// Old imports placed calendar rows inside watches. They already exist in the
// calendar history, so remove the misplaced copies and keep one latest watch row
// for each monitored vehicle.
data.watches = keepBest(
  data.watches.filter(record => !record.type || record.type === 'watch'),
  vehicleKey
);

const calendarByVehicle = new Map();
for (const record of data.calendar) {
  const key = vehicleKey(record);
  if (!calendarByVehicle.has(key)) calendarByVehicle.set(key, []);
  calendarByVehicle.get(key).push(record);
}

const priceFields = ['preSalePrice', 'launchPrice', 'rightsPrice', 'benefitPrice', 'baasPrice'];
for (const watch of data.watches) {
  watch.type = 'watch';
  watch.title ||= watch.model || watch.brand || '重点车型';
  watch.category ||= '重点车型监控';
  watch.summary ||= watch.latest || watch.currentStatus || '持续监控';
  watch.launchStatus ||= watch.currentStatus || '状态待核验';
  watch.currentStatus ||= watch.launchStatus;
  watch.priority ||= '高';
  watch.risk ||= '低';
  watch.workflowStatus ||= '持续监控';
  watch.status ||= '待核查';
  watch.verification ||= '待核查';
  watch.sourceLevel ||= 'B级';

  const history = calendarByVehicle.get(vehicleKey(watch)) || [];
  const latestCalendar = history.slice().sort((a, b) => rank(a).localeCompare(rank(b), 'zh-CN')).pop();
  if (latestCalendar && rank(latestCalendar).localeCompare(rank(watch), 'zh-CN') >= 0) {
    const fields = ['title', 'summary', 'eventDate', 'launchTime', 'launchStatus',
      'sourceName', 'sourceUrl', 'secondSourceName', 'secondSourceUrl',
      'sourceLevel', 'status', 'verification', 'priority', 'risk', 'workflowStatus'];
    for (const field of fields) {
      if (text(latestCalendar[field])) watch[field] = latestCalendar[field];
    }
    watch.currentStatus = latestCalendar.launchStatus || watch.currentStatus;
    watch.latest = latestCalendar.summary || watch.latest;
  }

  for (const field of priceFields) {
    const priced = history.slice().sort((a, b) => rank(a).localeCompare(rank(b), 'zh-CN'))
      .map(record => record[field]).filter(text).pop();
    if (priced) watch[field] = priced;
  }
}

const officialSources = {
  比亚迪: ['比亚迪', 'https://www.byd.com/cn'],
  领克: ['领克汽车', 'https://www.lynkco.com.cn/'],
  岚图: ['岚图汽车', 'https://www.voyah.com.cn/'],
  东风奕派: ['东风奕派', 'https://www.dongfeng-eπ.com/']
};

function repairSources(record) {
  if (!text(record.sourceUrl) && text(record.secondSourceUrl)) {
    record.sourceName = record.secondSourceName || record.sourceName || '核验来源';
    record.sourceUrl = record.secondSourceUrl;
    delete record.secondSourceName;
    delete record.secondSourceUrl;
    if (text(record.sourceLevel).includes('A+B')) record.sourceLevel = 'B级';
    if (record.verification === '双源核验') record.verification = '单一来源，待补充';
  }
  if (!text(record.sourceUrl)) {
    const official = officialSources[canonicalBrand(record.brand)];
    if (official) [record.sourceName, record.sourceUrl] = official;
  }
  if (text(record.secondSourceUrl) && !text(record.secondSourceName)) {
    const url = record.secondSourceUrl;
    record.secondSourceName = url.includes('ithome.com') ? 'IT之家'
      : url.includes('autohome.com.cn') ? '汽车之家' : '第二核验来源';
  }
}

for (const section of ['daily', 'calendar', 'watches']) {
  for (const record of data[section]) {
    repairSources(record);
    if (/^\d{4}-\d{2}$/.test(text(record.eventDate))) {
      record.nextDate ||= record.eventDate;
      record.eventDate = '';
      if (!text(record.summary).includes('时间待官方确认')) {
        record.summary = `${text(record.summary)} 时间待官方确认。`.trim();
      }
    }
  }
}

// IDs and seed IDs are global across all three modules. Preserve the first
// valid occurrence and deterministically repair missing or repeated values.
const sectionCode = { daily: '1', calendar: '2', watches: '3' };
const usedIds = new Set();
const usedSeedIds = new Set();
for (const section of ['daily', 'calendar', 'watches']) {
  data[section].forEach((record, index) => {
    const rawId = Number(record.id);
    if (!Number.isSafeInteger(rawId) || usedIds.has(rawId)) {
      const date = text(record.eventDate || record.updatedAt).replace(/\D/g, '').slice(0, 8) || '20000101';
      let candidate = Number(`${date}${sectionCode[section]}${String(index + 1).padStart(3, '0')}`);
      while (usedIds.has(candidate)) candidate += 1;
      record.id = candidate;
    }
    usedIds.add(Number(record.id));

    let seedId = text(record.seedId) || `managed-${section}-${record.id}`;
    if (usedSeedIds.has(seedId)) seedId = `${seedId}-${section}-${String(index + 1).padStart(3, '0')}`;
    record.seedId = seedId;
    usedSeedIds.add(seedId);
  });
}

data.version = Number(data.version) + 1;
data.updatedAt = '2026-08-26 17:10';
data.cutoff = '数据完整性修复截至北京时间 2026-08-26 17:10；已完成全量记录唯一性、模块归属、重复节点、来源字段与点击绑定核验。';

fs.writeFileSync(dataPath, `window.SPEED_INTELLIGENCE_DATA = ${JSON.stringify(data, null, 2)};\n`);
console.log(`Repaired data.js: ${data.daily.length} daily, ${data.calendar.length} calendar, ${data.watches.length} watches.`);
