<template>
  <div class="showindex">
    <div class="markbg">
      <div class="personmark">{{usermark}}</div>
      <div class="mins">分</div>
      <div class="historymark" v-if="false">历史瓯江分</div>
      <div class="qusimg" @click="goToProblem" @touchstart.stop @touchend.stop></div>
      <div class="kindofmark" id="sftz" style="top:14.2vw;left:44vw">
        <img src="../../static/WenchowMark/sftzshow.png" alt="Smiley face" width="27px" height="27px">
        <div>身份特质</div>
      </div>
      <div class="kindofmark" id="zjsf" style="top:31.7vw;right:15vw">
        <img src="../../static/WenchowMark/zjsf.png" alt="Smiley face" width="27px" height="27px">
        <div>遵纪守法</div>
      </div>
      <div class="kindofmark" id="syxy" style="top:57.4vw;right:22.2vw">
        <img src="../../static/WenchowMark/syxy.png" alt="Smiley face" width="27px" height="27px">
        <div>商业用信</div>
      </div>
      <div class="kindofmark" id="shxy" style="top:57.4vw;left:22.2vw">
        <img src="../../static/WenchowMark/shxy.png" alt="Smiley face" width="27px" height="27px">
        <div>生活用信</div>
      </div>
      <div class="kindofmark" id="csgx" style="top:31.7vw;left:15vw">
        <img src="../../static/WenchowMark/csgx.png" alt="Smiley face" width="27px" height="27px">
        <div>社会贡献</div>
      </div>
      <div class="mkecharts">
        <markechart></markechart>
      </div>
    </div>
    <div class="touchmove">
      <touchdiv @div-nub="changeimg"></touchdiv>
    </div>
    <div class="pinfo" v-on:click="goPage('personinfo')">
      <img src="../../static/WenchowMark/iden.png" class="infoimg">
      <div class="include">
        <div class="first">个人信息</div>
        <div class="second"></div>
      </div>
    </div>
    <div class="pinfo" v-on:click="goPage('empmanager')">
      <img src="../../static/WenchowMark/emp.png" class="infoimg">
      <div class="include">
        <div class="first">授权管理</div>
        <div class="second"></div>
      </div>
    </div>
    <div class="out" @click="signout">退出登录</div>
  </div>
</template>

<script src="https://wow.techbrood.com/libs/jquery/jquery-1.11.1.min.js"></script>
<script>
    const appid = window.allAppId;
    import markechart from "../components/markechart"
    import touchdiv from "../components/touchdiv"
    import projectApi from '../assets/index'
    import {MessageBox} from 'mint-ui';

    export default {
        name: "WenchowMark",
        data() {
            return {
                usermark: undefined,
            }
        },
        components: {
            markechart,
            touchdiv
        },
        methods: {
            goToProblem() {
                const url = '/static/help/';
                window.open(url, '_self', null, false);
            },
            goPage(name) {
                this.$router.push({
                    name,
                });
            },
            changeimg(i) {
                switch (i) {
                    case 0:
                        document.getElementById('sftz').getElementsByTagName("img")[0].src = "../../static/WenchowMark/sftzshow.png";
                        document.getElementById('csgx').getElementsByTagName("img")[0].src = "../../static/WenchowMark/csgx.png";
                        document.getElementById('shxy').getElementsByTagName("img")[0].src = "../../static/WenchowMark/shxy.png";
                        document.getElementById('syxy').getElementsByTagName("img")[0].src = "../../static/WenchowMark/syxy.png";
                        document.getElementById('zjsf').getElementsByTagName("img")[0].src = "../../static/WenchowMark/zjsf.png";
                        break;
                    case 1:
                        document.getElementById('sftz').getElementsByTagName("img")[0].src = "../../static/WenchowMark/sftz.png";
                        document.getElementById('csgx').getElementsByTagName("img")[0].src = "../../static/WenchowMark/csgx.png";
                        document.getElementById('shxy').getElementsByTagName("img")[0].src = "../../static/WenchowMark/shxy.png";
                        document.getElementById('syxy').getElementsByTagName("img")[0].src = "../../static/WenchowMark/syxy.png";
                        document.getElementById('zjsf').getElementsByTagName("img")[0].src = "../../static/WenchowMark/zjsfshow.png";
                        break;
                    case 2:
                        document.getElementById('sftz').getElementsByTagName("img")[0].src = "../../static/WenchowMark/sftz.png";
                        document.getElementById('csgx').getElementsByTagName("img")[0].src = "../../static/WenchowMark/csgx.png";
                        document.getElementById('shxy').getElementsByTagName("img")[0].src = "../../static/WenchowMark/shxy.png";
                        document.getElementById('syxy').getElementsByTagName("img")[0].src = "../../static/WenchowMark/syxyshow.png";
                        document.getElementById('zjsf').getElementsByTagName("img")[0].src = "../../static/WenchowMark/zjsf.png";
                        break;
                    case 3:
                        document.getElementById('sftz').getElementsByTagName("img")[0].src = "../../static/WenchowMark/sftz.png";
                        document.getElementById('csgx').getElementsByTagName("img")[0].src = "../../static/WenchowMark/csgx.png";
                        document.getElementById('shxy').getElementsByTagName("img")[0].src = "../../static/WenchowMark/shxyshow.png";
                        document.getElementById('syxy').getElementsByTagName("img")[0].src = "../../static/WenchowMark/syxy.png";
                        document.getElementById('zjsf').getElementsByTagName("img")[0].src = "../../static/WenchowMark/zjsf.png";
                        break;
                    case 4:
                        document.getElementById('sftz').getElementsByTagName("img")[0].src = "../../static/WenchowMark/sftz.png";
                        document.getElementById('csgx').getElementsByTagName("img")[0].src = "../../static/WenchowMark/csgxshow.png";
                        document.getElementById('shxy').getElementsByTagName("img")[0].src = "../../static/WenchowMark/shxy.png";
                        document.getElementById('syxy').getElementsByTagName("img")[0].src = "../../static/WenchowMark/syxy.png";
                        document.getElementById('zjsf').getElementsByTagName("img")[0].src = "../../static/WenchowMark/zjsf.png";
                        break;
                    default:
                        document.getElementById('sftz').getElementsByTagName("img")[0].src = "../../static/WenchowMark/sftzshow.png";
                        document.getElementById('csgx').getElementsByTagName("img")[0].src = "../../static/WenchowMark/csgx.png";
                        document.getElementById('shxy').getElementsByTagName("img")[0].src = "../../static/WenchowMark/shxy.png";
                        document.getElementById('syxy').getElementsByTagName("img")[0].src = "../../static/WenchowMark/syxy.png";
                        document.getElementById('zjsf').getElementsByTagName("img")[0].src = "../../static/WenchowMark/zjsf.png";
                }
            },
            goPage(name) {
                this.$router.push({
                    name,
                });
            },
            signout() {
                MessageBox.confirm('是否退出登录', '提示').then(() => {
                    window.localStorage.clear();
                    window.location.reload();
                });
            },
        },
        mounted() {
            //瓯江分
            const params = new URLSearchParams();
            params.append('idcard', window.localStorage.getItem('idcard'));
            params.append('username', window.localStorage.getItem('username'));
            params.append("appid", appid['oujiangfen']['appId']);
            params.append("key", appid['oujiangfen']['key']);
            projectApi.getmark(params).then(rs1 => {
                if (rs1.code === 200 && rs1.message === "Success" && typeof (rs1.data) != "undefined") {
                    this.usermark = rs1.data.score;
                }
            });
        }
    }
