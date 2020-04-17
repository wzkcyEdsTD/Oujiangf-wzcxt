<template>
  <div class="hospital">
    <div class="hospital-title"></div>
    <div class="jysm desc">
      <div class="ming">信用停车<div class="ques"></div></div>
      <div class="desc-content">
        瓯江分「<span class="mkshow">550</span>」起可以在温州市区内的图书馆、城市书房及百姓书屋享受以下信用借阅读权益。
      </div>
    </div>
    <div class="jysm">
      <div class="jili">
        <table class="jili-table">
          <thead>
              <tr>
                <td>诚信分</td>
                <td>激励措施</td>
              </tr>
          </thead>
          <tbody>
              <tr>
                <td>≥650</td>
                <td>先离场后付费<br>免费停车市场延长<br>停车费折扣</td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="jysm bot">
      <div class="record" v-if="recordFlag">
        <div class="ming">应用记录</div>
        <div class="no-data">无记录</div>
        <table class="record-table" v-show="false">
          <thead>
          <tr>
            <td>借书</td>
            <td>还书日期</td>
            <td>是否逾期</td>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>×××</td>
            <td>10册</td>
            <td>是</td>
          </tr>
          <tr>
            <td>×××</td>
            <td>×年×月×日</td>
            <td>是</td>
          </tr>
          <tr>
            <td>×××</td>
            <td>×年×月×日</td>
            <td>否</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="emp" v-on:click="jyemp(empallow)" v-if="empallow">{{empallow}}</div>
  </div>
</template>
<script>
import projectApi from '@/assets/index'
export default {
    data () {
        return {
            empallow: "",
            recordFlag: false
        }
    },
    methods: {
        jyemp(emptext) {
                const params = new URLSearchParams();
                params.append('idcard', window.localStorage.getItem('idcard'));
                params.append('username', window.localStorage.getItem('username'));
                params.append("appid", "201907220859170241269488");
                if (emptext === "同意授权") {
                    projectApi.useremp(params).then(rs => {
                        if (rs.code === 200 && rs.message === "Success" && typeof (rs.data) != "undefined") {
                            this.empallow = "";
                            this.recordFlag = false;
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
    created () {
        const params = new URLSearchParams();
        params.append('idcard', window.localStorage.getItem('idcard'));
        params.append('username', window.localStorage.getItem('username'));
        params.append("appid", "201907220859170241269488");
        params.append("key", "NdcfkWTJyNEA");
        projectApi.getemp(params).then(rs3 => {
            if (rs3.code === 200 && rs3.message === "Success" && typeof (rs3.data) != "undefined") {
                rs3.data.auth.forEach((e) => {
                    if(e.appName === '信用借阅'){
                        if(e.authStatus == 1){
                            this.empallow = "";
                            this.recordFlag = false;
                        }else if(e.authStatus == 0){
                            this.empallow = "同意授权";
                        }
                    }
                })
            }
        });
    }
}
</script>
<style scoped>
  .hospital {
    width: 100%;
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .hospital-title {
    width: 100%;
    height: 160px;
    background: url('../../../static/empindex/hospital_bg.png') center center no-repeat;
    background-size: cover;
  }

  .mkshow {
    font-family: Times New Roman;
    color: rgba(60,155,216,0.8);
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
</style>
