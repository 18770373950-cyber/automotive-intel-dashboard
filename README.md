# automotive-intel-dashboard

## 发布前数据校验

每次修改 `data.js` 后，必须先运行：

```bash
node scripts/validate-data.js
```

校验覆盖全局 ID、seedId、模块归属、必填字段、日期与来源格式、日报同事件重复、发布会日历精确重复、重点监控车型重复及跨车型复制污染。GitHub Actions 会在每次提交到 `main` 时重复执行校验。
