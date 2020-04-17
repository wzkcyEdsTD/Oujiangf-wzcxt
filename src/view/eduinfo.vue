<template>
  <div class="page_eduinfo">
    <div class="title">
      <img
        src="../../static/eduinfo/lock.png"
        style="width:7vw;height:7vw;position:absolute;left:4vw;top: 6vw;"
      >
      <div class="promise">我们承诺，未经本人授权将不会对外提供信息</div>
    </div>
    <div class="infoframe">
      <div class="infobg">
        <div class="first">地区</div>
        <div class="second"><input type="text" class="inputstyle" v-model="cityname" @input="displaySubmit"></div>
        <!-- <div class="second">{{cityname || ""}}<span class="right-icon"></span></div> -->
      </div>
      <!-- <div class="infobg" v-on:click="goPage('eduinfo_city', cid, cityname)"> -->
        <!-- <div class="first">地区</div> -->
        <!-- <div class="second">{{cityname || ""}}<span class="right-icon"></span></div> -->
      <!-- </div> -->
      <div class="infobg">
        <div class="first">院校名称</div>
        <div class="second"><input type="text" class="inputstyle" v-model="schoolname" @input="displaySubmit"></div>
      </div>
      <!-- <div class="infobg" v-on:click="goPage('eduinfo_school',cid,cityname,sid,schoolname)">
        <div class="first">院校名称</div>
        <div class="second">{{schoolname || ""}}<span class="right-icon"></span></div>
      </div> -->
      <div class="infobg" v-on:click="goPage('edustatus',cityname,schoolname,status,statusname,levelstatus,edulevel,date)">
        <div class="first">当前状态</div>
        <div class="second">{{statusname || ""}}<span class="right-icon"></span></div>
      </div>
      <div class="infobg" id="gedu" v-on:click="goPage('edulevel',cityname,schoolname,status,statusname,levelstatus,edulevel,date)">
        <div class="first">最高学历</div>
        <div class="second">{{edulevel || ""}}<span class="right-icon"></span></div>
      </div>
      <div class="infobg" id="redu" v-on:click="goPage('edulevel',cityname,schoolname,status,statusname,levelstatus,edulevel,date)">
        <div class="first">学历</div>
        <div class="second">{{edulevel || ""}}<span class="right-icon"></span></div>
      </div>
      <div class="infobg" id="gtime">
        <div class="first">毕业时间</div>
        <div class="second"><input type="text" class="choosetime" @click="setDate" v-bind:value="date"
                                   onfocus="this.blur();"/></div>
      </div>
      <div class="infobg" id="rtime">
        <div class="first">入学时间</div>
        <div class="second"><input type="text" class="choosetime" @click="setDate" v-bind:value="date"
                                   onfocus="this.blur();"/></div>
      </div>
    </div>
    <div class="line" id="submitbtn">
      <div class="submit"
           v-on:click="updatedu(cityname,schoolname,status,statusname,levelstatus,edulevel,date)">提交信息
      </div>
    </div>
  </div>