</script>
<style scoped>
  .showindex {
    width: 100%;
    position: relative;
    user-select: none;
  }

  .markbg {
    height: 80.5vw;
    width: 100vw;
    background: url("../../static/eduinfo/edubg.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
  }

  .personmark {
    font-family: Times New Roman;
    height: 10vw;
    width: 21vw;
    left: 6vw;
    top: 3vh;
    font-size: 10vw;
    text-align: center;
    line-height: 10vw;
    position: absolute;
    color: #FFF;
  }

  .mins {
    height: 5vw;
    width: 5vw;
    left: 27vw;
    top: 5vh;
    font-size: 4vw;
    position: absolute;
    text-align: center;
    line-height: 5vw;
    color: #FFF;
  }

  .historymark {
    height: 4vw;
    right: 5vw;
    top: 3vh;
    font-size: 4vw;
    position: absolute;
    text-align: center;
    line-height: 5vw;
    color: #FFF;
  }

  .kindofmark {
    height: 16vw;
    color: #FFF;
    position: absolute;
    text-align: center;
    line-height: 4.1vw;
    font-size: 3.3vw;
  }

  .mkecharts {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .touchmove {
    width: 100%;
    margin-top: -7vw;
  }

  .pinfo {
    cursor: pointer;
    height: 12vw;
    display: block;
    padding: 5px;
    position: relative;
    top: 3vw;
  }

  .infoimg {
    display: inline-block;
    position: relative;
    width: 10vw;
    height: 9vw;
    top: -1vw;
    left: 1vw;
  }

  .include {
    display: inline-block;
    height: 11vw;
    width: 78vw;
    border-bottom: 1px solid rgba(128, 128, 128, 0.2);
  }

  .first {
    height: 11vw;
    position: relative;
    display: inline-block;
    font-size: 4vw;
    line-height: 11vw;
    color: black;
    text-align: center;
    float: left;
    left: 3vw;
  }

  .second {
    background: url("../../static/WenchowMark/left.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
    top: 2vw;
    right: 2vw;
    height: 6vw;
    width: 6vw;
    float: right;
    display: inline-block;
  }

  .out {
    width: 70%;
    margin: 20px auto;
    background: linear-gradient(rgb(80, 185, 252), rgb(52, 148, 210));
    height: 10vw;
    border-radius: 100px;
    line-height: 10vw;
    color: #fff;
    font-size: 18px;
    font-weight: 400;
  }

  .qusimg {
    position: absolute;
    width: 6vw;
    height: 6vw;
    right: 7vw;
    top: 7.5vw;
    background: url('../../static/xyptIndex/ques.png') no-repeat;
    background-size: 100% 100%;
  }
</style>

