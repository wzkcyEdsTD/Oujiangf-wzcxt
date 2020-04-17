<template>
  <div class="book">
    <div class="book-title"></div>
    <div class="jysm desc">
      <div class="ming">
        信用借阅
        <!--<div class="ques" @click="popupToast"></div>-->
      </div>
      <div class="desc-content">
        瓯江分「<span class="mkshow">650</span>」起可以在温州地区公共图书馆（除少儿馆外）、城市书房及百姓书屋享受以下信用借阅权益升级。<span
        style="text-decoration:underline;color: rgba(60, 155, 216, 0.8);" @click="popupToast">使用说明</span>
      </div>
    </div>
    <div class="jysm">
      <div class="jili">
        <table class="jili-table">
          <thead>
          <tr>
            <td></td>
            <td style="width: 50%;">借阅数量</td>
            <td style="width: 25%;">借期</td>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>普通免押读者证</td>
            <td>借阅普通书刊10册，光盘10盘，连续剧2套</td>
            <td>30天，可续借2次</td>
          </tr>
          <tr>
            <td>瓯江分650分及以上</td>
            <td>借阅普通书刊15册，光盘15盘，连续剧3套</td>
            <td>30天，可续借3次</td>
          </tr>
          <tr>
            <td>瓯江分700分及以上</td>
            <td>借阅普通书刊15册，光盘15盘，连续剧3套，可免押借阅电子书阅读器</td>
            <td>30天，可续借3次</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="jysm bot">
      <div class="record" v-if="recordFlag">
        <div class="ming">应用记录</div>
        <div class="record-inner">
          <div class="reocord-choose">
            <span @click="changeListIndex(0)" :class="[currentListIndex === 0 ? 'record-current' : '']">当前借阅</span>
            <span @click="changeListIndex(1)" :class="[currentListIndex === 1 ? 'record-current' : '']">历史借阅</span>
          </div>
          <my-table :tableConfig="list" :pagination="paginationNeed" :page-size="historyListSize"
                    :total="historyListTotal" @page-change="searchHistoryBook">
          </my-table>
        </div>
      </div>
    </div>
    <div class="emp" v-on:click="jyemp(empallow)" v-if="empallow">{{empallow}}</div>
    <mt-popup
      v-model="popupVisible"
      pop-transition="popup-fade" style="width: 80%">
      <div class="help-img">
        <img src="../../../static/empindex/close.png" class="close" @click="popupVisible = false;">
        <img src="../../../static/empindex/book_help.jpg" style="width: 100%; display: block;">
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
                list: {
                    tableData: [],
                    columns: []
                },
                historyListTable: { // 历史借阅
                    tableData: [],
                    columns: [
                        {
                            field: 'title',
                            title: '图书名称',
                            width: 110,
                            columnAlign: 'center',
                            isResize: true
                        },
                        {
                            field: 'logtype',
                            title: '类型',
                            width: 1,
                            columnAlign: 'center',
                            isResize: true
                        },
                        {
                            field: 'optime',
                            title: '处理时间',
                            width: 30,
                            columnAlign: 'center',
                            isResize: true
                        }
                    ]
                },
                historyListSize: 10, // 历史借阅的分页一页的个数
                historyListTotal: 0, // 历史借阅的分页总条数
                paginationNeed: false, // 是否需要分页
                currentList: { // 当前借阅
                    tableData: [],
                    columns: [
                        {
                            field: 'title',
                            title: '图书名称',
                            width: 5,
                            columnAlign: 'center',
                            isResize: true
                        },
                        {
                            field: 'loandate',
                            title: '借阅时间',
                            width: 15,
                            columnAlign: 'center',
                            isResize: true
                        },
                        {
                            field: 'returndate',
                            title: '应还时间',
                            width: 15,
                            columnAlign: 'center',
                            isResize: true
                        },
                        {
                            field: 'rewnewcount',
                            title: '续借次数',
                            width: 1,
                            columnAlign: 'center',
                            isResize: true
                        }
                    ]
                },
                currentListIndex: -1
            }
        },
        components: {
            myTable
        },
        methods: {
            changeListIndex(index) {
                if (this.currentListIndex === index) return;
                this.currentListIndex = index;
                if (this.currentListIndex === 1) {
                    this.paginationNeed = true;
                    this.historyListTotal = 0;
                    this.searchHistoryBook();
                }
                if (this.currentListIndex === 0) {
                    this.searchBooking();
                    this.paginationNeed = false;
                }
            },
            popupToast() {
                this.popupVisible = true;
            },
            jyemp(emptext) {
                const that = this;
                const params = new URLSearchParams();
                params.append('idcard', window.localStorage.getItem('idcard'));
                params.append('username', window.localStorage.getItem('username'));
                params.append("appid", appid['jieyue']['appId']);
                if (emptext === "同意授权") {
                    projectApi.useremp(params).then(rs => {
                        if (rs.code === 200 && rs.message === "Success" && typeof (rs.data) != "undefined") {
                            this.empallow = "";
                            this.recordFlag = true;
                            this.searchHistoryBook(); // 查询book认证
                            this.$toast("开通成功");
                            const params1 = new URLSearchParams();
                            params1.append('idcard', window.localStorage.getItem('idcard'));
                            params1.append('username', window.localStorage.getItem('username'));
                            params1.append("appid", appid['oujiangfen']['appId']);
                            params1.append("key", appid['oujiangfen']['key']);
                            projectApi.getmark(params1).then(rs1 => {
                                if (rs1.code === 200 && rs1.message === "Success" && typeof (rs1.data) != "undefined") {
                                    const params2 = new URLSearchParams();
                                    params2.append('certify', window.localStorage.getItem('idcard'));
                                    params2.append('score', rs1.data.score);
                                    projectApi.postmsgtolibrary(params2).then(res1 => {
                                        console.log(res1)
                                    })
                                }
                            })
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
            // 历史借阅
            searchHistoryBook(page) {
                const params = new URLSearchParams();
                params.append('idcard', window.localStorage.getItem('idcard'));
                params.append('rows', this.historyListSize);
                page && params.append('page', page);
                projectApi.gethismessage(params).then((res) => {
                    if (res && res.success) {
                        const list = [];
                        if (this.historyListTotal <= 0) {
                            this.historyListTotal = res['total'];
                        }
                        res['hloanlist'].map((item) => {
                            list.push({
                                title: item['title'],
                                optime: item['optime'].split(" ")[0],
                                logtype: item['logtype'] === '30002' ? '还书' : (item['logtype'] === '30001' ? '借书' : '')
                            });
                        });
                        this.historyListTable['tableData'] = list;
                        this.list = this.historyListTable;
                        this.currentListIndex = 1;
                        this.paginationNeed = true;
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
            // 借阅中
            searchBooking() {
                const params = new URLSearchParams();
                params.append('idcard', window.localStorage.getItem('idcard'));
                projectApi.getmessage(params).then((res) => {
                    if (res && res.success) {
                        const list = [];
                        res['loanlist'].map((item) => {
                            list.push({
                                title: item['title'],
                                loandate: item['loandate'].split(" ")[0],
                                returndate: item['returndate'].split(" ")[0],
                                rewnewcount: item['rewnewcount']
                            });
                        });
                        this.currentList['tableData'] = list;
                        this.list = this.currentList;
                        this.currentListIndex = 0;
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
                        if (e.appId === appid['jieyue']['appId']) {
                            if (e.authStatus == 1) {
                                this.searchHistoryBook(); // 查询book认证
                                this.empallow = "";
                                this.recordFlag = true;
                            } else {
                                this.empallow = "同意授权";
                            }
                        }
                    });
                    if (arr.indexOf(appid['jieyue']['appId']) == -1) {
                        this.empallow = "同意授权";
                    }
                }
            });
        }
    }
</script>
<style scoped>
  .book {
    width: 100%;
  }

  .book-title {
    width: 100%;
    height: 160px;
    background: url('../../../static/empindex/book_bg.png') center center no-repeat;
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

  .jili-table td, .record-table td {
    font-size: .35rem;
    height: 30px;
    padding: 1vw;
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

  .reocord-choose {
    text-align: left;
    width: 100%;
    font-size: 0.37rem;
  }

  .reocord-choose span {
    font-weight: 500;
    position: relative;
    display: inline-block;
    padding: .43rem .51rem .32rem;
    color: rgb(183, 183, 183);
  }

  .reocord-choose .record-current {
    color: rgb(100, 175, 224);
  }

  .reocord-choose .record-current::after {
    position: absolute;
    content: "";
    width: 0.16rem;
    height: 0.16rem;
    top: .42rem;
    right: .3rem;
    background: rgb(61, 156, 217);
    border-radius: 50% 50%;
  }
</style>
