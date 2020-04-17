<template>
  <div class="finance">
    <div class="finance-title">
    </div>
    <div class="jysm desc">
      <div class="ming">信用金融</div>
      <div class="desc-content">
        瓯江分「<span class="mkshow">650</span>」分起可以在温州各大银行享受以下优惠权益。
        <span style="text-decoration:underline;color: rgba(60, 155, 216, 0.8);" @click="popupToast">使用说明</span>
      </div>
    </div>
    <div class="jysm">
      <mt-navbar v-model="active" class="finance-navbar">
        <mt-tab-item :id="item.id" v-for="(item, index) of tableContent" :key="index">{{ item.desc }}</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="active" swipeable>
        <mt-tab-container-item :id="item.id" v-for="(item, index) of tableContent" :key="index">
          <div v-for="(value, ind) of item.data" class="finance-block" :key="ind" v-if="value.list.length > 0">
            <div class="finance-block-title">
              {{ value.title }}
            </div>
            <ul class="finance-block-content">
              <li v-for="(c, i) of value.list" :key="i" class="finance-block-li">
                <span v-if="value.list.length > 1" class="finance-block-number">{{ i + 1 }}.</span>
                {{ c }}
              </li>
            </ul>
          </div>
          <div style="text-align: right;margin-bottom: 10px;">
            应用地址： {{ item.name }}
          </div>
          <div style="text-align: right;margin-bottom: 10px;">
            详情咨询： {{ item.counselor }}&nbsp;&nbsp;&nbsp;联系电话： {{ item.phone }}
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <div class="emp" v-on:click="jyemp(empallow)" v-if="empallow">{{empallow}}</div>
    <mt-popup
      v-model="popupVisible"
      pop-transition="popup-fade" style="width: 80%">
      <div class="help-img">
        <img src="../../../static/empindex/close.png" class="close" @click="popupVisible = false">
        <img src="../../../static/empindex/finance_help.jpg" style="width: 100%; display: block;">
      </div>
    </mt-popup>
  </div>
