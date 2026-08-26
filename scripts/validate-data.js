#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const dataPath = path.join(root, 'data.js');
const indexPath = path.join(root, 'index.html');
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(dataPath, 'utf8'), sandbox, { filename: dataPath });
const data = sandbox.window.SPEED_INTELLIGENCE_DATA;
const errors = [];

function text(value) { return String(value || '').trim(); }
function compact(value) { return text(value).toLowerCase().replace(/[\s·._#\-—–]/g, ''); }
function brand(value) {
  const key = compact(value);
  return ({ 比亚迪王朝网: '比亚迪', 岚图汽车: '岚图', 奇瑞风云: '奇瑞', 奕境汽车: '奕境',
    小鹏汽车: '小鹏', 理想汽车: '理想', 零跑汽车: '零跑', 梅赛德斯奔驰: '奔驰',
    上汽通用五菱: '五菱', 阿维塔汽车: '阿维塔' })[key] || key;
}
function model(value, normalizedBrand) {
  let key = compact(value).replace(/^(全新|新一代|2027款)/, '');
  const token = ({ 岚图: '岚图', 奇瑞: '奇瑞', 比亚迪: '比亚迪', 奕境: '奕境', 小鹏: '小鹏',
    理想: '理想', 零跑: '零跑', 奔驰: '奔驰', 五菱: '五菱', 极氪: '极氪', 领克: '领克',
    腾势: '腾势', 星途: '星途', 阿维塔: '阿维塔' })[normalizedBrand];
  if (token && key.startsWith(token)) key = key.slice(token.length);
  if (normalizedBrand === '东风奕派' && key === 'eπm8') key = 'm8';
  return key;
}
function vehicleKey(record) {
  const normalizedBrand = brand(record.brand);
  return `${normalizedBrand}|${model(record.model || record.title, normalizedBrand)}`;
}
function duplicateCheck(records, keyFn, label) {
  const seen = new Map();
  records.forEach((record, index) => {
    const key = keyFn(record);
    if (seen.has(key)) errors.push(`${label}重复：${key}（第${seen.get(key) + 1}、${index + 1}条）`);
    else seen.set(key, index);
  });
}

if (!data || typeof data !== 'object') errors.push('未找到 SPEED_INTELLIGENCE_DATA');
const expectedType = { daily: 'news', calendar: 'calendar', watches: 'watch' };
const all = [];
for (const section of Object.keys(expectedType)) {
  if (!Array.isArray(data[section])) {
    errors.push(`${section} 不是数组`);
    continue;
  }
  data[section].forEach((record, index) => {
    all.push({ record, section, index });
    const label = `${section}[${index}] ${record.brand || ''}/${record.model || ''}`;
    for (const field of ['id', 'seedId', 'type', 'brand', 'model', 'title', 'sourceName', 'sourceUrl', 'updatedAt']) {
      if (!text(record[field])) errors.push(`${label} 缺少 ${field}`);
    }
    if (record.type !== expectedType[section]) errors.push(`${label} type应为${expectedType[section]}，实际为${record.type}`);
    if (record.eventDate && !/^\d{4}-\d{2}-\d{2}$/.test(record.eventDate)) errors.push(`${label} eventDate格式错误`);
    if (record.updatedAt && !/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(record.updatedAt)) errors.push(`${label} updatedAt格式错误`);
    for (const field of ['sourceUrl', 'secondSourceUrl']) {
      if (text(record[field]) && !/^https?:\/\//.test(record[field])) errors.push(`${label} ${field}不是有效HTTP地址`);
    }
    if (text(record.sourceLevel).includes('A+B') && (!text(record.secondSourceName) || !text(record.secondSourceUrl))) {
      errors.push(`${label} 标记A+B但缺少完整第二来源`);
    }
  });
}

duplicateCheck(all, item => String(item.record.id), '全局ID');
duplicateCheck(all, item => item.record.seedId, '全局seedId');
duplicateCheck(data.watches || [], vehicleKey, '重点监控车型');
duplicateCheck(data.daily || [], record => [record.brand, record.model, record.eventDate,
  record.launchStatus, record.summary].map(text).join('|'), '日报同事件');
duplicateCheck(data.calendar || [], record => [record.brand, record.model, record.category,
  record.eventDate, record.launchTime, record.launchStatus].map(text).join('|'), '日历精确节点');

// Detect copy/paste contamination: an identical content/source/price block must
// not be attached to different vehicles.
const fingerprints = new Map();
for (const { record, section, index } of all) {
  const fingerprint = ['summary', 'sourceUrl', 'secondSourceUrl', 'preSalePrice',
    'launchPrice', 'rightsPrice', 'benefitPrice', 'baasPrice'].map(key => text(record[key])).join('|');
  if (!text(record.summary)) continue;
  const previous = fingerprints.get(fingerprint);
  const hasPrice = ['preSalePrice', 'launchPrice', 'rightsPrice', 'benefitPrice', 'baasPrice']
    .some(key => text(record[key]));
  const differentBrand = previous && brand(previous.record.brand) !== brand(record.brand);
  const genericMonitor = compact(previous?.record.model) === '重点车型' || compact(record.model) === '重点车型';
  if (previous && hasPrice && differentBrand && !genericMonitor && vehicleKey(previous.record) !== vehicleKey(record)) {
    errors.push(`疑似跨车型复制污染：${previous.section}[${previous.index}] 与 ${section}[${index}]`);
  } else fingerprints.set(fingerprint, { record, section, index });
}

const html = fs.readFileSync(indexPath, 'utf8');
if (html.includes('open(r.id)') || html.includes("find(x=>x.id===id)")) {
  errors.push('页面重新使用了仅按ID查找记录的旧逻辑，可能导致点击错配');
}
if (!html.includes('tr.onclick=()=>open(r)') || !html.includes('normalizeRecordKeys')) {
  errors.push('页面缺少对象级点击绑定或本地记录唯一性保护');
}
for (const match of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
  try { new Function(match[1]); } catch (error) { errors.push(`页面脚本语法错误：${error.message}`); }
}

if (errors.length) {
  console.error(`数据校验失败（${errors.length}项）：`);
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`数据校验通过：daily ${data.daily.length}、calendar ${data.calendar.length}、watches ${data.watches.length}，全局ID与seedId均唯一。`);
