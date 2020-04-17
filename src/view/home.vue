<template>
  <div class="index-container">
    <div class="index-container-scroll">
      <keep-alive>
        <router-view @change-page="changePage"></router-view>
      </keep-alive>
    </div>
    <div class="bottomdiv" :style="{'margin-bottom': isIphoneX ? '14px' : '0px'}">
      <div class="bobtn" v-on:click="goPage('xyptIndex')" :class="[currentPage === 0 ? 'homeimg-click' : '']">
        <div class="boimg homeimg">
        </div>
        <div class="bttxt">
          首页
        </div>
      </div>
      <div class="bobtn" v-on:click="goToMap" :class="[currentPage === 1 ? 'useimg-click' : '']">
        <div class="boimg useimg">
        </div>
        <div class="bttxt">
          使用瓯江分
        </div>
      </div>
      <div class="bobtn" v-on:click="goPage('WenchowMark')" :class="[currentPage === 2 ? 'myimg-click' : '']">
        <div class="boimg myimg">
        </div>
        <div class="bttxt">
          我的瓯江分
        </div>
      </div>
    </div>
  </div>
</template>

<script>

    export default {
        name: "home",
        data () {
            return {
              currentPage: -1,
              isIphoneX: false
            }
        },
        methods: {
            goPage (name) {
                if (!name) return;
                this.changeCurrentPage(name);
                this.$router.replace({
                    name,
                });
            },
            changeCurrentPage (name) {
                switch (name) {
                  case 'xyptIndex':
                    this.currentPage = 0;
                    break;
                  case 'WenchowMark':
                    this.currentPage = 2;
                    break;
                  default:
                    this.currentPage = 0;
                }
            },
            changePage (name) {
              this.changeCurrentPage(name);
              this.$router.replace({
                name
              });
            },
            /**
            * 跳转到信用地图
            **/
            goToMap () {
                window.open('http://grcxf.wzcredit.gov.cn/map.html#/nlist?tab={"serviceurl":"https://grcxf.wzcredit.gov.cn/arcgis/rest/services/XYDT/MapServer/0","tag":"","name":"借阅"}&list=[{"serviceurl":"https://grcxf.wzcredit.gov.cn/arcgis/rest/services/XYDT/MapServer/0","tag":"","name":"借阅"},{"serviceurl":"https://grcxf.wzcredit.gov.cn/arcgis/rest/services/XYDT/MapServer/1","tag":"","name":"停车"},{"serviceurl":"https://grcxf.wzcredit.gov.cn/arcgis/rest/services/XYDT/MapServer/2","tag":"","name":"旅游"},{"serviceurl":"https://grcxf.wzcredit.gov.cn/arcgis/rest/services/XYDT/MapServer/3","tag":"","name":"健身"},{"serviceurl":"https://grcxf.wzcredit.gov.cn/arcgis/rest/services/XYDT/MapServer/4","tag":"","name":"金融"}]', '_self', null, false);
              // window.open('http://grcxf.wzcredit.gov.cn:8090/#/', '_self', null, false);
            }
        },
        created () {
          this.changeCurrentPage(this.$route.name);
          if (/iphone/gi.test(navigator.userAgent) && (screen.height >= 812 && screen.width >= 375)) {
            this.isIphoneX = true;
          }
        }
    }
</script>

<style scoped>
  .index-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .index-container-scroll {
    flex: 1;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }

  /*解决swpier图滚动后无法滑动的问题*/
  .index-container-scroll::after {
    content: "";
    display: block;
    width: 100%;
    height: 20px;
  }

  .bottomdiv {
    width: 100vw;
    height: 15vw;
    display: flex;
    box-shadow: 1px -1px 2px rgba(170, 170, 170, 0.2);
    background-color: #fff;
  }

  .bobtn {
    position: relative;
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .homeimg {
    background: url('../../static/xyptIndex/home.png') center center no-repeat;
  }
  .useimg {
    background: url('../../static/xyptIndex/useojf.png') center center no-repeat;
  }
  .myimg {
    background: url('../../static/xyptIndex/myojf.png') center center no-repeat;
  }
  .homeimg-click .boimg {
    background: url('../../static/xyptIndex/home_click.png') center center no-repeat;
  }
  .useimg-click .boimg {
    background: url('../../static/xyptIndex/useojf_click.png') center center no-repeat;
  }
  .myimg-click .boimg {
    background: url('../../static/xyptIndex/myojf_click.png') center center no-repeat;
  }
  .homeimg-click .bttxt, .useimg-click .bttxt, .myimg-click .bttxt {
    color: rgb(74, 185, 255);
  }
  .bobtn .boimg {
    background-size: 100% 100%;
    margin-bottom: 5px;
    height: 8vw;
    width: 8vw;
  }
  .bttxt {
    font-size: 3vw;
    line-height: 2vw;
  }
</style>
