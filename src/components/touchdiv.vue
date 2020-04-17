<template>
  <div class="hello">
    <swiper :options="swiperOptions" ref="mySwiper" >
      <swiperSlide v-for="(item,index) in list" :key=index class='swiperSlide'>
        <div :style="item.style">
          <div :class="item.kind" :style="item.imgstyle"></div>
          <div :class="item.name">{{item.typename}}</div>
          <div :class="item.brief">{{item.des}}</div>
        </div>
      </swiperSlide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
    import {swiper, swiperSlide} from 'vue-awesome-swiper'

    export default {
        data() {
            const self = this
            return {
                bannerIndex:"",
                list: [
                    {
                        style: "width: 86vw;height: 40vw;position: relative;left:7vw;background: url('../../static/WenchowMark/touchbg.png') no-repeat;background-size:100% 100%;",
                        kind: "sftzimg",
                        name: "sftz",
                        brief: "sftzbrief",
                        typename: "身份特质",
                        des: "主要反映市民个人基本信息，包含户口、学历、就业及社保公积金等情况。",
                        imgstyle: "    background: url('../../static/WenchowMark/sftzimg.png') no-repeat;\n" +
                            "    background-size: 100% 100%;",
                    },
                    {
                        style: "width: 86vw;height: 40vw;position: relative;left:7vw;background: url('../../static/WenchowMark/touchbg.png') no-repeat;background-size:100% 100%;",
                        kind: "sftzimg",
                        name: "sftz",
                        brief: "sftzbrief",
                        typename: "遵纪守法",
                        des: "主要反映市民履行社会义务、遵守公序良俗的情况，包含公检法信息及纳税信息等。",
                        imgstyle: "    background: url('../../static/WenchowMark/zjsfimg.png') no-repeat;\n" +
                            "    background-size: 100% 100%;",
                    },
                    {
                        style: "width: 86vw;height: 40vw;position: relative;left:7vw;background: url('../../static/WenchowMark/touchbg.png') no-repeat;background-size:100% 100%;",
                        kind: "sftzimg",
                        name: "sftz",
                        brief: "sftzbrief",
                        typename: "商业用信",
                        des: "主要反映市民在金融服务领域的履约情况，包含履行合约、金融信贷等领域的用信行为。",
                        imgstyle: "    background: url('../../static/WenchowMark/syxyimg.png') no-repeat;\n" +
                            "    background-size: 100% 100%;",
                    },
                    {
                        style: "width: 86vw;height: 40vw;position: relative;left:7vw;background: url('../../static/WenchowMark/touchbg.png') no-repeat;background-size:100% 100%;",
                        kind: "sftzimg",
                        name: "sftz",
                        brief: "sftzbrief",
                        typename: "生活用信",
                        des: "主要反映市民在日常生活中的失信行为，包含恶意拖欠水电费信息、运营商欠费信息等情况。",
                        imgstyle: "    background: url('../../static/WenchowMark/shxyimg.png') no-repeat;\n" +
                            "    background-size: 100% 100%;",
                    },
                    {
                        style: "width: 86vw;height: 40vw;position: relative;left:7vw;background: url('../../static/WenchowMark/touchbg.png') no-repeat;background-size:100% 100%;",
                        kind: "sftzimg",
                        name: "sftz",
                        brief: "sftzbrief",
                        typename: "社会贡献",
                        des: "主要反映市民在社会交往中对城市发展和进步做出的贡献，包含志愿者服务、慈善捐赠、义务献血、科研奖励等行为。",
                        imgstyle: "    background: url('../../static/WenchowMark/shgximg.png') no-repeat;\n" +
                            "    background-size: 100% 100%;",
                    }
                ],
                sfmark: 1,
                zjmark: 1,
                shmark: 1,
                symark: 1,
                csmark: 1,
                swiperOptions: {
                    observer: true,
                    observeParents: true,
                    loop: true,
                    autoplay: {
                        disableOnInteraction: false,
                        delay: 5000
                    },
                    on:{
                        transitionEnd: function () {
                            self.$emit('div-nub', this.realIndex);
                            self.bannerIndex = this.realIndex + 1
                        },
                    },
                    pagination: {
                        el: '.swiper-pagination'
                    }
                }
            }
        },
        components: {
            swiper,
            swiperSlide
        },
        methods: {
            goPage(name) {
                this.$router.push({
                    name,
                });
            },

        },
        mounted() {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .sftzimg {
    width: 11%;
    height: 20%;
    left: 4%;
    top: 13%;
    position: absolute;
  }

  .sftz {
    position: absolute;
    height: 6vw;
    top: 15%;
    left: 16%;
    font-size: 4.2vw;
    line-height: 6vw;
    color: black;
    text-align: center;
  }

  .sftzbrief {
    position: absolute;
    left: 50%;
    -webkit-transform: translate(-50%);
    transform: translate(-50%);
    width: 90%;
    top: 34%;
    font-size: 4vw;
    color: #aaa;
    text-align: left;
    line-height: 6vw;
  }

  .swiperSlide {
    position: relative;
  }
  .swiper-pagination /deep/ .swiper-pagination-bullet-active {
    background: rgb(74, 185, 255);
  }

</style>
