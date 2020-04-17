<template>
  <div class="emp-manager">
    <div class="emp-manager-title">
      应用场景授权管理
      <div class="backto" v-on:click="backtoindex('WenchowMark')"></div>
    </div>
    <div class="emp-manager-choose">
      <div v-for="(item,index) in list" :key=index class='include' v-on:click="gopage(item.appid)">
        <div class="first">{{item.name}}</div>
        <div class="second"><span class="right-icon"></span></div>
      </div>
    </div>
  </div>
</template>

<script src="https://wow.techbrood.com/libs/jquery/jquery-1.11.1.min.js"></script>
<script>
    const appid = window.allAppId;
    import projectApi from '../assets/index';
    import {MessageBox} from 'mint-ui';

    export default {
        name: "empmanager",
        data() {
            var obj = {},
                key = appid['jieyue']['appId'];
            obj[key] = 'jyemp';
            key = appid['park']['appId'];
            obj[key] = 'tcemp';
            key = appid['trip']['appId'];
            obj[key] = 'lyemp';
            key = appid['exercise']['appId'];
            obj[key] = 'jsemp';
            key = appid['finance']['appId'];
            obj[key] = 'jremp';

            return {
                jyvalue: false,
                tcvalue: false,
                list: [],
                mapset: obj
            }
        },
        created() {
            const params = new URLSearchParams();
            params.append('idcard', window.localStorage.getItem('idcard'));
            params.append('username', window.localStorage.getItem('username'));
            params.append("appid", appid['oujiangfen']['appId']);
            params.append("key", appid['oujiangfen']['key']);
            const cjarr = [];
            cjarr.push(appid['jieyue']['appId']);
            cjarr.push(appid['park']['appId']);
            cjarr.push(appid['trip']['appId']);
            cjarr.push(appid['exercise']['appId']);
            cjarr.push(appid['finance']['appId']);
            projectApi.getemp(params).then(rs3 => {
                if (rs3.code === 200 && rs3.message === "Success" && typeof (rs3.data) != "undefined") {
                    rs3.data.auth.forEach((e) => {
                        if (cjarr.indexOf(e.appId) !== -1) {
                            if (e.authStatus == 1) {
                                const obj = {};
                                obj.name = e.appName;
                                obj.appid = e.appId;
                                this.list.push(obj);
                            } else if (e.authStatus == 0) {
                                console.log(e.appName + "未授权");
                            }
                        }
                    })
                }
            });
        },
        components: {},
        methods: {
            cancelemp(appid, key) {
                const params = new URLSearchParams();
                params.append('idcard', window.localStorage.getItem('idcard'));
                params.append('username', window.localStorage.getItem('username'));
                params.append("appid", appid);
                this.$nextTick(() => {
                    MessageBox.confirm('是否取消授权', '提示').then(() => {
                        projectApi.cancleemp(params).then(rs => {
                            if (rs.code === 200 && rs.message === "Success" && typeof (rs.data) != "undefined") {
                                this.$toast('取消成功');
                            }
                        });
                    });
                });
            },
            gopage(appid) {
                for (var key in this.mapset) {
                    if (appid === key) {
                        this.$router.push({
                            name: this.mapset[appid],
                        });
                    }
                }
            },
            backtoindex(name) {
                this.$router.push({
                    name,
                });
            }
        },
        mounted() {
        }
    }
</script>
<style scoped>
  .emp-manager {
    height: 100%;
    width: 100%;
    background-color: rgba(238, 238, 238, .5);
  }

  .backto {
    position: absolute;
    height: 6vw;
    width: 6vw;
    right: 4vw;
    top: 4vw;
    background: url('../../static/personinfo/back.png') no-repeat;
    background-size: 100% 100%;
  }

  .emp-manager-title {
    width: 100%;
    height: 20vw;
    line-height: 20vw;
    text-align: center;
    background: url("../../static/eduinfo/edubg.png") center center no-repeat;
    background-size: 100% 100%;
    color: #fff;
    font-size: .5rem;
  }

  .emp-manager-choose {
    background-color: #fff;
    margin-top: 20px;
    width: 100%;
    box-sizing: border-box;
  }

  .include {
    height: 13vw;
    position: relative;
    margin: 0 15px;
    border-bottom: 1px solid rgba(128, 128, 128, 0.2);
  }

  .first {
    height: 11vw;
    width: 20vw;
    position: relative;
    top: 1vw;
    left: 2vw;
    font-size: 4vw;
    line-height: 11vw;
    color: black;
    text-align: left;
    padding-left: 5px;
    float: left;
  }

  .second {
    position: relative;
    height: 11vw;
    top: 1vw;
    right: 2vw;
    float: right;
    line-height: 11vw;
    font-size: 4vw;
    text-align: center;
  }

  .right-icon {
    vertical-align: middle;
  }
</style>