</template>
<script>
    const appid = window.allAppId;
    import projectApi from '@/assets/index';

    export default {
        data() {
            return {
                empallow: "",
                recordFlag: false,
                tableContent: [
                  {
                    id: 'jsyh',
                    name: '建设银行温州分行营业部',
                    desc: '建设银行',
                    data: [
                      {
                        title: '650分以上',
                        list: [
                          '建行龙支付客户，建行储蓄卡客户，信用卡客户在建行指定合作商户处刷卡消费，凭指定码券享受消费金额5折购活动。',
                          '申请我行信用卡并活跃使用，享受2元购80元拉杆箱',
                          '开通建设银行“龙支付”，享受1元购海天调味品礼盒、1元购清风纸巾6包装、1元购5斤富硒大米（三选一）',
                          '开通银联“云闪付”，享受1元购进口保蒙洗手液',
                          '满足特定条件的优质客户，享受二折购养生壶或四方多功能锅',
                          '新办理6个月及以上定期5万/理财10万/基金1万/保险1万的客户，享受1元购39元煮饭嫂大米10斤装',
                          '存款100万（含）以上客户或他行潜力客户，享受二折购喜莱雅大豆蛋白纤维被',
                          '登记客户信息后提供“业务优先服务”、“大堂专人引导”、“诚信客户专属等候区”、“免费零食茶水供应”等一系列差别化专业服务。',
                          '优质客户（缴交公积金或社保），建设银行温州分行营业部申请为该客户群体建立快贷白名单库，享受诚信分客户专属“快e贷”额度，并享受更优惠的贷款利率。'
                        ]
                      },
                      {
                        title: '700分以上',
                        list: [
                          '享受建设银行温州分行营业部专属绿色贷款进件通道。以最优质的贷款服务，最高效的放款效率，解决诚信客户融资需求。在符合条件的情况下，一般五个工作日内办妥贷款手续。',
                          '给予首套住房按揭利率LPR加55基点优惠',
                          '给予二套住房按揭利率LPR加70基点优惠',
                          '给予经营性抵押贷款LPR加20基点优惠',
                          '在满足我行特定产品覆盖的情况下，可以享受我行针对中高端客户定制的花艺沙龙、美食沙龙、理财论坛等激励措施。'
                        ]
                      },
                      {
                        title: '750分以上',
                        list: [
                          '给予首套住房按揭利率LPR加50基点优惠',
                          '给予二套住房按揭利率LPR加65基点优惠',
                          '给予经营性抵押贷款LPR加15基点优惠',
                          '在满足我行特定产品覆盖的情况下，可以享受我行针对私人银行客户定制的一系列非金融增值活动，例如户外拓展、养生讲座、电影品鉴、财富论坛等激励措施。'
                        ]
                      }
                    ],
                    counselor: '陈经理',
                    phone: '18968878801'  
                  },
                  {
                    id: 'zhyh',
                    name: '招商银行温州分行营业部',
                    desc: '招商银行',
                    data: [
                      {
                        title: '700分以上',
                        list: [
                          '个人客户申请贷款走“审批绿色通道”。',
                          '客户申请个人贷款可享受分行“审批绿色通道”，即在上报分行审查时，客户经理标注客户属性，分行优先处理，原则上落实上报日T+1处理。',
                          // '个人客户来温州地区我行厅堂办理业务，可享受金葵花室厅堂服务。（非厅堂叫号机及时识别，客户体验感差，暂不开展）\n建议：非我行“金葵花”以上客户或未我行持卡客户的温州地区“极优”个人；我行厅堂叫号机不能识别。建议市发改委能否接入信息或放置识别“瓯江分”设备。'
                        ]
                      },
                      {
                        title: '750分以上',
                        list: [
                          '分行贷后服务中心放置瓯江分“极优”客户绿色通道的宣传牌；',
                          '招商银行瓯江分“极优”客户可享受以下两个优质服务：一是“极优”客户至分行申请房贷提前还款，原须提前30天预约才可免收提前还款违约金，“极优”可通过绿色通道，提前1个星期预约即可。二是“极优”客户申请贷后预约业务后，本人至厅堂可享受排队情况下，优先接待。',
                          '个人客户可申请30万以内信用备用金。'
                        ]
                      }
                    ],
                    counselor: '郑经理',
                    phone: '13736317500'   
                  },
                  {
                    id: 'msyh',
                    name: '民生银行温州分行营业部',
                    desc: '民生银行',
                    data: [
                      {
                        title: '700分以上',
                        list: [
                          '给予按揭利率上浮8%、存量客户小微利率上浮18%优惠。'
                        ]
                      },
                      {
                        title: '750分以上',
                        list: [
                          '给予按揭利率上浮5%、存量客户小微利率上浮15%优惠；'
                        ]
                      }
                    ],
                    counselor: '陈经理',
                    phone: '0577-89592309' 
                  },
                  {
                    id: 'wzyh',
                    name: '温州银行市域内所有营业网点',
                    desc: '温州银行',
                    data: [
                      {
                        title: '600分以上',
                        list: [
                          '客户享受社区支行相应服务措施：绿色通道，金融服务随到随办。',
                          '客户享受社区支行相应服务措施：优先享有特邀客户的非金融服务，包括：儿童课堂、中老年课堂、丽人课堂等、社区节庆活动、网格（社区）结对一家亲活动等。'
                        ]
                      },
                      {
                        title: '750分以上',
                        list: [
                          '客户享受专属理财产品服务：瓯江分守信人士同等享有新客理财的专属金融服务。'
                        ]
                      }
                    ],
                    counselor: '全经理',
                    phone: '0577-88997362'   
                  },
                  {
                    id: 'wzmsyh',
                    name: '温州民商银行总行营业部',
                    desc: '温州民商银行',
                    data: [
                      {
                        title: '650分以上',
                        list: [
                          '客户在温州民商银行营业网点办理业务可选用贵宾通道免排队。'
                        ]
                      },
                      {
                        title: '750分以上',
                        list: [
                          '可享受上门服务,如上门面签合同等经营及监管允可的离行业务。',
                        ]
                      }
                    ],
                    counselor: '徐经理',
                    phone: '13567799658'  
                  },
                  {
                    id: 'njzh',
                    name: '鹿城农商银行南郊支行',
                    desc: '鹿城农商银行',
                    data: [
                      {
                        title: '700分以上',
                        list: [
                          '优先为其开通绿色办贷通道，在符合条件的情况下，一般在四个工作日内办妥贷款手续。'
                        ]
                      }
                    ],
                    counselor: '王经理',
                    phone: '13738308158'  
                  }
                ],
                active: 'jsyh',
                popupVisible: false
            }
        },
        methods: {
            popupToast() {
                this.popupVisible = true;
            },
            jyemp(emptext) {
                const params = new URLSearchParams();
                params.append('idcard', window.localStorage.getItem('idcard'));
                params.append('username', window.localStorage.getItem('username'));
                params.append("appid", appid['finance']['appId']);
                if (emptext === "同意授权") {
                    projectApi.useremp(params).then(rs => {
                        if (rs.code === 200 && rs.message === "Success" && typeof (rs.data) != "undefined") {
                            this.empallow = "";
                            this.recordFlag = true;
                            this.$toast("开通成功");
                        }
                    });
                } else if (emptext === "取消授权") {
                    projectApi.cancleemp(params).then(rs => {
                        if (rs.code === 200 && rs.message === "Success" && typeof (rs.data) != "undefined") {
                            this.empallow = "同意授权";
                            this.$toast("取消成功");
                        }
                    });
                }
            }
        },
        created() {
            const params = new URLSearchParams();
            params.append('idcard', window.localStorage.getItem('idcard'));
            params.append('username', window.localStorage.getItem('username'));
            params.append("appid", appid['oujiangfen']['appId']);
            params.append("key", appid['oujiangfen']['key']);
            projectApi.getemp(params).then(rs3 => {
                if (rs3.code === 200 && rs3.message === "Success" && typeof (rs3.data) != "undefined") {
                    var arr = [];
                    rs3.data.auth.forEach((e) => {
                        arr.push(e.appId);
                        if (e.appId === appid['finance']['appId']) {
                            if (e.authStatus == 1) {
                                this.empallow = "";
                                this.recordFlag = true;
                            } else {
                                this.empallow = "同意授权";
                            }
                        }
                    });
                    if (arr.indexOf(appid['finance']['appId']) == -1) {
                        this.empallow = "同意授权";
                    }
                }
            });
        },
        watch: {
          active () {
            this.$nextTick(() => {
              const selected = document.querySelector('.jysm .mint-tab-item.is-selected');
              const navbar = document.querySelector('.jysm .mint-navbar.finance-navbar');
              navbar.scrollLeft = selected.offsetLeft - navbar.offsetLeft;
            });
          }
        }
    }
