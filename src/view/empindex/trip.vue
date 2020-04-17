<template>
  <div class="trip">
    <div class="trip-title">
    </div>
    <div class="jysm desc">
      <div class="ming">信用旅游<!--<div class="ques" @click="popupToast"></div>--></div>
      <div class="desc-content">
        瓯江分「<span class="mkshow">700</span>」分起可以在温州市旅游景区享受以下优惠权益。
        <span style="text-decoration:underline;color: rgba(60, 155, 216, 0.8);" @click="popupToast">使用说明</span>
      </div>
    </div>
    <div class="jysm">
      <mt-navbar v-model="active" class="trip-navbar">
        <mt-tab-item :id="item.id" v-for="(item, index) of tableContent" :key="index">{{ item.name }}</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="active" swipeable>
        <mt-tab-container-item :id="item.id" v-for="(item, index) of tableContent" :key="index">
          <div class="jili" v-for="(value, index) of item.data" :key="index">
            <div class="ming">{{ value.tableType }}</div>
            <div class="table-img">
              <lunbo :lun-bo-list="value.tableImg"></lunbo>
            </div>
            <div v-for="(item, index) of value.tableTypeInner" :key="index" class="jili-cell">
              <mt-cell :title="item.point" :value="item.pointInner"></mt-cell>
            </div>
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
        <img src="../../../static/empindex/trip_help.jpg" style="width: 100%; display: block;">
      </div>
    </mt-popup>
  </div>
</template>
<script>
    const appid = window.allAppId;
    import projectApi from '@/assets/index';
    import lunbo from '@/components/lunbo';

    export default {
        data() {
            return {
                empallow: "",
                recordFlag: false,
                tableContent: [
                  {
                    id: 'wencheng-trip',
                    name: '文成县',
                    data: [
                      {
                        tableType: '景区',
                        tableImg: [
                          {
                            src: require('../../../static/empindex/wc_jingqu1.png')
                          },
                          {
                            src: require('../../../static/empindex/wc_jingqu2.png')
                          },
                          {
                            src: require('../../../static/empindex/wc_jingqu3.png')
                          },
                          {
                            src: require('../../../static/empindex/wc_jingqu4.png')
                          }
                        ],
                        tableTypeInner: [
                          {
                            point: '700-749',
                            // pointInner: '刘基庙景区门票全免，百丈漈景区、铜铃山景区门票半价'
                            pointInner: '刘基庙景区门票全免，百丈漈景区门票半价'
                          },
                          {
                            point: '≥750',
                            // pointInner: '百丈漈景区、刘基庙景区、铜铃山景区门票全免'
                            pointInner: '百丈漈景区、刘基庙景区门票全免'
                          }
                        ]
                      }
                    ]  
                  },
                  {
                    id: 'cangnan-trip',
                    name: '苍南县',
                    data: [
                      {
                        tableType: '景区',
                        tableImg: [
                          {
                              src: require('../../../static/empindex/cn_jingqu1.png')
                          },
                          {
                              src: require('../../../static/empindex/cn_jingqu2.jpg')
                          }, {
                              src: require('../../../static/empindex/cn_jingqu3.png')
                          }, {
                              src: require('../../../static/empindex/cn_jingqu4.jpg')
                          }
                        ],
                        tableTypeInner: [
                          {
                              point: '700-749',
                              pointInner: '碗窑、渔寮、炎亭、石聚堂景区 门票半价'
                          },
                          {
                              point: '≥750',
                              pointInner: '碗窑、渔寮、炎亭、石聚堂景区 门票全免'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    id: 'tanshun-trip',
                    name: '泰顺县',
                    data: [
                      {
                        tableType: '景区',
                        tableImg: [
                          {
                            src: require('../../../static/empindex/ts_jingqu1.jpg')
                          },
                          {
                            src: require('../../../static/empindex/ts_jingqu2.jpg')
                          },
                          {
                            src: require('../../../static/empindex/ts_jingqu3.jpg')
                          }
                        ],
                        tableTypeInner: [
                          {
                            point: '700-749',
                            pointInner: '乌岩岭国家级自然保护区、白鹤山庄门票半价'
                          },
                          {
                            point: '≥750',
                            pointInner: '乌岩岭国家级自然保护区、白鹤山庄门票全免'
                          }
                        ]
                      },
                      {
                        tableType: '酒店',
                        tableImg: [
                          {
                            src: require('../../../static/empindex/ts_jiudian1.jpg')
                          },
                          {
                            src: require('../../../static/empindex/ts_jiudian2.jpg')
                          },
                          {
                            src: require('../../../static/empindex/ts_jiudian3.jpg')
                          },
                          {
                            src: require('../../../static/empindex/ts_jiudian4.jpg')
                          },
                          {
                            src: require('../../../static/empindex/ts_jiudian5.jpg')
                          }
                        ],
                        tableTypeInner: [
                          {
                            point: '≥700',
                            pointInner: '泰顺香洲开元大酒店、温州大峡谷温泉度假村、温州氡泉承天大酒店、泰顺玉龙山氡泉度假村、莲云谷温泉酒店   免押金入住'
                          }
                        ]
                      }
                    ]  
                  }
                ],
                active: 'wencheng-trip',
                popupVisible: false
            }
        },
        components: {
            lunbo
        },
        methods: {
            popupToast() {
                this.popupVisible = true;
            },
            jyemp(emptext) {
                const params = new URLSearchParams();
                params.append('idcard', window.localStorage.getItem('idcard'));
                params.append('username', window.localStorage.getItem('username'));
                params.append("appid", appid['trip']['appId']);
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
            },
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
                        if (e.appId === appid['trip']['appId']) {
                            if (e.authStatus == 1) {
                                this.empallow = "";
                                this.recordFlag = true;
                            } else {
                                this.empallow = "同意授权";
                            }
                        }
                    });
                    if (arr.indexOf(appid['trip']['appId']) == -1) {
                        this.empallow = "同意授权";
                    }
                }
            });
        }
    }
</script>
<style scoped>
  .trip {
    width: 100%;
  }

  .trip-title {
    width: 100%;
    height: 160px;
    background: url('../../../static/empindex/trip_bg.png') center center no-repeat;
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
    margin: -30px auto 20px;
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
  .trip-navbar /deep/ .mint-tab-item {
    max-width: 60px;
    padding: 12px 0;
  }
  .trip-navbar /deep/ .mint-tab-item.is-selected {
    border-bottom: none;
    position: relative;
  }
  .trip-navbar /deep/ .mint-tab-item.is-selected::before {
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
