<template>
  <div class="park">
    <div class="park-title"></div>
    <div class="jysm desc">
      <div class="ming">信用停车
        <!--<div class="ques" @click="popupToast"></div>-->
      </div>
      <div class="desc-content">
        瓯江分「<span class="mkshow">650</span>」起可以在温州市公共停车场享受以下停车优惠权益。<span
        style="text-decoration:underline;color: rgba(60, 155, 216, 0.8);" @click="popupToast">使用说明</span>
      </div>
    </div>
    <div class="jysm">
      <div class="jili">
        <table class="jili-table">
          <thead>
          <tr>
            <td>区域</td>
            <td>诚信分</td>
            <td>信用停车</td>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td rowspan="1">龙湾区公共停车场</td>
            <td>≥650</td>
            <td>
              先离场后付费<br>
              <!-- 免费停车市场延长<br> -->
              停车费八折
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="jysm bot">
      <div class="record" v-if="recordFlag">
        <div class="ming">应用记录</div>
        <div class="record-inner">
          <my-table :tableConfig="list" :row-click="rowClick"></my-table>
        </div>
      </div>
    </div>
    <div class="emp" v-on:click="jyemp(empallow)" v-if="empallow">{{empallow}}</div>
    <mt-popup
      v-model="popupVisible"
      pop-transition="popup-fade" style="width: 80%">
      <div class="help-img">
        <img src="../../../static/empindex/close.png" class="close" @click="popupVisible = false;">
        <img src="../../../static/empindex/park_help.jpg" style="width: 100%; display: block;">
      </div>
    </mt-popup>
  </div>
</template>
<script>
    const appid = window.allAppId;
    import projectApi from '@/assets/index'
    import myTable from '@/components/table.vue'

    export default {
        data() {
            return {
                empallow: "",
                recordFlag: false,
                popupVisible: false,
                list: { // 停车信息
                    tableData: [],
                    columns: [
                        {
                            field: 'plateNo',
                            title: '车牌号',
                            width: 5,
                            columnAlign: 'center',
                            isResize: true
                        },
                        {
                            field: 'enterTime',
                            title: '入场时间',
                            width: 20,
                            columnAlign: 'center',
                            isResize: true
                        },
                        {
                            field: 'money',
                            title: '金额',
                            width: 15,
                            columnAlign: 'center',
                            isResize: true
                        },
                        {
                            field: 'status',
                            title: '状态',
                            width: 1,
                            columnAlign: 'center',
                            isResize: true,
                            formatter: function (rowData, rowIndex, pagingIndex, field) {
                                if (rowData[field] === '未缴费') {
                                    return `<span class="custom-span">${rowData[field]}</span>`
                                }
                                return rowData[field];
                            }
                        }
                    ]
                },
            }
        },
        components: {
            myTable
        },
        methods: {
            rowClick(rowIndex, rowData, column) {
                /*              if (rowData.status === '未缴费') {
                                    window.open(`http://zhcg.ilongwan.com/parking/api/data/creditCar/surePay?id=${ rowData['id'] }`, '_self', null, false);
                                }*/
            },
            popupToast() {
                this.popupVisible = true;
            },
            jyemp(emptext) {
                const params = new URLSearchParams();
                params.append('idcard', window.localStorage.getItem('idcard'));
                params.append('username', window.localStorage.getItem('username'));
                params.append("appid", appid['park']['appId']);
                if (emptext === "同意授权") {
                    projectApi.useremp(params).then(rs => {
                        if (rs.code === 200 && rs.message === "Success" && typeof (rs.data) != "undefined") {
                            this.empallow = "";
                            this.recordFlag = true;
                            this.searchpark();
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
            // 停车记录
            searchpark() {
                const params = new URLSearchParams();
                params.append('idcard', window.localStorage.getItem('idcard'));
                projectApi.getpark(params).then((res) => {
                    if (res && res.code === 200) {
                        const list = [];
                        res['creditCarRecordsList'].map((item) => {
                            list.push({
                                plateNo: item['plateNo'],
                                enterTime: item['enterTime'].split(" ")[0],
                                money: item['money'] + "元",
                                status: item['status'] === '1' ? '已缴费' : '未缴费',
                                id: item['id'] // 存入数据但不展示
                            });
                        });
                        this.list['tableData'] = list;
                    }
                }).catch((err) => {
                    console.log(err);
                });
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
                        if (e.appId === appid['park']['appId']) {
                            if (e.authStatus == 1) {
                                this.empallow = "";
                                this.recordFlag = true;
                                this.searchpark();
                            } else {
                                this.empallow = "同意授权";
                            }
                        }
                    });
                    if (arr.indexOf(appid['park']['appId']) == -1) {
                        this.empallow = "同意授权";
                    }
                }
            });
        }
    }
</script>
<style scoped>
  .park {
    width: 100%;
  }

  .park-title {
    width: 100%;
    height: 160px;
    background: url('../../../static/empindex/park_bg.png') center center no-repeat;
    background-size: cover;
  }

  .mkshow {
    font-family: Times New Roman;
    color: rgba(60, 155, 216, 0.8);
    font-weight: bold;
  }

  .jysm {
    margin: 0 auto;
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
    border-bottom: 1px solid rgba(128, 128, 128, 0.2);
    line-height: 15vw;
    text-align: left;
    color: black;
    font-size: 5vw;
    font-weight: bold;
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
    padding-bottom: 20px;
  }

  .record {
    padding-bottom: 10px;
  }

  .jili-table, .record-table {
    margin-top: 5px;
    width: 100%;
  }

  .jili-table td {
    line-height: .7rem;
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

  .record-inner /deep/ .custom-span {
    color: #428bca;
    text-decoration: underline;
  }

  .record-inner /deep/ .custom-span:active {
    color: red;
  }
</style>
