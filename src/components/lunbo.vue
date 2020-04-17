<template>
  <div class="lunbo">
    <swiper :options="swiperOptions" ref="mySwiper" class="lunbo-swiper">
      <swiper-slide v-for="(item, index) in LunBoList" :key="index">
        <div class="lunbo-block">
          <img :src="item.src" class="lunbo-block-img" @click="imgClick(item)">
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    export default {
        name: 'lunbo',
        props: {
            LunBoList: {
                type: Array,
                default: function () {
                    return [];
                }
            }
        },
        components: {
            swiper,
            swiperSlide
        },
        data () {
            return {
              swiperOptions: {
                observer: true,
                observeParents: true,
                loop: true,
                autoplay: {
                  disableOnInteraction: false,
                  delay: 5000
                },
                pagination: {
                  el: '.swiper-pagination'
                }
              }
            };
        },
        methods: {
            imgClick(item) {
                this.$emit('img-click', item);
            }
        },
        created() {

        }
    }
</script>
<style scoped>
  .lunbo {
    height: 100%;
    width: 84vw;
    position: relative;
    left: 5vw;
  }
  .lunbo-swiper {
    width: 100%;
    height: 100%;
  }
  .lunbo-block {
    width: 100%;
    height: 100%;
  }

  .lunbo-block-img {
    width: 100%;
    height: 100%;
  }

  .lunbo /deep/ .swiper-pagination-bullet {
    width: 6px;
    height: 3px;
    margin: 1px 2px;
    border-radius: 2px;
  }

  .lunbo /deep/ .swiper-pagination-bullet-active {
    width: 10px;
    background-color: #fff;
  }
</style>
