<template>
  <div class="page_city">
    <div class="search">
      <span class="logo"></span>
      <div>
        <input v-model="value" placeholder="搜索框" v-on:input="this.inputOnChange">
      </div>
    </div>
    <ul>
      <li v-for="(item, index) in all_link_arr" :key="item.item">
        <div class="city_tip" :id="item.item">{{item.item}}</div>
        <ul>
          <li
            v-for="(_item,index) in item.arr"
            class="city_li"
            :key="_item.cid"
            @click="back(_item.cid,_item.name)"
          >{{ _item.name }}
          </li>
        </ul>
      </li>
    </ul>
    <div class="panel">
      <span v-for="item in all_link_to" :key="item" v-on:click="()=>{toTip(item)}">{{item}}</span>
    </div>
  </div>
</template>
<script>
    import {cities} from "./enum/cities.json";
    import pinyinUtil from "./pinyinUtil.js";

    let CITY;
    export default {
        name: "eduinfo_city",
        data() {
            return {
                all_link_arr: [],
                all_link_to: [],
                value: undefined,
                cid: undefined,
                cityname: undefined
            };
        },
        components: {},
        methods: {
            /**
             * @param e {Object} 输入
             */
            inputOnChange({data}) {
                this.TipLinkProvince();
            },
            /**
             * 跳转到指定字母
             */
            toTip(item) {
                document.querySelector(`#${item}`).scrollIntoView(true);
            },
            /**
             * 选中省份返回
             */
            back(cid, cityname) {
                this.$router.replace({
                    name: "eduinfo",
                    params: {cid, cityname}
                });
            },
            /**
             *  首字母联系
             */
            TipLinkProvince() {
                const {value} = this;
                const _CITY = [];
                CITY.map(v => {
                    if (!value || (value && ~v.name.indexOf(value))) _CITY.push(v);
                });
                const tips = [
                    ...new Set(
                        _CITY.map(item => {
                            return item.t;
                        })
                    )
                ].sort();
                this.all_link_to = tips;
                this.all_link_arr = tips.map(item => {
                    const arr = [];
                    _CITY.map(_item => {
                        if (item === _item.t) {
                            arr.push(_item);
                        }
                    });
                    return {item, arr};
                });
            },
            addFirstLetter(fn) {
                CITY = cities.map(v => {
                    var first = pinyinUtil.getFirstLetter(v.name)[0];
                    if (v.name === '重庆市' || v.name.indexOf('长') === 0) {
                      first = 'C';
                    }
                    return {...v, t: first};
                });
                fn && fn();
            }
        },
        mounted() {
            this.addFirstLetter(() => {
                this.TipLinkProvince();
            });
            const {cid} = this.$route.params;
            this.cid = cid || undefined;
            const {cityname} = this.$route.params;
            this.cityname = cityname || undefined;
        },
        // 处理返回逻辑
        beforeRouteLeave (to, from, next) {
          if (to.name === 'personinfo') {
            next({
              name: 'eduinfo',
              params: {
                cid: this.cid,
                cityname: this.cityname
              }
            });
          } else {
            next();
          }
        }
    };
</script>
<style scoped>
  * {
    padding: 0px;
    margin: 0px;
  }

  .page_city {
    width: 100%;
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .logo {
    background: url('../../../static/eduinfo/search.png') center center no-repeat;
    background-size: 50% 50%;
  }

  .search {
    box-sizing: border-box;
    padding: 4px 8px;
    display: flex;
    height: 40px;
    flex-direction: row;
    background-color: #eee;
  }

  .search > * {
    display: block;
  }

  .search > div {
    flex: 1;
    line-height: 32px;
    box-sizing: border-box;
    padding: 0px 10px 0 0;
    background-color: #fff;
    border-radius: 0 6px 6px 0;
  }

  .search > span {
    width: 40px;
    background-color: #fff;
    line-height: 32px;
    border-radius: 6px 0 0 6px;
  }

  .search input {
    box-sizing: border-box;
    display: inline-block;
    width: 100%;
    height: 30px;
    border: 0px;
    line-height: 30px;
    border-radius: 4px;
  }

  ul {
    list-style-type: none;
    text-align: left;
  }

  ::-webkit-scrollbar {
    width: 0;
    height: 1px;
  }

  li {
    list-style-type: none;
  }

  li .city_tip {
    height: 24px;
    line-height: 24px;
    box-sizing: border-box;
    background: #eee;
    padding-left: 8px;
    color: black;
    font-size: 14px;
  }

  li .city_li {
    height: 34px;
    line-height: 34px;
    box-sizing: border-box;
    padding-left: 16px;
    font-size: 14px;
    border-bottom: 1px #eee solid;
    cursor: pointer;
  }

  li > .city_li:last-child {
    border-bottom: 0px;
  }

  .panel {
    position: fixed;
    width: 10px;
    height: auto;
    right: 8px;
    top: 50%;
    transform: translate(0, -50%);
  }

  .panel span {
    display: block;
    height: 20px;
    line-height: 20px;
    text-align: center;
    text-decoration: none;
    color: rgb(27, 27, 27);
    cursor: pointer;
  }
</style>

