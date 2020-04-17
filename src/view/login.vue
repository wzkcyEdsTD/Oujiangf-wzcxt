<template>
  <div class="showindex">
    <div class="form-title">
      <img src="/static/login/log.png" class="logo">
      <h2 class="appname">瓯江分</h2>
      <h3 style="font-size: 4vw;margin-top: 10px;    font-family: 'KaiTi';
    color: #FFF;font-weight: 500;line-height: 1.1;">温州城市个人诚信分</h3>
    </div>
    <div class="tab clearfix">
        <div class="text-center"><img src="/static/login/titbgh.gif"> <a @click="goToKuaiJie">快捷登录</a></div>
        <div class="nohov text-center"><img src="/static/login/titbg.gif"> <strong>政务网</strong></div>
    </div>
    <div class="form-login">
      <div class="logininput">
        <img src="../../static/login/username.png" class="logininput-img">
        <div class="inshow"><input id="loginname" :placeholder="placeholderName" type="text" class="inputstyle"
                                   @focus="focusHanlder($event)" @blur="blurHanlder($event)"></div>
      </div>
      <div class="logininput">
        <img src="../../static/login/password.png" class="logininput-img">
        <div class="inshow"><input id="loginpwd" :placeholder="placeholderPwd" type="password" class="inputstyle"
                                   @focus="focusHanlder($event)" @blur="blurHanlder($event)"></div>
      </div>
      <div class="form-bottom">
        <div class="loginclick" v-on:click="login()">登&nbsp;&nbsp;录</div>
        <div class="zcclick">
          <span @click="goToZhuCe">用户注册</span>
          <span style="height: 80%; width: 1px; background-color: #fff;margin: 0 10px;"></span>
          <span @click="goToWangJi">忘记密码</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    const placeholderLoginName = '请输入浙江省政府服务网账号';
    const placeholderLoginPwd = '请输入密码';
    import projectApi from '../assets/index'
    import {mixin} from '@/js/mixin.js'

    export default {
        name: "login",
        mixins: [mixin],
        data() {
            return {
                placeholderName: '请输入浙江省政府服务网账号',
                placeholderPwd: '请输入密码'
            }
        },
        components: {},
        methods: {
            goToKuaiJie () {
                location.href = 'http://grcxf.wzcredit.gov.cn/cnvpweb/Home/login';
            },
            goToZhuCe() {
                const gotoUrl = window.location.href;
                location.href = `https://puser.zjzwfw.gov.cn/sso/usp.do?action=register&servicecode=wzgrcxfyypt&goto=${gotoUrl}`;
            },
            goToWangJi() {
                const gotoUrl = window.location.href;
                location.href = `https://puser.zjzwfw.gov.cn/sso/usp.do?action=forgotPwd&servicecode=wzgrcxfyypt&goto=${gotoUrl}`;
            },
            login() {
                this.$indicator.open({
                    spinnerType: 'triple-bounce'
                });
                var loginname = document.getElementById("loginname").value;
                var loginpwd = document.getElementById("loginpwd").value;
                YH.method.loginForJs(loginname, loginpwd, "001003076");
            },
            focusHanlder(e) {
                const target = e.target;
                if (target.id === 'loginname' && !document.getElementById("loginname").value) {
                    this.placeholderName = '';
                } else if (target.id === 'loginpwd') {
                    if (/(Android)/i.test(navigator.userAgent)) {
                        setTimeout(() => {
                            e.target.scrollIntoViewIfNeeded(true);
                        }, 350);
                    }
                    if (!document.getElementById('loginpwd').value) {
                        this.placeholderPwd = '';
                    }
                }
            },
            blurHanlder(e) {
                const target = e.target;
                if (target.id === 'loginname' && !document.getElementById("loginname").value) {
                    this.placeholderName = placeholderLoginName;
                } else if (target.id === 'loginpwd' && !document.getElementById('loginpwd').value) {
                    this.placeholderPwd = placeholderLoginPwd;
                }
            }
        },
        mounted() {
            //登录成功
            const that = this;
            YH.callback.loginAppForJs = function (ticket) {
                that.$indicator.close();
                //业务系统处理登录成功之后的业务。
                const params = new URLSearchParams();
                params.append('ticket', ticket);
                projectApi.ssologin(params).then(res => {
                    if (res.idnum && res.username && res.mobile) {
                        window.localStorage.setItem("username", res.username);
                        window.localStorage.setItem("idcard", res.idnum);
                        window.localStorage.setItem("phone", res.mobile);
                        const params = new URLSearchParams();
                        params.append('idcard', res.idnum);
                        params.append('username', res.username);
                        params.append('phonenum', res.mobile);
                        projectApi.settoken(params).then((res) => {
                            window.localStorage.setItem("token", res);
                            const params2 = new URLSearchParams();
                            params2.append('idcard', window.localStorage.getItem("idcard"));
                            projectApi.getuser(params2).then((res2) => {
                                if (res2 == "") {
                                    projectApi.insertuser(params).catch((err) => {
                                        console.log(err);
                                    });
                                } else {
                                    projectApi.updateuser(params).catch((err) => {
                                        console.log(err);
                                    });
                                }
                                that.$router.push({
                                    name: 'xyptIndex',
                                });
                            })
                        }).catch((err) => {
                            console.log(err);
                        })
                    } else if (res.idnum === "" || res.username === "" || res.mobile === "") {
                        that.$toast('该账号尚未完成实名认证');
                    } else if (res.idnum === undefined && res.username === undefined && res.mobile === undefined) {
                        that.$toast('登录失败');
                    }
                });
            }
            //登录失败
            YH.callback.showErrcode = function (errorMsg, errorcode) {
                //业务系统处理登录成功之后的业务。
                that.$indicator.close();
                that.$toast(errorMsg);
            }
        }
    }
