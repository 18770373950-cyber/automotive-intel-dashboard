(()=>{
"use strict";
let id=202607170000;
const r=(category,title,brand,model,summary,eventDate,sourceName,sourceUrl,secondSourceName="",secondSourceUrl="",extra={})=>({
  id:++id,seedId:"managed-"+id,type:"news",title,brand,model,category,summary,eventDate,
  launchTime:"",launchStatus:"",sourceName,sourceUrl,secondSourceName,secondSourceUrl,
  sourceLevel:"B级",status:"已官宣",verification:secondSourceUrl?"已完成":"单一来源",
  industryAngle:"",priority:"高",risk:"低",workflowStatus:"持续监控",
  updatedAt:"2026-07-17 10:00",...extra
});
const daily=[
r("昨日热点","五部门开展2026年新能源汽车下乡活动","行业","新能源汽车下乡","活动继续推动汽车以旧换新向县乡市场延伸，效果取决于地方补贴、补能和售后覆盖。","2026-07-16","财联社（引五部门通知）","https://www.cls.cn/detail/2427918","","",{industryAngle:"政策触达不等于终端转化，需继续跟踪县乡交付与补能数据。"}),
r("昨日热点","6月乘用车零售预计约165万辆","行业","乘用车市场","乘联分会预计6月乘用车零售约165万辆、环比增长9.3%。","2026-07-16","财联社（引乘联分会）","https://www.cls.cn/detail/2427918","","",{industryAngle:"仍需结合同比基数、终端折扣和新能源渗透率判断真实景气度。"}),
r("昨日热点","7月16日多家车企集中发布新车","行业","新车市场","理想、小鹏、零跑、魏牌、智己和五菱等同日发布，覆盖约10万至35万元价格带。","2026-07-16","新浪财经","https://finance.sina.com.cn/wm/2026-07-16/doc-inihzmms7634368.shtml","腾讯新闻","https://news.qq.com/rain/a/20260716A0BZ3Z00",{industryAngle:"同日发布提高注意力竞争，也加快主流价格带的配置下探。"}),
r("昨日热点","新一代理想L6正式上市：24.98万元","理想汽车","理想L6","仅提供Ultra版本，统一零售价24.98万元，计划发布后一周内启动交付。","2026-07-16","搜狐汽车","https://www.sohu.com/a/1051218894_430526","新浪财经","https://finance.sina.com.cn/wm/2026-07-16/doc-inihzfcw4474140.shtml",{launchStatus:"已上市",industryAngle:"选装套件不能计入统一零售价，实际成交价需按具体选装计算。"}),
r("昨日热点","小鹏MONA L03正式上市：12.38万元起","小鹏汽车","MONA L03","中国市场纯电和增程车型起售价均为12.38万元，增程版计划8月下旬交付。","2026-07-16","小鹏汽车官方","https://www.xiaopeng.com/news/company_news/5579.html","新浪财经","https://finance.sina.com.cn/wm/2026-07-16/doc-inihzmms7634368.shtml",{launchStatus:"已上市",sourceLevel:"A级",industryAngle:"中国与欧洲车型的售价、法规配置和交付节奏必须分开表述。"}),
r("昨日热点","零跑B01/B10焕新上市","零跑汽车","B01 / B10","B01售价9.58万—11.98万元，B10售价9.98万—12.58万元。","2026-07-16","新浪财经","https://finance.sina.com.cn/wm/2026-07-16/doc-inihzmms7634368.shtml","腾讯新闻","https://news.qq.com/rain/a/20260716A0BZ3Z00",{launchStatus:"已上市",industryAngle:"800V与SA8295P下探至10万元级，但需逐版本核对标配与选装。"}),
r("昨日热点","魏牌V9X家庭版上市：33.18万元起","魏牌","V9X家庭版","指导价33.18万元起，限时权益后31.68万元起。","2026-07-16","新浪财经","https://finance.sina.com.cn/wm/2026-07-16/doc-inihzmms7634368.shtml","腾讯新闻","https://news.qq.com/rain/a/20260716A0BZ3Z00",{launchStatus:"已上市",industryAngle:"指导价和限时权益价不能混用，权益有效期需另行核对。"}),
r("昨日热点","智己LS9 Hyper上市：权益价34.98万元","智己汽车","LS9 Hyper","Hyper版本权益价34.98万元，LS9全系权益价31.98万元起。","2026-07-16","腾讯新闻","https://news.qq.com/rain/a/20260716A0BZ3Z00","新浪财经","https://finance.sina.com.cn/wm/2026-07-16/doc-inihzmms7634368.shtml",{launchStatus:"已上市",industryAngle:"高配技术能力不能直接表述为全系标配。"}),
r("昨日热点","五菱星光L上市：指导价11.28万—13.58万元","上汽通用五菱","星光L","上市权益价10.98万元起，低于此前预售权益价。","2026-07-16","搜狐车型库","https://db.auto.sohu.com/model_7816","新浪财经","https://finance.sina.com.cn/wm/2026-07-16/doc-inihzmms7634368.shtml",{launchStatus:"已上市",industryAngle:"需区分指导价、限时权益价及预售用户权益。"}),
r("昨日热点","小鹏延长X9前空气弹簧质保","小鹏汽车","小鹏X9","前空气弹簧质保调整为8年或16万公里，且不受车辆所有权人变更影响。","2026-07-16","IT之家汽车","https://auto.ithome.com/ev","","",{industryAngle:"单一可靠来源；需继续核对适用车型批次、执行范围及官方完整条款。"}),

r("今日热点","美国监管机构否决特斯拉规避前灯召回申请","特斯拉","Model 3 / Model Y","NHTSA要求美国市场近2万辆Model 3/Y继续执行前灯修复，理由是眩光可能影响交通安全。","2026-07-17","路透社","https://www.reuters.com/world/us-agency-denies-tesla-petition-avoid-recall-fix-over-headlight-issue-2026-07-16/","","",{industryAngle:"仅适用于美国市场，不能外推为中国市场召回。"}),
r("今日热点","阿维塔07L进入预售节点","阿维塔","07L","公开时间线为7月17日预售、8月8日上市；截至10:00最终预售价尚待发布。","2026-07-17","腾讯新闻","https://news.qq.com/rain/a/20260714A0BCH000","新浪汽车","https://k.sina.com.cn/article_7857201856_1d45362c0019084x26.html",{launchStatus:"预售",industryAngle:"预售权益、预售价和最终上市价需分别记录。"}),
r("今日热点","小鹏海外车型接入谷歌地图车载服务","小鹏汽车","MONA L03","MONA L03海外版本率先接入谷歌地图车载服务，强化海外座舱生态本地化。","2026-07-17","小鹏汽车官方","https://www.xiaopeng.com/news/company_news/5579.html","IT之家汽车","https://auto.ithome.com/ev",{sourceLevel:"A级",industryAngle:"海外生态合作不代表中国版本采用相同服务。"}),
r("今日热点","小鹏披露全球累计销量突破120万辆","小鹏汽车","累计交付","官方披露全球累计销量突破120万辆，该数字属于累计交付口径。","2026-07-17","小鹏汽车官方","https://www.xiaopeng.com/news/company_news/5579.html","","",{sourceLevel:"A级",industryAngle:"不能据此直接推导当前月度增速或海外销量占比。"}),
r("今日热点","MONA L03正式起价较预售价下探2万元","小鹏汽车","MONA L03","正式起价12.38万元，较此前14.38万元预售价下探2万元。","2026-07-17","小鹏汽车官方","https://www.xiaopeng.com/news/company_news/5579.html","新浪财经","https://finance.sina.com.cn/wm/2026-07-16/doc-inihzmms7634368.shtml",{sourceLevel:"A级",industryAngle:"价格比较必须对应纯电、增程及具体配置。"}),
r("今日热点","理想L6改为单一Ultra版本","理想汽车","理想L6","新一代L6仅售Ultra版本，统一零售价24.98万元。","2026-07-17","搜狐汽车","https://www.sohu.com/a/1051218894_430526","腾讯新闻","https://view.inews.qq.com/a/20260716A0BIC100",{industryAngle:"实际成交价会受选装套件影响。"}),
r("今日热点","星光L上市权益价低于预售权益价","上汽通用五菱","星光L","上市权益价10.98万元起，较预售阶段11.78万元起进一步下探。","2026-07-17","搜狐车型库","https://db.auto.sohu.com/model_7816","搜狐汽车","https://www.sohu.com/a/1048468405_430526",{industryAngle:"需关注预售用户补偿安排与权益有效期。"}),
r("今日热点","魏牌V9X形成双动力、双轴距产品矩阵","魏牌","V9X","新增家庭版后形成更宽的动力和轴距覆盖。","2026-07-17","新浪财经","https://finance.sina.com.cn/wm/2026-07-16/doc-inihzmms7634368.shtml","腾讯新闻","https://news.qq.com/rain/a/20260716A0BZ3Z00",{industryAngle:"版本复杂度及30万—40万元区间内部价格重叠值得观察。"}),
r("今日热点","零跑将800V与SA8295P下探至10万元级","零跑汽车","B01 / B10","焕新B系列把800V平台和SA8295P座舱芯片带入约10万元价格区间。","2026-07-17","新浪财经","https://finance.sina.com.cn/wm/2026-07-16/doc-inihzmms7634368.shtml","腾讯新闻","https://news.qq.com/rain/a/20260716A0BZ3Z00",{industryAngle:"需核对低配功能完整性、峰值充电能力和网络适配。"}),
r("今日热点","2027年起新能源车船税优惠口径调整","行业","车船税","自2027年起，部分节能汽车和新能源商用车优惠口径调整，并非所有新能源乘用车统一取消优惠。","2026-07-17","国家税务总局吉林省税务局","https://jilin.chinatax.gov.cn/art/2026/7/16/art_912_955298.html","财政部政策解读","https://m.mof.gov.cn/zcjd/202607/t20260703_3992830.htm",{sourceLevel:"A级",industryAngle:"传播时必须区分车型类别、实施时间和技术条件。"}),

r("新车资讯","新一代理想L6 Ultra上市","理想汽车","理想L6","Ultra版统一零售价24.98万元，计划上市后一周内开始交付。","2026-07-16","搜狐汽车","https://www.sohu.com/a/1051218894_430526","新浪财经","https://finance.sina.com.cn/wm/2026-07-16/doc-inihzfcw4474140.shtml",{launchStatus:"已上市"}),
r("新车资讯","小鹏MONA L03纯电与增程版上市","小鹏汽车","MONA L03","中国市场纯电和增程版均为12.38万元起；增程版计划8月下旬交付。","2026-07-16","小鹏汽车官方","https://www.xiaopeng.com/news/company_news/5579.html","新浪财经","https://finance.sina.com.cn/wm/2026-07-16/doc-inihzmms7634368.shtml",{launchStatus:"已上市",sourceLevel:"A级",industryAngle:"中国与欧洲车型需区分市场和法规版本。"}),
r("新车资讯","零跑B01焕新款上市","零跑汽车","B01","共5款车型，售价9.58万—11.98万元。","2026-07-16","新浪财经","https://finance.sina.com.cn/wm/2026-07-16/doc-inihzmms7634368.shtml","腾讯新闻","https://news.qq.com/rain/a/20260716A0BZ3Z00",{launchStatus:"已上市"}),
r("新车资讯","零跑B10焕新款上市","零跑汽车","B10","共5款车型，售价9.98万—12.58万元。","2026-07-16","新浪财经","https://finance.sina.com.cn/wm/2026-07-16/doc-inihzmms7634368.shtml","腾讯新闻","https://news.qq.com/rain/a/20260716A0BZ3Z00",{launchStatus:"已上市"}),
r("新车资讯","魏牌V9X家庭版上市","魏牌","V9X家庭版","指导价33.18万元起，限时权益后31.68万元起。","2026-07-16","新浪财经","https://finance.sina.com.cn/wm/2026-07-16/doc-inihzmms7634368.shtml","腾讯新闻","https://news.qq.com/rain/a/20260716A0BZ3Z00",{launchStatus:"已上市"}),
r("新车资讯","智己LS9 Hyper上市","智己汽车","LS9 Hyper","Hyper版权益价34.98万元；完整标配与选装关系仍以官方配置表为准。","2026-07-16","腾讯新闻","https://news.qq.com/rain/a/20260716A0BZ3Z00","新浪财经","https://finance.sina.com.cn/wm/2026-07-16/doc-inihzmms7634368.shtml",{launchStatus:"已上市"}),
r("新车资讯","五菱星光L上市","上汽通用五菱","星光L","指导价11.28万—13.58万元，限时权益价10.98万元起。","2026-07-16","搜狐车型库","https://db.auto.sohu.com/model_7816","新浪财经","https://finance.sina.com.cn/wm/2026-07-16/doc-inihzmms7634368.shtml",{launchStatus:"已上市"}),
r("新车资讯","吉利银河TT Land完成技术日信息释放","吉利银河","TT Land","7月16日举行灵感技术日，量产版本、完整配置和上市节点仍待官方资料。","2026-07-16","汽车之家直播","https://live.m.autohome.com.cn/list/4","","",{launchStatus:"已发布"}),
r("新车资讯","阿维塔07L开启预售","阿维塔","07L","7月17日预售，计划8月8日上市；截至10:00最终预售价待发布。","2026-07-17","腾讯新闻","https://news.qq.com/rain/a/20260714A0BCH000","新浪汽车","https://k.sina.com.cn/article_7857201856_1d45362c0019084x26.html",{launchStatus:"预售"}),
r("新车资讯","魏牌高山H10被报道将于7月18日预售","魏牌","高山H10","媒体称7月18日预售，但尚缺完整官方新闻稿，价格和配置未确认。","2026-07-18","搜狐汽车","https://db.m.auto.sohu.com/model_7653/a/1050195473_120625016","","",{launchStatus:"待官方确认",status:"未官方确认",risk:"高",industryAngle:"不纳入正式发布会日历。"}),
r("新车资讯","坦克300新能源节点尚未官方确认","坦克","坦克300新能源","媒体平台把7月19日列为车型节点，但品牌官方尚未二次确认。","2026-07-19","网通社","https://auto.news18a.com/","","",{launchStatus:"待官方确认",status:"未官方确认",risk:"高",industryAngle:"暂不写成正式定档。"}),
r("新车资讯","领克07GT定档7月23日19:00上市","领克","07GT","中国市场预售价16.58万元起，计划7月23日19:00上市；欧洲计划2027年导入。","2026-07-23","IT之家","https://www.ithome.com/0/976/524.htm","新浪财经","https://finance.sina.com.cn/tech/digi/2026-07-14/doc-inihuhkh1244154.shtml",{launchTime:"2026-07-23T19:00",launchStatus:"预售",industryAngle:"中国上市与欧洲导入必须分开。"}),
r("新车资讯","极氪9X五座版处于预售期","极氪","9X五座版","仍处预售阶段，正式上市价和首批交付时间尚未公布。","2026-07-17","网通社","https://auto.news18a.com/news/storys_273319.html","","",{launchStatus:"预售",industryAngle:"转载稿混有旧日期和旧价格，引用前必须复核。"}),
r("新车资讯","小米昆仑N70/N90进入监管申报相关报道","小米汽车","昆仑N70 / N90","正式名称、售价、量产配置和上市日期均未官宣。","2026-07-17","搜狐汽车","https://db.m.auto.sohu.com/model_5710/a/1048618951_408740","腾讯新闻","https://view.inews.qq.com/a/20260713A04BIM00",{launchStatus:"已申报",status:"监管申报",industryAngle:"申报不能写成上市官宣。"}),
r("新车资讯","理想i9进入监管申报汇总","理想汽车","理想i9","出现在第409批申报汇总，上市节点和价格尚未公布。","2026-07-17","腾讯新闻","https://view.inews.qq.com/a/20260713A04BIM00","SMM","https://news.smm.cn/news/104002240",{launchStatus:"已申报",status:"监管申报"}),
r("新车资讯","iCAR V25申报信息曝光","奇瑞iCAR","V25","监管申报显示为增程车型，并提供激光雷达等选装。","2026-07-17","盖世汽车","https://m.gasgoo.com/news/70465551.html","","",{launchStatus:"已申报",status:"监管申报",industryAngle:"选装项目不能写成全系标配。"}),
r("新车资讯","方程豹SHARK国内版进入监管申报","比亚迪方程豹","SHARK国内版","国内版进入第409批监管申报，海外在售版本不能直接等同于中国版本。","2026-07-17","新浪汽车","https://k.sina.com.cn/article_7857201856_1d45362c0019082zvu.html","SMM","https://news.smm.cn/news/104002240",{launchStatus:"已申报",status:"监管申报"}),
r("新车资讯","宝马iX3长轴距版确认中国专属","宝马","iX3长轴距版","宝马确认中国专属长轴版；媒体称8月成都车展预售、四季度交付。","2026-07-17","BMW Group","https://www.press.bmwgroup.com/global/article/detail/T0457355EN/the-start-of-a-new-era%3A-the-bmw-group-at-auto-china-2026?language=en","新浪财经","https://finance.sina.com.cn/tech/digi/2026-06-29/doc-iniezsuy5607659.shtml",{launchStatus:"已官宣",sourceLevel:"A级",industryAngle:"具体预售日仍以媒体时间线为主。"}),
r("新车资讯","保时捷纯电Cayenne高性能车型海外展示","保时捷","Cayenne Turbo Coupé Electric","已在古德伍德完成海外展示，中国市场上市时间和售价未公布。","2026-07-17","Porsche Newsroom","https://newsroom.porsche.com/en/2026/company/porsche-goodwood-festival-of-speed-2026-42847.html","","",{launchStatus:"已首发",sourceLevel:"A级",industryAngle:"海外展示不能写成中国上市。"}),
r("新车资讯","宾利Torcal定档9月23日伦敦全球首发","宾利","Torcal","官方确认9月23日在伦敦全球首发，技术参数、售价及中国导入节点尚未公布。","2026-09-23","Bentley Media","https://www.bentleymedia.com/en/newsitem/1811-torcal-the-next-extraordinary-bentley","宾利官网","https://www.bentleymotors.com/en/bentley-culture/torcal/name-reveal.html",{launchStatus:"已官宣",sourceLevel:"A级",industryAngle:"全球首发与中国上市必须区分。"})
];

const c=(title,brand,model,category,eventDate,launchTime,launchStatus,summary,s1,u1,s2="",u2="")=>
r(category,title,brand,model,summary,eventDate,s1,u1,s2,u2,{type:"calendar",launchTime,launchStatus});
const calendar=[
c("新一代理想L6产品发布会","理想汽车","理想L6","上市发布会","2026-07-16","2026-07-16T19:30","已发布","发布价格、配置和交付安排。","搜狐汽车","https://www.sohu.com/a/1051218894_430526","新浪财经","https://finance.sina.com.cn/wm/2026-07-16/doc-inihzfcw4474140.shtml"),
c("小鹏MONA L03全球上市发布会","小鹏汽车","MONA L03","全球上市发布会","2026-07-16","2026-07-16T19:00","已发布","中国和欧洲市场信息分开记录。","小鹏汽车官方","https://www.xiaopeng.com/news/company_news/5579.html","新浪财经","https://finance.sina.com.cn/wm/2026-07-16/doc-inihzmms7634368.shtml"),
c("零跑B01/B10焕新上市发布会","零跑汽车","B01 / B10","上市发布会","2026-07-16","2026-07-16T19:00","已发布","双车公布价格与配置。","新浪财经","https://finance.sina.com.cn/wm/2026-07-16/doc-inihzmms7634368.shtml","腾讯新闻","https://news.qq.com/rain/a/20260716A0BZ3Z00"),
c("魏牌V9X家庭版上市发布会","魏牌","V9X家庭版","上市发布会","2026-07-16","2026-07-16T17:30","已发布","公布指导价及限时权益。","新浪财经","https://finance.sina.com.cn/wm/2026-07-16/doc-inihzmms7634368.shtml","腾讯新闻","https://news.qq.com/rain/a/20260716A0BZ3Z00"),
c("智己LS9 Hyper上市发布会","智己汽车","LS9 Hyper","上市发布会","2026-07-16","2026-07-16T19:00","已发布","发布Hyper版本价格与核心技术。","腾讯新闻","https://news.qq.com/rain/a/20260716A0BZ3Z00","新浪财经","https://finance.sina.com.cn/wm/2026-07-16/doc-inihzmms7634368.shtml"),
c("五菱星光L上市发布会","上汽通用五菱","星光L","上市发布会","2026-07-16","2026-07-16T20:00","已发布","公布指导价及上市权益。","搜狐车型库","https://db.auto.sohu.com/model_7816","新浪财经","https://finance.sina.com.cn/wm/2026-07-16/doc-inihzmms7634368.shtml"),
c("吉利银河灵感技术日","吉利银河","TT Land","技术发布会","2026-07-16","","已发布","量产配置和上市时间仍待官宣。","汽车之家直播","https://live.m.autohome.com.cn/list/4"),
c("阿维塔07L开启预售","阿维塔","07L","预售发布","2026-07-17","","预售","7月17日预售，计划8月8日上市。","腾讯新闻","https://news.qq.com/rain/a/20260714A0BCH000","新浪汽车","https://k.sina.com.cn/article_7857201856_1d45362c0019084x26.html"),
c("领克07GT中国上市","领克","07GT","上市发布会","2026-07-23","2026-07-23T19:00","待举行","中国市场定档7月23日19:00。","IT之家","https://www.ithome.com/0/976/524.htm","新浪财经","https://finance.sina.com.cn/tech/digi/2026-07-14/doc-inihuhkh1244154.shtml"),
c("阿维塔07L计划上市","阿维塔","07L","上市发布","2026-08-08","","待举行","公开时间线为8月8日上市，具体时刻待公布。","腾讯新闻","https://news.qq.com/rain/a/20260714A0BCH000","新浪汽车","https://k.sina.com.cn/article_7857201856_1d45362c0019084x26.html"),
c("宾利Torcal伦敦全球首发","宾利","Torcal","全球首发","2026-09-23","","待举行","全球首发，不等于中国上市。","Bentley Media","https://www.bentleymedia.com/en/newsitem/1811-torcal-the-next-extraordinary-bentley","宾利官网","https://www.bentleymotors.com/en/bentley-culture/torcal/name-reveal.html")
];

const w=(brand,model,title,summary,eventDate,launchStatus,s1,u1,s2="",u2="",extra={})=>
r("重点车型",title,brand,model,summary,eventDate,s1,u1,s2,u2,{type:"watch",launchStatus,...extra});
const watches=[
w("理想汽车","理想L6","新一代理想L6","7月16日已上市，Ultra版24.98万元，计划一周内交付。","2026-07-16","已上市","搜狐汽车","https://www.sohu.com/a/1051218894_430526","新浪财经","https://finance.sina.com.cn/wm/2026-07-16/doc-inihzfcw4474140.shtml"),
w("小米汽车","昆仑N70 / N90","小米昆仑N70/N90","处于监管申报相关报道阶段，正式命名、价格和上市日未官宣。","2026-07-17","已申报","搜狐汽车","https://db.m.auto.sohu.com/model_5710/a/1048618951_408740","腾讯新闻","https://view.inews.qq.com/a/20260713A04BIM00",{status:"监管申报"}),
w("鸿蒙智行","多品牌体系","鸿蒙智行重点产品矩阵","本日已复查，继续分别跟踪问界、享界、智界官方时间线。","2026-07-17","持续监控","鸿蒙智行官网","https://hima.auto/"),
w("问界","重点车型","问界产品节点","截至10:00未录入新的双源确认上市节点，继续监控官方渠道。","2026-07-17","持续监控","鸿蒙智行官网","https://hima.auto/"),
w("享界","享界G9","享界G9 L3道路测试进展","已取得北京高速公路120km/h道路测试许可；测试许可不等于消费者可开启L3。","2026-07-15","道路测试","北汽新能源","https://www.bjev.com.cn/media/details/532.html","IT之家","https://www.ithome.com/0/976/646.htm"),
w("智界","重点车型","智界产品节点","截至10:00未录入新的双源确认上市节点，继续监控官方渠道。","2026-07-17","持续监控","鸿蒙智行官网","https://hima.auto/"),
w("蔚来","ES8大五座版","蔚来ES8大五座版","7月9日上市、7月10日起交付；整车38.28万元起，BaaS 27.48万元起。","2026-07-09","已上市","蔚来官方","https://www.nio.cn/news/20260709001","财联社","https://www.cls.cn/detail/2422355",{sourceLevel:"A级"}),
w("小鹏汽车","MONA L03","小鹏MONA L03","纯电、增程版均12.38万元起；增程版计划8月下旬交付。","2026-07-16","已上市","小鹏汽车官方","https://www.xiaopeng.com/news/company_news/5579.html","新浪财经","https://finance.sina.com.cn/wm/2026-07-16/doc-inihzmms7634368.shtml",{sourceLevel:"A级"}),
w("极氪","9X五座版","极氪9X五座版","仍处预售阶段，正式上市价和首批交付时间待公布。","2026-07-17","预售","网通社","https://auto.news18a.com/news/storys_273319.html"),
w("腾势","重点车型","腾势产品节点","截至10:00未录入新的双源确认节点，继续复查官方发布会与新车信息。","2026-07-17","持续监控","腾势汽车官网","https://www.tengshiauto.com/"),
w("比亚迪方程豹","SHARK国内版","方程豹SHARK国内版","已进入监管申报，海外版本不能直接等同于中国市场版本。","2026-07-17","已申报","新浪汽车","https://k.sina.com.cn/article_7857201856_1d45362c0019082zvu.html","SMM","https://news.smm.cn/news/104002240",{status:"监管申报"}),
w("吉利银河","TT Land","吉利银河TT Land","7月16日完成技术信息释放，量产配置和上市节点待官方资料。","2026-07-16","已发布","汽车之家直播","https://live.m.autohome.com.cn/list/4"),
w("长安启源","Q06","长安启源Q06","官图和产品信息已释放，计划9月上市，具体日期与售价待官宣。","2026-07-17","已官宣","新浪汽车","https://k.sina.com.cn/article_7857201856_1d45362c001908421m.html","财联社","https://www.cls.cn/detail/2426667"),
w("奇瑞iCAR","V25","iCAR V25","申报显示增程动力并提供激光雷达选装，上市时间未官宣。","2026-07-17","已申报","盖世汽车","https://m.gasgoo.com/news/70465551.html","","",{status:"监管申报"}),
w("梅赛德斯-奔驰","纯电GLC","奔驰纯电GLC","350L 4MATIC鎏金版7月8日在华上市，统一价33.98万元；其余版本仍预售。","2026-07-08","部分版本已上市","新浪汽车","https://k.sina.com.cn/article_7857201856_1d45362c0019081m4e.html","搜狐汽车","https://m.sohu.com/a/1047683388_122014422"),
w("宝马","iX3长轴距版","宝马iX3长轴距版","中国专属长轴版已确认；8月预售、四季度交付仍以媒体时间线为主。","2026-07-17","已官宣","BMW Group","https://www.press.bmwgroup.com/global/article/detail/T0457355EN/the-start-of-a-new-era%3A-the-bmw-group-at-auto-china-2026?language=en","新浪财经","https://finance.sina.com.cn/tech/digi/2026-06-29/doc-iniezsuy5607659.shtml",{sourceLevel:"A级"}),
w("奥迪","2027款Q3","奥迪2027款Q3海外更新","海外年款增加副驾屏和辅助系统，不代表中国市场同步上市或配置相同。","2026-07-17","海外发布","Audi MediaCenter","https://www.audi-mediacenter.com/en/audi-q3-56","","",{sourceLevel:"A级"}),
w("保时捷","Cayenne Turbo Coupé Electric","纯电Cayenne高性能车型","已在古德伍德完成海外展示，中国上市时间和价格未公布。","2026-07-17","海外首发","Porsche Newsroom","https://newsroom.porsche.com/en/2026/company/porsche-goodwood-festival-of-speed-2026-42847.html","","",{sourceLevel:"A级"}),
w("宾利","Torcal","宾利Torcal","9月23日伦敦全球首发，技术参数、价格和中国导入节点待公布。","2026-09-23","已官宣","Bentley Media","https://www.bentleymedia.com/en/newsitem/1811-torcal-the-next-extraordinary-bentley","宾利官网","https://www.bentleymotors.com/en/bentley-culture/torcal/name-reveal.html",{sourceLevel:"A级"})
];

window.SPEED_INTELLIGENCE_DATA={
  version:2026071701,
  updatedAt:"2026-07-17 10:00",
  cutoff:"数据截至北京时间 2026-07-17 10:00",
  daily,calendar,watches
};
})();
