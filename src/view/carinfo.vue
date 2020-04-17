<template>
  <div class="page_carinfo">
    <div class="title">
      <img
        src="../../static/eduinfo/lock.png"
        style="width:7vw;height:7vw;position:absolute;left:4vw;top: 6vw;"
      >
      <div class="promise">我们承诺，未经本人授权将不会对外提供信息</div>
    </div>
    <div class="infoframe">
      <div class="infobg">
        <div class="first">车牌号</div>
        <div class="second">
          <input type="text" class="inputstyle" placeholder="例:浙A111AA" v-model="licnum"
                 @input="changenum"></div>
      </div>
    </div>
    <div class="line" id="submitbtn">
      <div class="submit"
           v-on:click="updatcar(licnum)">提交信息
      </div>
    </div>
  </div>
</template>
<script>
    import projectApi from '../assets/index'
    import {mixin} from '@/js/mixin.js'

    export default {
        name: "carinfo",
        mixins: [mixin],
        data() {
            return {
                licnum: undefined,
            };
        },
        components: {},
        methods: {
            goPage(name) {
                this.$router.replace({
                    name,
                });
            },
            changenum() {
                document.getElementById("submitbtn").style.display = "inherit";
            },
            islicnum(num) {
                var result = false;
                if (num.length == 7) {
                    var express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
                    result = express.test(num);
                }
                return result;
            },
            updatcar(licnum) {
                const rt = this.islicnum(licnum);
                if (rt === false && licnum != '') {
                    this.$toast("请输入正确的车牌号！");
                    return false;
                }
                ;
                if (licnum != '') {
                    var params = new URLSearchParams();
                    params.append('idcard', window.localStorage.getItem("idcard"));
                    params.append('licnum', licnum);
                    params.append('pc', '1');
                    console.log(params);
                    projectApi.updatcar(params).then(res => {
                        if (res == 1) {
                            document.getElementById("submitbtn").style.display = "none";
                            this.$toast("修改成功");
                            return;
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                        .then(() => {
                            this.goPage('personinfo');
                        })
                } else {
                    var params = new URLSearchParams();
                    params.append('idcard', window.localStorage.getItem("idcard"));
                    params.append('licnum', licnum);
                    params.append('pc', '0');
                    console.log(params);
                    projectApi.updatcar(params).then(res => {
                        if (res == 1) {
                            document.getElementById("submitbtn").style.display = "none";
                            this.$toast("修改成功");
                            return;
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                        .then(() => {
                            this.goPage('personinfo');
                        })
                }
            }
        },
        mounted() {
            document.getElementById("submitbtn").style.display = "none";
            if (JSON.stringify(this.$route.params) == '{}') {
                var params = new URLSearchParams();
                params.append('idcard', window.localStorage.getItem("idcard"));
                projectApi.cartable(params).then(res => {
                    if (res != null) {
                        this.licnum = res.licnum;
                    }
                })
            } else {
                const {licnum} = this.$route.params;
                this.licnum = licnum;
                if (typeof (type) != "undefined" && typeof (licnum) != "undefined") {
                    document.getElementById("submitbtn").style.display = "inherit";
                }
            }
        }
    };
</script>
<style scoped>
  .page_carinfo {
    height: 100%;
    width: 100%;
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
    height: 15vw;
    display: inline-block;
    padding-right: 10vw;
    font-size: 3.5vw;
    line-height: 15vw;
    float: right;
    /*    color: white;
        background-color: #1e68bb;
        border-radius: 2px;
        border: white .5px solid;
        text-align: center;
        padding: 2px 9px;
        display: inline-block;
        box-shadow: 0 0 1px 2px #1e68bb;*/
  }

  .inputstyle {
    background-color: #1e68bb;
    border-radius: 2px;
    border: white .5px solid;
    box-shadow: 0 0 1px 2px #1e68bb;
    height: 9vw;
    width: 40vw;
    color: white;
    font-size: 4vw;
    line-height: 9vw;
    text-align: center;
    float: right;
    margin-top: 3vw;
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
    font-size: 4vw;
    color: #FFF;
    text-align: center;
    background: #3798D7;
    border-radius: 50px;
  }

  .inputstyle::-webkit-input-placeholder {
    color: #ccc;
  }
</style>

