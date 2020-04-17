<template>
  <div class="showindex">
    <div class="title">
      <div class="jyimg"></div>
      <div class="txtshow">信用借阅</div>
    </div>
    <div class="smtxt">你已授权该应用场景，若解除授权将无法继续享受以下信用权益。</div>
    <div class="ects">
      <div class="jili">
        <table class="jili-table">
          <thead>
          <tr>
            <td>诚信分</td>
            <td>信用借阅</td>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td rowspan="6" style="border-bottom:1px solid #aaa">≥650</td>
          </tr>
          <tr>
            <td>普通书刊 15册</td>
          </tr>
          <tr>
            <td>光盘 15盘</td>
          </tr>
          <tr>
            <td>连续剧 3套</td>
          </tr>
          <tr>
            <td>借期 30天</td>
          </tr>
          <tr>
            <td style="border-bottom:1px solid #aaa">可续借 3次</td>
          </tr>
          <tr>
            <td rowspan="7">≥700</td>
          </tr>
          <tr>
            <td>普通书刊 15册</td>
          </tr>
          <tr>
            <td>光盘 15盘</td>
          </tr>
          <tr>
            <td>连续剧 3套</td>
          </tr>
          <tr>
            <td>借期 30天</td>
          </tr>
          <tr>
            <td>可续借 3次</td>
          </tr>
          <tr>
            <td>可免押借阅电子书阅读器</td>
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
        name: "jyemp",
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
                params.append("appid", appid['jieyue']['appId']);
                this.$nextTick(() => {
                    MessageBox.confirm('是否取消授权', '提示').then(() => {
                        projectApi.cancleemp(params).then(rs => {
                            if (rs.code === 200 && rs.message === "Success" && typeof (rs.data) != "undefined") {
                                const params2 = new URLSearchParams();
                                params2.append('certify', window.localStorage.getItem('idcard'));
                                params2.append('score', '0');
                                projectApi.postmsgtolibrary(params2).then(res1 => {
                                    console.log(res1)
                                })
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
    background: url('../../../static/empmanager/信易阅.png') no-repeat;
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
    height: 80vw;
    width: 90vw;
    left: 50%;
    transform: translate(-50%);
    box-shadow: 1px 1px 3px #aaa;
  }


  .jili {
    padding-bottom: 20px;
  }

  .jili-table, .record-table {
    margin-top: 5px;
    width: 100%;
  }

  .jili-table td, .record-table td {
    font-size: .35rem;
    height: 25px;
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
