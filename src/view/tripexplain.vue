<template>
  <div class="trip">
    <div class="trip-title">
      <div class="title-select">
        <trip-select :select-data="selectData"></trip-select>
      </div>
    </div>
    <div class="jysm desc">
      <div class="ming">文成县<!--<div class="ques" @click="popupToast"></div>--></div>
      <div class="desc-content">
        <!--         文成县位于浙江省南部山区，温州市西南部，飞云江中上游，是浙江省温州市下辖的六个县之一。瓯江分达到「<span class="mkshow">700</span>」分的用户，在文成县旅游景点及其周边住宿餐饮场所可以享受优惠政策。 -->
        文成县位于浙江省南部山区，温州市西南部，飞云江中上游，是浙江省温州市下辖的六个县之一。瓯江分达到「<span class="mkshow">700</span>」分的用户，在文成县旅游景点可以享受优惠政策。<span
        style="text-decoration:underline;color: rgba(60, 155, 216, 0.8);" @click="popupToast">使用说明</span>
      </div>
    </div>
    <div class="jysm">
      <div class="jili" v-for="(value, index) of tableContent" :key="index">
        <div class="ming">{{ value.tableType }}</div>
        <div class="table-img">
          <lunbo :lun-bo-list="value.tableImg"></lunbo>
        </div>
        <div v-for="(item, index) of value.tableTypeInner" :key="index" class="jili-cell">
          <mt-cell :title="item.point" :value="item.pointInner"></mt-cell>
        </div>
      </div>
    </div>
    <mt-popup
      v-model="popupVisible"
      pop-transition="popup-fade" style="width: 80%">
      <div class="help-img">
        <img src="../../static/empindex/close.png" class="close" @click="popupVisible = false;">
        <img src="../../static/empindex/trip_help.jpg" style="width: 100%; display: block;">
      </div>
    </mt-popup>
  </div>
</template>
<script>
    const appid = window.allAppId;
    import select from '@/components/select.vue';
    import projectApi from '@/assets/index';
    import lunbo from '@/components/lunbo';

    export default {
        data() {
            return {
                empallow: "",
                recordFlag: false,
                selectData: [
                    {
                        name: '文成县'
                    }
                ],
                tableContent: [
                    {
                        tableType: '景区',
                        tableImg: [
                            {
                                src: require('../../static/empindex/wc_jingqu1.png')
                            },
                            {
                                src: require('../../static/empindex/wc_jingqu2.png')
                            },
                            {
                                src: require('../../static/empindex/wc_jingqu3.png')
                            },
                            {
                                src: require('../../static/empindex/wc_jingqu4.png')
                            }
                        ],
                        tableTypeInner: [
                            {
                                point: '700-749',
                                // pointInner: '刘基庙景区门票全免，百丈漈景区、铜铃山景区门票半价'
                                pointInner: '刘基庙景区门票全免，百丈漈景区门票半价'
                            },
                            {
                                point: '≥750',
                                // pointInner: '百丈漈景区、刘基庙景区、铜铃山景区门票全免'
                                pointInner: '百丈漈景区、刘基庙景区门票全免'
                            }
                        ]
                    }
                    // {
                    //   tableType: '住宿',
                    //   tableImg: [
                    //     {
                    //       src: require('../../../static/empindex/wc_jingqu2.png')
                    //     }
                    //   ],
                    //   tableTypeInner: [
                    //     {
                    //       point: '700-749',
                    //       pointInner: '天顶湖农庄、让川悦慢民宿、文成国际酒店当日前台房价8折优惠，免押金'
                    //     },
                    //     {
                    //       point: '>750',
                    //       pointInner: '天顶湖农庄当日前台房价6折优惠，让川悦慢民宿、文成国际酒店当日前台房价7折优惠，免押金'
                    //     }
                    //   ]
                    // },
                    // {
                    //   tableType: '餐饮',
                    //   tableImg: [
                    //     {
                    //       src: require('../../../static/empindex/wc_jingqu3.png')
                    //     }
                    //   ],
                    //   tableTypeInner: [
                    //     {
                    //       point: '700-749',
                    //       pointInner: '天顶湖农庄、让川悦慢民宿、文成国际酒店餐费9折优惠（不包含特价活动）'
                    //     },
                    //     {
                    //       point: '>750',
                    //       pointInner: '天顶湖农庄、让川悦慢民宿、文成国际酒店餐费8折优惠（不包含特价活动）'
                    //     }
                    //   ]
                    // }
                ],
                popupVisible: false
            }
        },
        components: {
            lunbo,
            tripSelect: select
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
  .trip {
    width: 100%;
  }

  .trip-title {
    width: 100%;
    height: 160px;
    background: url('../../static/empindex/trip_bg.png') center center no-repeat;
    background-size: cover;
    position: relative;
  }

  .title-select {
    position: absolute;
    z-index: 5;
    right: 10px;
    top: 10px;
  }

  .mkshow {
    font-family: Times New Roman;
    color: rgba(60, 155, 216, 0.8);
    font-weight: bold;
  }

  .jysm {
    margin: 0 auto 20px;
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
    border-bottom: 1px solid rgb(177, 177, 177);
    line-height: 15vw;
    text-align: left;
    color: black;
    font-size: 5vw;
    font-weight: bold;
    color: #000;
    text-indent: 16px;
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

  .jili-cell {
    padding: 0 16px;
    margin: 17px 0;
  }

  .table-img {
    padding: 15px 16px 0;
  }

  .table-img /deep/ .lunbo {
    width: 100%;
    left: 0;
  }

  .table-img /deep/ .lunbo img {
    display: block;
  }

  .jili /deep/ .jili-cell .mint-cell {
    background: none;
  }

  .jili /deep/ .jili-cell .mint-cell-wrapper {
    background: none;
    align-items: normal;
    font-size: 0.35rem;
    padding: 0;
    text-align: left;
    line-height: 0.61rem;
  }

  .jili /deep/ .mint-cell-wrapper .mint-cell-title {
    max-width: 2.16rem;
    color: #333;
  }

  .jili /deep/ .mint-cell-wrapper .mint-cell-value {
    flex: 1;
    color: #333;
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
</style>
