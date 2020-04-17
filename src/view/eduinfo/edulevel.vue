<template>
  <div class="index">
    <div class="mes">
      <li class="text" @click="back(cityname,schoolname,status,statusname,0,'中专')">中专</li>
    </div>
    <div class="mes">
      <li class="text" @click="back(cityname,schoolname,status,statusname,1,'大专')">大专</li>
    </div>
    <div class="mes">
      <li class="text" @click="back(cityname,schoolname,status,statusname,2,'本科')">本科</li>
    </div>
    <div class="mes">
      <li class="text" @click="back(cityname,schoolname,status,statusname,3,'硕士')">硕士</li>
    </div>
    <div class="mes">
      <li class="text" @click="back(cityname,schoolname,status,statusname,4,'博士')">博士</li>
    </div>
  </div>
</template>
<script>
    export default {
        name: "edulevel",
        data() {
            return {
                cityname: undefined,
                schoolname: undefined,
                status: undefined,
                statusname: undefined,
                levelstatus: undefined,
                edulevel: undefined,
                date: undefined
            };
        },
        components: {},
        methods: {
            back(cityname, schoolname, status, statusname, levelstatus, edulevel) {
                this.$router.replace({
                    name: "eduinfo",
                    params: {cityname, schoolname, status, statusname, levelstatus, edulevel}
                });
            }
        },
        mounted() {
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
        },
        // 处理返回逻辑
        beforeRouteLeave (to, from, next) {
          if (to.name === 'personinfo') {
            next({
              name: 'eduinfo',
              params: {
                cityname: this.cityname,
                schoolname: this.schoolname,
                status: this.status,
                statusname: this.statusname,
                levelstatus: this.levelstatus,
                edulevel: this.edulevel,
                date: this.date
              }
            });
          } else {
            next();
          }
        }
    };
</script>
<style scoped>
  .index {
    width: 100%;
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .mes {
    text-decoration: none;
    cursor: pointer;
    display: block;
    height: 15vw;
    box-sizing: border-box;
    padding-left: 5vw;
    /*    padding-right: 10vw;*/
    border-bottom: 1px solid rgba(128, 128, 128, 0.2);
  }

  .text {
    color: #aaa;
    height: 15vw;
    width: 80vw;
    display: inline-block;
    font-size: 16px;
    text-align: left;
    line-height: 15vw;
  }
</style>

