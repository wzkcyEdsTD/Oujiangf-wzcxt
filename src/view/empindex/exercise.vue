<template>
  <div class="book">
    <div class="book-title"></div>
    <div class="jysm desc">
      <div class="ming">
        信用健身
      </div>
      <div class="desc-content">
        瓯江分「<span class="mkshow">650</span>」起，于2020年1月1日起在温州市百姓健身房可以享受以下优惠权益。<span
        style="text-decoration:underline;color: rgba(60, 155, 216, 0.8);" @click="popupToast">使用说明</span>
      </div>
    </div>
    <div class="jysm">
      <div class="jili">
        <table class="jili-table">
          <thead>
          <tr>
            <td></td>
            <td style="width: 50%;">优惠权益</td>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style="width: 30%">650分-699分</td>
            <td style="width: 70%">每两个月领取一次免费健身券</td>
          </tr>
          <tr>
            <td>700分及以上</td>
            <td>每个月领取一次免费健身券</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="jysm bot">
      <div class="record" v-if="recordFlag">
        <div class="pstic">剩余票数:<span class="ticshow">{{remianNum}}</span> <span
        style="text-decoration:underline;color: rgba(60, 155, 216, 0.8);margin-left: 10px;" @click="popupVisible2 = true;">点击领劵</span></div>
      </div>
    </div>
    <div class="jysm bot">
      <div class="record" v-if="recordFlag">
        <div class="ming">应用记录</div>
        <div class="record-inner">
          <my-table :tableConfig="list"></my-table>
        </div>
      </div>
    </div>
    <div class="emp" v-on:click="jyemp(empallow)" v-if="empallow">{{empallow}}</div>
    <mt-popup
      v-model="popupVisible"
      pop-transition="popup-fade" style="width: 80%">
      <div class="help-img">
        <img src="../../../static/empindex/close.png" class="close" @click="popupVisible = false;">
        <img src="../../../static/empindex/exe_help.jpg" style="width: 100%; display: block;">
      </div>
    </mt-popup>
    <mt-popup
      v-model="popupVisible2"
      pop-transition="popup-fade" style="width: 80%">
      <div class="help-img">
        <img src="../../../static/empindex/bxjsf.png" style="width: 100%; display: block;">
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
        popupVisible: false,
        popupVisible2: false,
        recordFlag: false,
        remianNum: 0,
        list: { // 健身卷领取信息
          tableData: [],
          columns: [
            {
              field: 'ljTime',
              title: '领劵时间',
              width: 15,
              columnAlign: 'center',
              isResize: true
            },
            {
              field: 'dqTime',
              title: '到期时间',
              width: 15,
              columnAlign: 'center',
              isResize: true
            },
            {
              field: 'syTime',
              title: '使用时间',
              width: 15,
              columnAlign: 'center',
              isResize: true
            },
            {
              field: 'syqk',
              title: '使用情况',
              width: 15,
              columnAlign: 'center',
              isResize: true
            }
          ]
        },
      }
    },
    components: {
      myTable
    },
    methods: {
      popupToast() {
        this.popupVisible = true;
      },
      jyemp(emptext) {
        const params = new URLSearchParams();
        params.append('idcard', window.localStorage.getItem('idcard'));
        params.append('username', window.localStorage.getItem('username'));
        params.append("appid", appid['exercise']['appId']);
        if (emptext === "同意授权") {
          projectApi.useremp(params).then(rs => {
            if (rs.code === 200 && rs.message === "Success" && typeof (rs.data) != "undefined") {
              this.empallow = "";
              const params2 = new URLSearchParams();
              projectApi.getremaintic(params2).then(res2 => {
                that.remianNum = res2[0].TicketNum - res2[0].provideNum;
              })
              const params1 = new URLSearchParams();
              params1.append('phoneNumber', window.localStorage.getItem('phone'));
              projectApi.getjsmsg(params1).then((res4 => {
                if (res4.code === 200) {
                  const list = [];
                  let msg = '';
                  res4['data'].map((item) => {
                    switch (item['couponStatus']) {
                      case '1':
                        msg = '未使用';
                        break;
                      case '2':
                        msg = '已使用';
                        break;
                      case '3':
                        msg = '过期自动退回';
                        break;
                    }
                    let st = item['useTime'] ? that.timestampToTime(item['useTime']) : '/';
                    let ct = that.timestampToTime(item['createTime']);
                    let dt = that.timestampToTime(item['endTime']);
                    //let st = that.timestampToTime(item['useTime']);
                    list.push({
                      ljTime: ct,
                      dqTime: dt,
                      syTime: st,
                      syqk: msg,
                    });
                    that.list['tableData'] = list;
                  });
                }
              }))
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
      timestampToTime(cjsj) {
        var date = new Date(cjsj) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        //var Y = date.getFullYear() + '-'
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        var D = date.getDate() + ' '
        var h = date.getHours() + ':'
        var m = date.getMinutes()
        //var s = date.getSeconds()
        return M + D + h + m
      },
    },
    created() {
      const that = this;
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
            if (e.appId === appid['exercise']['appId']) {
              if (e.authStatus == 1) {
                const params2 = new URLSearchParams();
                projectApi.getremaintic(params2).then(res2 => {
                  that.remianNum = res2[0].TicketNum - res2[0].provideNum;
                })
                this.empallow = "";
                this.recordFlag = true;
                const params1 = new URLSearchParams();
                params1.append('phoneNumber', window.localStorage.getItem('phone'));
                projectApi.getjsmsg(params1).then((res4 => {
                  if (res4.code === 200) {
                    const list = [];
                    let msg = '';
                    res4['data'].map((item) => {
                      switch (item['couponStatus']) {
                        case '1':
                          msg = '未使用';
                          break;
                        case '2':
                          msg = '已使用';
                          break;
                        case '3':
                          msg = '过期自动退回';
                          break;
                      }
                      let ct = that.timestampToTime(item['createTime']);
                      let dt = that.timestampToTime(item['endTime']);
                      //let st = that.timestampToTime(item['useTime']);
                      let st = item['useTime'] ? that.timestampToTime(item['useTime']) : '/';
                      list.push({
                        ljTime: ct,
                        dqTime: dt,
                        syTime: st,
                        syqk: msg,
                      });
                      that.list['tableData'] = list;
                    });
                  }
                }))
              } else {
                this.empallow = "同意授权";
              }
            }
          });
          if (arr.indexOf(appid['exercise']['appId']) == -1) {
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
    background: url('../../../static/empindex/exece.png') center center no-repeat;
    background-size: cover;
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

  .bot {
    position: relative;
    margin: 20px auto;
  }

  .pstic {
    position: relative;
    text-align: left;
  }

  .ticshow {
    position: relative;
    padding-left: 10px;
    font-family: Times New Roman;
    color: rgba(60, 155, 216, 0.8);
    font-weight: bold;
  }

  .mkshow {
    font-family: Times New Roman;
    color: rgba(60, 155, 216, 0.8);
    font-weight: bold;
  }

  .desc-content {
    text-indent: .6rem;
    font-size: .35rem;
    line-height: .43rem;
    margin: .2rem .3rem;
    text-align: left;
    color: rgba(128, 128, 128, 0.8);
  }

  .jili {
    padding-bottom: 20px;
  }

  .record {
    padding-top: 5px;
    padding-bottom: 5px;
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
