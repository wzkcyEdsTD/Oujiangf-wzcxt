<template>
  <div class="page_city">
    <div class="search">
      <span class="logo"></span>
      <div>
        <input v-model="value" placeholder="搜索框" v-on:input="this.inputOnChange">
      </div>
    </div>
    <ul>
      <li v-for="(item, index) in all_link_arr" :key="index">
        <div class="school__tip" :id="item.item">{{item.item}}</div>
        <ul>
          <li
            v-for="(_item,index) in item.arr"
            class="city_tip"
            :key="index"
            @click="back(cid,cityname,_item.sid,_item.name)"
          >{{ _item.name }}
          </li>
        </ul>
      </li>
    </ul>
    <div class="panel">
      <span v-for="(item, index) in all_link_to" :key="index" v-on:click="()=>{toTip(item)}">{{item}}</span>
    </div>
  </div>
</template>
<script>
    import {schools} from "./enum/shools.json";
    import pinyinUtil from "./pinyinUtil.js";
    export default {
        name: "eduinfo_school",
        data() {
            return {
                all_link_arr: [],
                all_link_to: [],
                filter_school: [],
                value: undefined,
                cid: undefined,
                cityname: undefined,
                sid: undefined,
                schoolname: undefined
            };
        },
        components: {},
        methods: {
            /**
             * @param e {Object} 输入
             */
            inputOnChange({data}) {
                console.log(data);
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
            back(cid, cityname, sid, schoolname) {
                this.$router.replace({
                    name: "eduinfo",
                    params: {cid, cityname, sid, schoolname}
                });
            },
            /**
             * 初始化筛选学校
             * @param cid {Int} 省份id
             * @param fn {Function} callback
             */
            schoolFilter(cid, fn) {
                const filter_school = [];
                schools.map(item => {
                    if (item.cid == cid) {
                        filter_school.push({
                            ...item,
                            t: pinyinUtil.getFirstLetter(item.name)[0]
                        });
                    }
                });
                this.filter_school = filter_school;
                fn && fn();
            },
            /**
             *  首字母联系
             */
            TipLinkProvince() {
                const {value} = this;
                let SCHOOL = [];
                [...this.filter_school].map(v => {
                    if (!value || (value && ~v.name.indexOf(value))) SCHOOL.push(v);
                });
                const tips = [
                    ...new Set(
                        SCHOOL.map(item => {
                            return item.t;
                        })
                    )
                ].sort();
                this.all_link_to = tips;
                this.all_link_arr = tips.map(item => {
                    const arr = [];
                    SCHOOL.map(_item => {
                        if (item === _item.t) {
                            arr.push(_item);
                        }
                    });
                    return {item, arr};
                });
                if (this.all_link_arr.length <= 0) this.$toast('该地区无院校')
            }
        },
        /**
         *
         */
        mounted() {
            const {cid} = this.$route.params;
            this.cid = cid || undefined;
            this.schoolFilter(cid, () => {
                this.TipLinkProvince();
            });
            const {cityname} = this.$route.params;
            this.cityname = cityname || undefined;
            const {sid} = this.$route.params;
            this.sid = sid || undefined;
            const {schoolname} = this.$route.params;
            this.schoolname = schoolname || undefined;
        },
        // 处理返回逻辑
        beforeRouteLeave (to, from, next) {
          if (to.name === 'personinfo') {
            next({
              name: 'eduinfo',
              params: {
                cid: this.cid,
                cityname: this.cityname,
                sid: this.sid,
                schoolname: this.schoolname
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

  li .school__tip {
    height: 24px;
    line-height: 24px;
    box-sizing: border-box;
    padding-left: 8px;
    background-color: #eee;
    color: black;
    font-size: 14px;
  }

  li .city_tip {
    height: 34px;
    line-height: 34px;
    box-sizing: border-box;
    padding-left: 16px;
    font-size: 14px;
    border-bottom: 1px #eee solid;
    cursor: pointer;
  }

  li > .city_tip:last-child {
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

