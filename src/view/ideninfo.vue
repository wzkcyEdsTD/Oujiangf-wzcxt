<template>
  <div class="page_ideninfo">
    <div class="title">
      <img
        src="../../static/eduinfo/lock.png"
        style="width:7vw;height:7vw;position:absolute;left:4vw;top: 6vw;"
      >
      <div class="promise">我们承诺，未经本人授权将不会对外提供信息</div>
    </div>
    <div class="infoframe">
      <div class="infobg" v-on:click="goPage('job',job,marriage,marriagename,address)">
        <div class="first">职业</div>
        <div class="second">{{job || ""}}<span class="right-icon"></span></div>
      </div>
      <div class="infobg" v-on:click="goPage('marriage',job,marriage,marriagename,address)">
        <div class="first">婚姻状况</div>
        <div class="second">{{marriagename || ""}}<span class="right-icon"></span></div>
      </div>
      <div class="infobg">
        <div class="first">居住地址</div>
        <div class="second"><input type="text" class="inputstyle" v-model="address" @input="changenum"></div>
      </div>
    </div>
    <div class="line" id="submitbtn" v-show="flag">
      <div class="submit" v-on:click="updatiden(job,marriage,marriagename,address)">提交信息</div>
    </div>
  </div>
</template>
<script>
    import projectApi from '../assets/index'
    import {mixin} from '@/js/mixin.js'

    export default {
        name: "ideninfo",
        mixins: [mixin],
        data() {
            return {
                job: undefined,
                marriage: undefined,
                marriagename: undefined,
                address: undefined,
                flag: false,
            };
        },
        components: {},
        methods: {
            goPage(name, job, marriage, marriagename, address) {
                this.$router.replace({
                    name,
                    params: {job, marriage, marriagename, address}
                });
            },
            changenum() {
                this.flag = true;
            },
            updatiden(job, marriage, marriagename, address) {
                var params = new URLSearchParams();
                params.append('idcard', window.localStorage.getItem("idcard"));
                params.append('job', job);
                params.append('marriage', marriage);
                params.append('marriagename', marriagename);
                params.append('pc', '1');
                params.append('address', address);
                console.log(params);
                projectApi.updatiden(params).then(res => {
                    if (res == 1) {
                        this.flag = false;
                        this.$toast("修改成功");
                        return;
                    }
                }).catch((err) => {
                    console.log(err);
                }).then(() => {
                    this.goPage('personinfo');
                })
            },

        },
        mounted() {
            this.flag = false;
            if (JSON.stringify(this.$route.params) == '{}') {
                var params = new URLSearchParams();
                params.append('idcard', window.localStorage.getItem("idcard"));
                projectApi.identable(params).then(res => {
                    if (res != null) {
                        this.job = res.job;
                        this.marriage = res.marriage;
                        this.marriagename = res.marriagename;
                        this.address = res.address;
                    }
                })
            } else {
                const {job} = this.$route.params;
                this.job = job || undefined;
                const {marriage} = this.$route.params;
                this.marriage = marriage;
                const {marriagename} = this.$route.params;
                this.marriagename = marriagename || undefined;
                const {address} = this.$route.params;
                this.address = address || undefined;
                if (typeof (job) != "undefined" && typeof (marriage) != "undefined" && typeof (address) != "undefined") {
                    this.flag = true;
                }
            }
        }
    }
</script>
<style scoped>
  .page_ideninfo {
    width: 100%;
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .title {
    width: 100vw;
    height: 20vw;
    position: relative;
    top: 0px;
    left: 50%;
    transform: translate(-50%);
    background: url("../../static/eduinfo/edubg.png") no-repeat;
    background-size: 100% 100%;
  }

  .infoframe {
    position: relative;
  }

  .promise {
    height: 10vw;
    position: absolute;
    top: 5vw;
    left: 15vw;
    line-height: 10vw;
    font-size: 4vw;
    color: #fff;
    text-align: center;
  }

  .infobg {
    text-decoration: none;
    cursor: pointer;
    display: block;
    height: 15vw;
    box-sizing: border-box;
    padding-left: 5vw;
    /*    padding-right: 10vw;*/
    border-bottom: 1px solid rgba(128, 128, 128, 0.2);
  }

  .first {
    color: black;
    height: 15vw;
    display: inline-block;
    font-size: 4vw;
    line-height: 15vw;
    text-align: left;
    float: left;
  }

  .second {
    color: #aaa;
    height: 15vw;
    padding-right: 10vw;
    font-size: 4vw;
    line-height: 15vw;
    text-align: center;
    float: right;
    display: flex;
    align-items: center;
  }

  .inputstyle {
    background-color: transparent;
    border: 0;
    height: 9vw;
    width: 40vw;
    color: #aaa;
    font-size: 4vw;
    line-height: 9vw;
    text-align: right;
    float: right;
    margin: auto 0;
    margin-right: 3vw;
  }

  .line {
    margin: 40vw auto 0 auto;
    width: 80vw;
    height: 1vw;
    padding-bottom: 30vw;
    border-top: 1px solid rgba(128, 128, 128, 0.4);
  }

  .submit {
    position: relative;
    width: 100%;
    height: 15vw;
    top: 5vw;
    line-height: 15vw;
    font-size: 24px;
    color: #FFF;
    text-align: center;
    background: #3798D7;
    border-radius: 50px;
  }

  .router-link-active {
    text-decoration: none;
  }
  .right-icon {
    margin-left: 5px;
  }
</style>

