<template>
  <div class="book">
    <div class="book-title"></div>
    <div class="jysm desc">
      <div class="ming">
        信用借阅
        <!--<div class="ques" @click="popupToast"></div>-->
      </div>
      <div class="desc-content">
        瓯江分「<span class="mkshow">700</span>」起可以在温州地区公共图书馆（除少儿馆外）、城市书房及百姓书屋享受以下信用借阅权益升级。<span
        style="text-decoration:underline;color: rgba(60, 155, 216, 0.8);" @click="popupToast">使用说明</span>
      </div>
    </div>
    <div class="jysm">
      <div class="jili">
        <table class="jili-table">
          <thead>
          <tr>
            <td></td>
            <td style="width: 50%;">借阅数量</td>
            <td style="width: 25%;">借期</td>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>普通免押读者证</td>
            <td>借阅普通书刊10册，光盘10盘，连续剧2套</td>
            <td>30天，可续借2次</td>
          </tr>
          <tr>
            <td>瓯江分700分及以上</td>
            <td>借阅普通书刊15册，光盘15盘，连续剧3套</td>
            <td>30天，可续借3次</td>
          </tr>
          <tr>
            <td>瓯江分750分及以上</td>
            <td>借阅普通书刊15册，光盘15盘，连续剧3套，可免押借阅电子书阅读器</td>
            <td>30天，可续借3次</td>
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
        <img src="../../static/empindex/book_help.jpg" style="width: 100%; display: block;">
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
  .book {
    width: 100%;
  }

  .book-title {
    width: 100%;
    height: 160px;
    background: url('../../static/empindex/book_bg.png') center center no-repeat;
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

  .jili-table td, .record-table td {
    font-size: .35rem;
    height: 30px;
    padding: 1vw;
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

  .reocord-choose {
    text-align: left;
    width: 100%;
    font-size: 0.37rem;
  }

  .reocord-choose span {
    font-weight: 500;
    position: relative;
    display: inline-block;
    padding: .43rem .51rem .32rem;
    color: rgb(183, 183, 183);
  }

  .reocord-choose .record-current {
    color: rgb(100, 175, 224);
  }

  .reocord-choose .record-current::after {
    position: absolute;
    content: "";
    width: 0.16rem;
    height: 0.16rem;
    top: .42rem;
    right: .3rem;
    background: rgb(61, 156, 217);
    border-radius: 50% 50%;
  }
</style>