</script>
<style scoped>
  .finance {
    width: 100%;
  }

  .finance-title {
    width: 100%;
    height: 160px;
    background: url('../../../static/empindex/finance_bg.png') center center no-repeat;
    background-size: cover;
    position: relative;
  }

  .title-select {
    position: absolute;
    z-index: 5;
    right: 10px;
    top: 10px;
  }

  .mkshow {
    font-family: Times New Roman;
    color: rgba(60, 155, 216, 0.8);
    font-weight: bold;
  }

  .jysm {
    margin: 0 auto 20px;
    overflow: hidden;
    width: 90vw;
    padding: 0 .5rem;
    box-sizing: border-box;
    border-radius: 5px;
    box-shadow: 0px 0px 3px #aaa;
    background: #FFF;
    color: rgba(128, 128, 128, 0.8);
  }

  .desc {
    position: relative;
    margin: -23px auto 20px;
  }

  .desc-content {
    text-indent: .6rem;
    font-size: .35rem;
    line-height: .43rem;
    margin: .2rem .3rem;
    text-align: left;
    color: rgba(128, 128, 128, 0.8);
  }

  .bot {
    position: relative;
    margin: 20px auto;
  }

  .ming {
    margin: 0 auto;
    border-bottom: 1px solid rgb(177, 177, 177);
    line-height: 15vw;
    text-align: left;
    color: black;
    font-size: 5vw;
    font-weight: bold;
    color: #000;
    position: relative;
  }

  .ques {
    position: absolute;
    z-index: 3;
    width: 6vw;
    height: 6vw;
    right: 3vw;
    top: 50%;
    transform: translateY(-50%);
    background: url('../../../static/empindex/ques_black.png') no-repeat;
    background-size: 100% 100%;
  }

  .jili {
  }

  .record {
    padding-bottom: 10px;
  }

  .jili-table, .record-table {
    margin-top: 5px;
    width: 100%;
  }

  .jili-table td, .record-table td {
    font-size: .35rem;
    height: 25px;
  }

  .emp {
    margin: 20px auto;
    width: 80vw;
    height: 15vw;
    font-weight: bold;
    line-height: 15vw;
    font-size: 5vw;
    text-align: center;
    border-radius: 50px;
    color: #FFF;
    background-color: #5679B7;
  }


  .no-data {
    font-size: 14px;
    color: #ddd;
    padding: 5px 0;
  }

  .jili-cell {
    padding: 0 16px;
    margin: 17px 0;
  }

  .table-img {
    padding: 15px 16px 0;
  }

  .table-img /deep/ .lunbo {
    width: 100%;
    left: 0;
  }

  .table-img /deep/ .lunbo img {
    display: block;
  }

  .jili /deep/ .jili-cell .mint-cell {
    background: none;
  }

  .jili /deep/ .jili-cell .mint-cell-wrapper {
    background: none;
    align-items: normal;
    font-size: 0.35rem;
    padding: 0;
    text-align: left;
    line-height: 0.61rem;
  }

  .jili /deep/ .mint-cell-wrapper .mint-cell-title {
    max-width: 2.16rem;
    color: #333;
  }

  .jili /deep/ .mint-cell-wrapper .mint-cell-value {
    flex: 1;
    color: #333;
  }

  .help-img {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .close {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 3;
    height: 8vw;
  }
  .finance-block {
    width: 100%;
    margin: 10px 0;
    box-sizing: border-box;
    padding: 1.5vh 10px;
    background: rgb(248, 248, 248);
  }
  .finance-block-title {
    width: 100%;
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:bold;
    line-height:21px;
    color:rgba(61,156,217,1);
    text-align: left;
    margin-bottom: 1.65vh;
  }
  .finance-block-content {
    width: 100%;
    background:rgba(250,253,255,1);
    border:1px solid rgba(208,218,235,1);
    box-sizing: border-box;
    height: 17.24vh;
    overflow: auto;
    padding: 1.2vh 8px;
    box-sizing: border-box;
  }
  .finance-block-li {
    font-size: 12px;
    color: #333;
    line-height: 21px;
    font-family:Source Han Sans CN;
    font-weight:400;
    text-align: left;
  }
  .finance-block-number {
    color: #3D9CD9;
    font-weight: bold;
  }
  .finance-navbar {
    overflow-x: auto;
    overflow-y: hidden;
    padding: 10px 0;
  }
  .finance-navbar /deep/ .mint-tab-item {
    padding: 7px 0;
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:500;
    white-space: nowrap;
    margin-right: 20px;
    display: table;
  }
  .finance-navbar /deep/ .mint-tab-item.is-selected {
    border-bottom: none;
    position: relative;
    color:rgba(61,156,217,1);
  }
  .finance-navbar /deep/ .mint-tab-item.is-selected::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 3px;
    background: rgb(38, 162, 255);
    bottom: 0;
    left: 0;
    border-radius: 20px;
  }
</style>
