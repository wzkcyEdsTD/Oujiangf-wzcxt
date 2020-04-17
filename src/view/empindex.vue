<template>
  <div class="jieyueshuoming">
    <div class="jieyue-tab">
      <mt-navbar v-model="selected" class="jieyue-navbar">
        <mt-tab-item v-for="(value, index) of tabList" :key="index" :id="value.id">{{ value.name }}</mt-tab-item>
      </mt-navbar>
      <div class="jieyue-tools">
        <img src="../../static/empindex/map.png" class="dingwei" @click="goToMap">
        <img src="../../static/empindex/home.png" class="home" @click="goToHome">
      </div>
    </div>
    <div class="jieyue-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script src="https://wow.techbrood.com/libs/jquery/jquery-1.11.1.min.js"></script>
<script>
    export default {
        name: "empindex",
        data() {
            return {
                tabList: [
                    {
                        id: 1,
                        router: 'book',
                        name: '图书'
                    },
                    {
                        id: 2,
                        router: 'park',
                        name: '停车'
                    },
                    {
                        id: 3,
                        router: 'trip',
                        name: '旅游'
                    },
                    {
                        id: 4,
                        router: 'exercise',
                        name: '健身'
                    },
                    {
                        id: 5,
                        router: 'finance',
                        name: '金融'
                    }
                ],
                selected: 1
            }
        },
        methods: {
            goToHome() {
                this.$router.push({name: 'xyptIndex'});
            },
            // 跳转信用地图
            goToMap() {
                const list = '&list=[{"serviceurl":"https://grcxf.wzcredit.gov.cn/arcgis/rest/services/XYDT/MapServer/0","tag":"","name":"借阅"},{"serviceurl":"https://grcxf.wzcredit.gov.cn/arcgis/rest/services/XYDT/MapServer/1","tag":"","name":"停车"},{"serviceurl":"https://grcxf.wzcredit.gov.cn/arcgis/rest/services/XYDT/MapServer/2","tag":"","name":"旅游"},{"serviceurl":"https://grcxf.wzcredit.gov.cn/arcgis/rest/services/XYDT/MapServer/3","tag":"","name":"健身"},{"serviceurl":"https://grcxf.wzcredit.gov.cn/arcgis/rest/services/XYDT/MapServer/4","tag":"","name":"金融"}]';
                switch (this.selected) {
                    case 1:
                        window.open('http://grcxf.wzcredit.gov.cn/map.html#/nlist?tab={"serviceurl":"https://grcxf.wzcredit.gov.cn/arcgis/rest/services/XYDT/MapServer/0","tag":"","name":"借阅"}' + list, '_self', null, false);
                        break;
                    case 2:
                        window.open('http://grcxf.wzcredit.gov.cn/map.html#/nlist?tab={"serviceurl":"https://grcxf.wzcredit.gov.cn/arcgis/rest/services/XYDT/MapServer/1","tag":"","name":"停车"}' + list, '_self', null, false);
                        break;
                    case 3:
                        window.open('http://grcxf.wzcredit.gov.cn/map.html#/nlist?tab={"serviceurl":"https://grcxf.wzcredit.gov.cn/arcgis/rest/services/XYDT/MapServer/2","tag":"","name":"旅游"}' + list, '_self', null, false);
                        break;
                    case 4:
                        window.open('http://grcxf.wzcredit.gov.cn/map.html#/nlist?tab={"serviceurl":"https://grcxf.wzcredit.gov.cn/arcgis/rest/services/XYDT/MapServer/3","tag":"","name":"健身"}' + list, '_self', null, false);
                        break;
                    case 5:
                        window.open('http://grcxf.wzcredit.gov.cn/map.html#/nlist?tab={"serviceurl":"https://grcxf.wzcredit.gov.cn/arcgis/rest/services/XYDT/MapServer/4","tag":"","name":"金融"}' + list, '_self', null, false);
                        break;
                }
            }
        },
        created() {
            let index = this.tabList.findIndex((item) => {
                return item.name === this.$route.meta.title;
            })
            this.selected = index > -1 ? this.tabList[index].id : 1;
        },
        watch: {
            selected(val) {
                let index = this.tabList.findIndex((item) => {
                    return item.id === val;
                })
                let routerName = index > -1 ? this.tabList[index].router : 'book';
                this.$router.replace({name: routerName});
            }
        }
    }
</script>
<style scoped>
  .jieyueshuoming {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .jieyue-tab {
    height: 45px;
    display: flex;
    background-color: #fff;
  }

  .jieyue-navbar {
    height: 100%;
    flex: 1;
  }

  .jieyue-navbar /deep/ .mint-tab-item {
    height: 100%;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(179, 179, 179);
    max-width: 58px;
  }

  .jieyue-navbar /deep/ .mint-tab-item-label {
    font-size: 14px;
  }

  .jieyue-navbar /deep/ .mint-tab-item.is-selected {
    color: #26a2ff;
    margin-bottom: 0;
    border-bottom: none;
    position: relative;
  }

  .jieyue-navbar /deep/ .mint-tab-item.is-selected::after {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    height: .1rem;
    width: 60%;
    border-radius: 30px;
    background-color: #26a2ff;
  }

  .jieyue-tools {
    position: relative;
    margin: .3rem 0;
    padding-right: .25rem;
    width: 20%;
  }

  .jieyue-tools::after {
    content: "";
    position: absolute;
    z-index: 2;
    width: 2px;
    height: 100%;
    background-color: #ddd;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 30px;
  }

  .jieyue-tools .dingwei {
    height: 100%;
    margin-right: .2rem;
    width: calc(45px - .6rem);
  }

  .jieyue-tools .home {
    height: 100%;
    width: calc(45px - .6rem);
  }

  .jieyue-content {
    flex: 1;
    overflow: scroll;
  }

  .fade-down-enter-active, .fade-down-leave-active {
    transition: transform .5s ease, opacity .5s ease;
  }

  .fade-down-enter, .fade-down-leave-to {
    opacity: 0;
    transform: translateY(5%);
    position: absolute;
  }
</style>

