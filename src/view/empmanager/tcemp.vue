<template>
  <div class="showindex">
    <div class="title">
      <div class="jyimg"></div>
      <div class="txtshow">信用停车</div>
    </div>
    <div class="smtxt">你已授权该应用场景，若解除授权将无法继续享受以下信用权益。</div>
    <div class="ects">
      <div class="jili">
        <table class="jili-table">
          <thead>
          <tr>
            <td>诚信分</td>
            <td>信用停车</td>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>≥650</td>
            <td>
              先离场后付费 <br>
              <!-- 免费停车时长延长 <br> -->
              停车费八折
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="submit" v-on:click="cancelemp">解除授权</div>
  </div>
</template>

<script>
    const appid = window.allAppId;
    import projectApi from '../../assets/index';
    import {MessageBox} from 'mint-ui';

    export default {
        name: "tcemp",
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
                params.append("appid", appid['park']['appId']);
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
    background: url('../../../static/empmanager/信用停车.png') no-repeat;
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

  .ects {
    position: relative;
    top: 15vw;
    height: 40vw;
    width: 90vw;
    left: 50%;
    transform: translate(-50%);
    box-shadow: 1px 1px 3px #aaa;
  }



  .jili-table, .record-table {
    margin-top: 5px;
    width: 100%;
  }

  .jili-table td, .record-table td {
    font-size: .35rem;
    height: 10vw;
    line-height: 10vw;
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
