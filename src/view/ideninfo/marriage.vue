<template>
  <div class="index">
    <div class="mes">
      <li class="text" @click="back(job,0,'未婚',political,address)">未婚</li>
    </div>
    <div class="mes">
      <li class="text" @click="back(job,1,'已婚',political,address)">已婚</li>
    </div>
  </div>
</template>
<script>
    export default {
        name: "marriage",
        data() {
            return {
                job: undefined,
                marriage: undefined,
                marriagename: undefined,
                political: undefined,
                address: undefined,
            };
        },
        components: {},
        methods: {
            back(job, marriage, marriagename, political, address) {
                this.$router.replace({
                    name: "ideninfo",
                    params: {job, marriage, marriagename, political, address}
                });
            }
        },
        mounted() {
            const {job} = this.$route.params;
            this.job = job || undefined;
            const {marriage} = this.$route.params;
            this.marriage = marriage;
            const {marriagename} = this.$route.params;
            this.marriagename = marriagename || undefined;
            const {political} = this.$route.params;
            this.political = political || undefined;
            const {address} = this.$route.params;
            this.address = address || undefined;
        },
        // 处理返回逻辑
        beforeRouteLeave (to, from, next) {
          if (to.name === 'personinfo') {
            next({
              name: 'ideninfo',
              params: {
                job: this.job,
                marriage: this.marriage,
                marriagename: this.marriagename,
                political: this.political,
                address: this.address
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

