<template>
  <div class="park">
    <div class="park-title"></div>
    <div class="jysm desc">
      <div class="ming">信用停车
        <!--<div class="ques" @click="popupToast"></div>-->
      </div>
      <div class="desc-content">
        瓯江分「<span class="mkshow">650</span>」起可以在温州市享受以下停车优惠权益。<span
        style="text-decoration:underline;color: rgba(60, 155, 216, 0.8);" @click="popupToast">使用说明</span>
      </div>
    </div>
    <div class="jysm">
      <div class="jili">
        <table class="jili-table">
          <thead>
          <tr>
            <td>区域</td>
            <td>诚信分</td>
            <td>信用停车</td>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td rowspan="1">龙湾区</td>
            <td>≥650</td>
            <td>
              先离场后付费<br>
              <!-- 免费停车市场延长<br> -->
              停车费八折
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <mt-popup
      v-model="popupVisible"
      pop-transition="popup-fade" style="width: 80%">
      <div class="help-img">
        <img src="../../static/empindex/close.png" class="close" @click="popupVisible = false;">
        <img src="../../static/empindex/park_help.jpg" style="width: 100%; display: block;">
      </div>
    </mt-popup>
  </div>
</template>
<script>
    const appid = window.allAppId;
    import projectApi from '@/assets/index'
    import myTable from '@/components/table.vue'

    export default {
        data() {
            return {
                empallow: "",
                recordFlag: false,
                popupVisible: false,
            }
        },
        components: {
            myTable
        },
        methods: {
            popupToast() {
                this.popupVisible = true;
            },
        },
        created() {
        }
    }
</script>
<style scoped>
  .park {
    width: 100%;
  }

  .park-title {
    width: 100%;
    height: 160px;
    background: url('../../static/empindex/park_bg.png') center center no-repeat;
    background-size: cover;
  }

  .mkshow {
    font-family: Times New Roman;
    color: rgba(60, 155, 216, 0.8);
    font-weight: bold;
  }

  .jysm {
    margin: 0 auto;
    overflow: hidden;
    width: 90vw;
    padding: 0 .5rem;
    box-sizing: border-box;
    border-radius: 5px;
    box-shadow: 0px 0px 3px #aaa;
    background: #FFF;
    color: rgba(128, 128, 128, 0.8);
  }

  .desc {
    position: relative;
    margin: -30px auto 20px;
  }

  .desc-content {
    text-indent: .6rem;
    font-size: .35rem;
    line-height: .43rem;
    margin: .2rem .3rem;
    text-align: left;
    color: rgba(128, 128, 128, 0.8);
  }

  .bot {
    position: relative;
    margin: 20px auto;
  }

  .ming {
    margin: 0 auto;
    border-bottom: 1px solid rgba(128, 128, 128, 0.2);
    line-height: 15vw;
    text-align: left;
    color: black;
    font-size: 5vw;
    font-weight: bold;
    position: relative;
  }

  .ques {
    position: absolute;
    z-index: 3;
    width: 6vw;
    height: 6vw;
    right: 3vw;
    top: 50%;
    transform: translateY(-50%);
    background: url('../../static/empindex/ques_black.png') no-repeat;
    background-size: 100% 100%;
  }

  .jili {
    padding-bottom: 20px;
  }

  .record {
    padding-bottom: 10px;
  }

  .jili-table, .record-table {
    margin-top: 5px;
    width: 100%;
  }

  .jili-table td {
    line-height: .7rem;
  }

  .jili-table td, .record-table td {
    font-size: .35rem;
    height: 25px;
  }

  .emp {
    margin: 20px auto;
    width: 80vw;
    height: 15vw;
    font-weight: bold;
    line-height: 15vw;
    font-size: 5vw;
    text-align: center;
    border-radius: 50px;
    color: #FFF;
    background-color: #5679B7;
  }


  .no-data {
    font-size: 14px;
    color: #ddd;
    padding: 5px 0;
  }

  .help-img {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .close {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 3;
    height: 8vw;
  }

  .record-inner /deep/ .custom-span {
    color: #428bca;
    text-decoration: underline;
  }

  .record-inner /deep/ .custom-span:active {
    color: red;
  }
</style>
