<template>
  <div>
    <div class="infobg">
      <div class="txtexp">完善下列信息</div>
      <div class="txtexptc">以便全面评估您的信用情况</div>
      <div class="backbg" v-on:click="goPage('WenchowMark')"></div>
    </div>
    <div class="ptinfo">
      <div class="ffir"></div>
      <div class="sser">
        <div class="sand">姓&nbsp;&nbsp;名:&nbsp;&nbsp;{{name}}</div>
        <div class="sand">手&nbsp;&nbsp;机:&nbsp;&nbsp;{{phone}}</div>
        <div class="sand">身份证:&nbsp;&nbsp;{{idcard}}</div>
      </div>
      <div class="t1">信息完整度</div>
      <div class="progress">
        <div class="bar" :style="{width: pec + '%'}">{{pec}}%</div>
      </div>
    </div>
    <div class="messageshow">
      <router-link :to="{name:'eduinfo'}" tag="div" class="pinfo">
        <img src="../../static/personinfo/edulevel.png" class="infoimg">
        <div class="include">
          <div class="first">学历信息</div>
          <div class="second">{{edupc}}<span class="right-icon"></span></div>
        </div>
      </router-link>
      <router-link :to="{name:'carinfo'}" tag="div" class="pinfo">
        <img src="../../static/personinfo/car.png" class="infoimg">
        <div class="include">
          <div class="first">车辆信息</div>
          <div class="second">{{carpc}}<span class="right-icon"></span></div>
        </div>
      </router-link>
      <router-link :to="{name:'ideninfo'}" tag="div" class="pinfo">
        <img src="../../static/personinfo/id.png" class="infoimg">
        <div class="include">
          <div class="first">生活信息</div>
          <div class="second">{{idpc}}<span class="right-icon"></span></div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script src="https://wow.techbrood.com/libs/jquery/jquery-1.11.1.min.js"></script>
<script>
    import projectApi from '../assets/index'

    export default {
        data() {
            return {
                idpc: "未完善",
                edupc: "未完善",
                carpc: "未完善",
                pec: 20,
                name: undefined,
                phone: undefined,
                idcard: undefined,
            }
        },
        components: {},
        methods: {
            goPage(name) {
                this.$router.push({
                    name,
                });
            },
        },
        mounted() {
            this.name = window.localStorage.getItem("username");
            this.phone = window.localStorage.getItem("phone");
            var str = window.localStorage.getItem("phone");
            this.phone = str.substr(0, 3) + '****' + str.substr(7);
            var mk = window.localStorage.getItem("idcard");
            this.idcard = mk.substr(0, 3) + '****' + mk.substr(14);
            var params = new URLSearchParams();
            params.append('idcard', window.localStorage.getItem("idcard"));
            projectApi.edutable(params).then(res => {
                if (res === "") {
                    projectApi.insertedu(params);
                }
                if (res.pc === 1) {
                    this.edupc = "已完善";
                    this.pec += 40;
                }
            });
            projectApi.identable(params).then(res1 => {
                if (res1 === "") {
                    projectApi.insertiden(params);
                }
                if (res1.pc === 1) {
                    this.idpc = "已完善";
                    this.pec += 30;
                }
            });
            projectApi.cartable(params).then(res2 => {
                if (res2 === "") {
                    projectApi.insertcar(params);
                }
                if (res2.pc === 1) {
                    this.carpc = "已完善";
                    this.pec += 10;
                }
            });
        }
    }
</script>
<style scoped>
  .infobg {
    height: 40vw;
    width: 100vw;
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translate(-50%);
    background: url('../../static/personinfo/infobg.png') no-repeat;
    background-size: 100% 100%;
  }

  .txtexp {
    height: 7vw;
    width: 100vw;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    top: 10vw;
    font-size: 5vw;
    line-height: 7vw;
    color: #FFF;
    text-align: center;
  }

  .txtexptc {
    height: 7vw;
    width: 100vw;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    top: 17vw;
    font-size: 5vw;
    line-height: 7vw;
    color: #FFF;
    text-align: center;
  }

  .backbg {
    position: absolute;
    height: 6vw;
    width: 6vw;
    right: 4vw;
    top: 4vw;
    background: url('../../static/personinfo/back.png') no-repeat;
    background-size: 100% 100%;
  }

  .messageshow {
    width: 100vw;
    height: 65vw;
    top: 80vw;
    position: absolute;
  }

  .ffir {
    position: absolute;
    width: 12vw;
    height: 10vw;
    left: 10vw;
    top: 10vw;
    background: url('../../static/personinfo/card.png') no-repeat;
    background-size: 100% 100%;
  }

  .sser {
    position: absolute;
    width: 55vw;
    height: 30vw;
    right: 2vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .sand {
    position: relative;
    width: 100%;
    height: 8vw;
    line-height: 8vw;
    font-size: 3.5vw;
    text-align: left;
  }

  .pinfo {
    cursor: pointer;
    height: 12vw;
    display: block;
  }

  .infoimg {
    display: inline-block;
    position: relative;
    width: 8vw;
    height: 7vw;
    top: -3vw;
    left: -1vw;
  }

  .include {
    display: inline-block;
    height: 12vw;
    width: 78vw;
    border-bottom: 1px solid rgba(128, 128, 128, 0.2);
  }

  .first {
    height: 12vw;
    display: inline-block;
    font-size: 4vw;
    line-height: 12vw;
    color: black;
    text-align: center;
    float: left;
    position: relative;
    left: 3vw;
  }

  .second {
    height: 12vw;
    width: 20vw;
    font-size: 4vw;
    line-height: 12vw;
    color: #808080;
    text-align: center;
    float: right;
    display: flex;
    align-items: center;
  }

  .progress {
    position: relative;
    float: right;
    top: 32vw;
    right: 5%;
    height: 3vw;
    width: 60%;
    overflow: hidden;
    background-color: #f7f7f7;
    background-repeat: repeat-x;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fff5f5f5', endColorstr='#fff9f9f9', GradientType=0);
    -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }

  .progress .bar {
    position: absolute;
    width: 0%;
    height: 100%;
    color: #ffffff;
    float: left;
    font-size: 12px;
    text-align: center;
    align-items: center;
    display: flex;
    justify-content: center;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
    background-color: #76C0FD;
    background-repeat: repeat-x;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff149bdf', endColorstr='#ff0480be', GradientType=0);
    -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
    -moz-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-transition: width 0.6s ease;
    -moz-transition: width 0.6s ease;
    -o-transition: width 0.6s ease;
    transition: width 0.6s ease;
  }

  .ptinfo {
    position: absolute;
    top: 35vw;
    left: 50%;
    transform: translate(-50%);
    width: 90vw;
    height: 40vw;
    background: #FFF;
    z-index: 10;
    box-shadow: 0px 0px 3px #aaa;
  }

  .t1 {
    position: relative;
    left: 5%;
    height: 7vw;
    top: 30vw;
    width: 25%;
    color: black;
    font-size: 4vw;
    text-align: left;
    line-height: 7vw;
    float: left;
  }
  .right-icon {
    margin-left: 5px;
  }
</style>

