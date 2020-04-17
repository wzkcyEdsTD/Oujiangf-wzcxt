<template>
  <div class="showindex">
    <div class="title">
      <div class="jyimg"></div>
      <div class="txtshow">信用旅游</div>
    </div>
    <div class="smtxt">你已授权该应用场景，若解除授权将无法继续享受信用旅游相关权益。</div>
    <div class="submit" v-on:click="cancelemp">解除授权</div>
  </div>
</template>

<script>
    const appid = window.allAppId;
    import projectApi from '../../assets/index';
    import {MessageBox} from 'mint-ui';

    export default {
        name: "lyemp",
        methods: {
            goPage(name) {
                this.$router.push({
                    name,
                });
            },
            cancelemp() {
                const params = new URLSearchParams();
                params.append('idcard', window.localStorage.getItem('idcard'));
                params.append('username', window.localStorage.getItem('username'));
                params.append("appid", appid['trip']['appId']);
                this.$nextTick(() => {
                    MessageBox.confirm('是否取消授权', '提示').then(() => {
                        projectApi.cancleemp(params).then(rs => {
                            if (rs.code === 200 && rs.message === "Success" && typeof (rs.data) != "undefined") {
                                this.$toast('取消成功');
                                this.goPage('empmanager');
                            }
                        });
                    });
                });
            },
        }
    }
</script>

<style scoped>
  .showindex {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translate(-50%);
  }

  .title {
    position: relative;
    left: 50%;
    transform: translate(-50%);
    height: 20vw;
    width: 90vw;
    display: flex;
    align-items: center;
  }

  .jyimg {
    position: relative;
    width: 10vw;
    height: 10vw;
    float: left;
    background: url('../../../static/empmanager/xyy.png') no-repeat;
    background-size: 100% 100%;
  }

  .txtshow {
    position: relative;
    height: 8vw;
    left: 5vw;
    line-height: 8vw;
    font-size: 6vw;
    letter-spacing: 10px;
  }

  .smtxt {
    height: 6vw;
    line-height: 6vw;
    font-size: 4vw;
    letter-spacing: 5px;
    text-align: left;
    padding: 0 20px;
    color: #aaa;
  }

  .submit {
    position: relative;
    top: 30vw;
    height: 15vw;
    line-height: 15vw;
    font-size: 5vw;
    letter-spacing: 10px;
    width: 90vw;
    left: 50%;
    transform: translate(-50%);
    background: #3899D8;
    color: #FFF;
    border-radius: 30px;
  }
</style>