</template>
<script>
    import projectApi from '../assets/index'

    export default {
        name: "eduinfo",
        data() {
            return {
                cityname: undefined,
                schoolname: undefined,
                status: undefined,
                statusname: undefined,
                levelstatus: undefined,
                edulevel: undefined,
                date: ''
            };
        },
        components: {},
        methods: {
            goPage(name, cityname, schoolname, status, statusname, levelstatus, edulevel, date) {
                if (name === "eduinfo_school") {
                    this.$toast("请按顺序填写信息");
                    return;
                }
                this.$router.replace({
                    name,
                    params: {cityname, schoolname, status, statusname, levelstatus, edulevel, date}
                });
            },
            updatedu(cityname, schoolname, status, statusname, levelstatus, edulevel, date) {
                // if (cityname !== '' && schoolname !== '' && status !== '' && statusname !== '' && levelstatus !== '' && edulevel !== '') {
                //     return;
                // }
                var params = new URLSearchParams();
                params.append('idcard', window.localStorage.getItem("idcard"));
                params.append('cityname', cityname);
                params.append('schoolname', schoolname);
                params.append('status', status);
                params.append('statusname', statusname);
                params.append('levelstatus', levelstatus);
                params.append('edulevel', edulevel);
                params.append('date', date);
                params.append('pc', '1');
                projectApi.updatedu(params).then(res => {
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
            },
            setDate() {
                this.$picker.show({
                    type: 'datePicker',
                    date: '2008-01-01',
                    endTime: '2100-01-01',
                    startTime: '1900-01-01',
                    onOk: (date) => {
                        this.date = date;
                    }
                });
                // cid: undefined,
                // cityname: undefined,
                // sid: undefined,
                // schoolname: undefined,
                // status: undefined,
                // statusname: undefined,
                // levelstatus: undefined,
                // edulevel: undefined,
                if (!this.cityname || !this.schoolname || !this.statusname || !this.edulevel) {
                    document.getElementById("submitbtn").style.display = "none";
                } else {
                    document.getElementById("submitbtn").style.display = "inherit";
                }
            },
            displaySubmit () {
                if (!this.cityname || !this.schoolname || !this.statusname || !this.edulevel) {
                    document.getElementById("submitbtn").style.display = "none";
                } else {
                    document.getElementById("submitbtn").style.display = "inherit";
                }
            },
            format(str) {
                var time = new Date(str);
                var y = time.getFullYear();
                var m = (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1);
                var d = time.getDate() < 10 ? ('0' + time.getDate()) : time.getDate();
                return y + '-' + m + '-' + d;
            }
        },
        mounted() {
            document.getElementById("gedu").style.display = "none";
            document.getElementById("gtime").style.display = "none";
            document.getElementById("redu").style.display = "none";
            document.getElementById("rtime").style.display = "none";
            document.getElementById("submitbtn").style.display = "none";

            if (JSON.stringify(this.$route.params) == '{}') {
                var params = new URLSearchParams();
                params.append('idcard', window.localStorage.getItem("idcard"));
                projectApi.edutable(params).then(res => {
                    if (res != null) {
                        this.cityname = res.cityname;
                        this.schoolname = res.schoolname;
                        this.status = res.status;
                        this.statusname = res.statusname;
                        this.levelstatus = res.levelstatus;
                        this.edulevel = res.edulevel;
                        this.date = this.format(res.date);
                    }
                })
                    .then(() => {
                        console.log(status);
                        if (this.status === 0) {
                            document.getElementById("redu").style.display = "inherit";
                            document.getElementById("rtime").style.display = "inherit";
                            document.getElementById("gedu").style.display = "none";
                            document.getElementById("gtime").style.display = "none";
                        }
                        if (this.status === 1) {
                            document.getElementById("redu").style.display = "none";
                            document.getElementById("rtime").style.display = "none";
                            document.getElementById("gedu").style.display = "inherit";
                            document.getElementById("gtime").style.display = "inherit";
                        }
                    })
            } else {
                const {cityname} = this.$route.params;
                this.cityname = cityname || undefined;
                const {schoolname} = this.$route.params;
                this.schoolname = schoolname || undefined;
                const {status} = this.$route.params;
                this.status = status;
                const {statusname} = this.$route.params;
                this.statusname = statusname || undefined;
                const {levelstatus} = this.$route.params;
                this.levelstatus = levelstatus || undefined;
                const {edulevel} = this.$route.params;
                this.edulevel = edulevel || undefined;
                const {date} = this.$route.params;
                this.date = date || undefined;
                if (this.status == 0) {
                    document.getElementById("redu").style.display = "inherit";
                    document.getElementById("rtime").style.display = "inherit";
                    document.getElementById("gedu").style.display = "none";
                    document.getElementById("gtime").style.display = "none";
                }
                if (this.status == 1) {
                    document.getElementById("redu").style.display = "none";
                    document.getElementById("rtime").style.display = "none";
                    document.getElementById("gedu").style.display = "inherit";
                    document.getElementById("gtime").style.display = "inherit";
                }
            }


        }
    };
</script>
<style scoped>
  .page_eduinfo {
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


  .choosetime {
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
  .right-icon {
    vertical-align: text-top;
    margin-left: 5px;
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
  }
</style>