</script>
<style scoped>
  .showindex {
    height: 100%;
    width: 100%;
    position: relative;
    background: url('../../static/login/loginindex.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .form-title {
    padding: 12vw;
    text-align: center;
  }

  .logo {
    margin: 0 auto;
    width: 30vw;
  }

  .appname {
    padding-top: 2vw;
    margin: 0 auto;
    font-size: 7vw;
    font-family: 'KaiTi';
    color: #FFF;
    font-weight: 500;
    line-height: 1.1;
  }

  .form-login {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .logininput {
    text-align: center;
    height: 10vw;
    width: 100%;
  }

  .logininput-img {
    vertical-align: middle;
    width: 6.2vw;
    height: 7.1vw;
    margin-right: .4rem;
  }

  input::-webkit-input-placeholder {
    color: #FFF;
    font-size: 4vw;

  }

  .inputstyle {
    background-color: transparent;
    border: 0;
    width: 100%;
    height: 100%;
    font-size: 5vw;
    color: #FFF;
    background-size: 100% 100%;
    line-height: 10vw;
    text-align: left;
  }

  .inshow {
    width: 66vw;
    height: 10vw;
    display: inline-block;
    border-bottom: 1px solid #FFF
  }

  .form-bottom {
    margin-top: 30vw;
    text-align: center;
    width: 100%;
  }

  .loginclick {
    width: 65vw;
    height: 10vw;
    margin: 0 auto;
    background: #FFF;
    color: #3D9BF2;
    font-size: 18px;
    line-height: 10vw;
    border-radius: 50px;
  }

  .zcclick {
    margin: 0 auto;
    width: 65vw;
    height: 7vw;
    font-size: 5vw;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
  }
  .tab::before, .tab::after{
    display: table;
    content: "";
  }
  .tab{
        border-bottom: 1px solid #8ec4f5;
        width:77vw;
        margin:0 auto 15px;
    }
    .tab a { 
        color: #8ec4f5;
        text-decoration: none;
    }
    .tab div{
        width:50%;
        float:left;
        line-height:10vw;
        font-size:4.5vw;
        color:#fff;
        padding-bottom:10px;
    }
    .tab div.nohov a{
        color:#8ec4f5;
        cursor: pointer;
    }

    .tab div img{
        width:5vw;
        vertical-align: middle;
        margin-right:5px;
    }

</style>

