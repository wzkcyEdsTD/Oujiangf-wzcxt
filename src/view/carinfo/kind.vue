<template>
  <div class="index">
    <div class="mes">
      <li class="text" @click="back('A1',licnum)">A1(大型客车)</li>
    </div>
    <div class="mes">
      <li class="text" @click="back('A2',licnum)">A2(牵引车)</li>
    </div>
    <div class="mes">
      <li class="text" @click="back('A3',licnum)">A3(城市公交车)</li>
    </div>
    <div class="mes">
      <li class="text" @click="back('B1',licnum)">B1(中型客车)</li>
    </div>
    <div class="mes">
      <li class="text" @click="back('B2',licnum)">B2(大型货车)</li>
    </div>
    <div class="mes">
      <li class="text" @click="back('C1',licnum)">C1(小型汽车)</li>
    </div>
    <div class="mes">
      <li class="text" @click="back('C2',licnum)">C2(小型自动挡汽车)</li>
    </div>
    <div class="mes">
      <li class="text" @click="back('C3',licnum)">C3(低速载货汽车)</li>
    </div>
    <div class="mes">
      <li class="text" @click="back('C4',licnum)">C4(三轮汽车)</li>
    </div>
    <div class="mes">
      <li class="text" @click="back('C5',licnum)">C5(残疾人专用小型自动挡载客汽车)</li>
    </div>
    <div class="mes">
      <li class="text" @click="back('D',licnum)">D(普通三轮摩托车)</li>
    </div>
    <div class="mes">
      <li class="text" @click="back('E',licnum)">E(普通二轮摩托车)</li>
    </div>
    <div class="mes">
      <li class="text" @click="back('F',licnum)">F(轻便二轮摩托车)</li>
    </div>
    <div class="mes">
      <li class="text" @click="back('M',licnum)">M(轮式自动机械车)</li>
    </div>
    <div class="mes">
      <li class="text" @click="back('N',licnum)">N(无轨电车)</li>
    </div>
    <div class="mes">
      <li class="text" @click="back('P',licnum)">P(有轨电车)</li>
    </div>
  </div>
</template>
<script>
    export default {
        name: "kind",
        data() {
            return {
                licnum: undefined,
            };
        },
        components: {},
        methods: {
            back(type, licnum) {
                this.$router.push({
                    name: "carinfo",
                    params: {type, licnum}
                });
            }
        },
        mounted() {
            const {licnum} = this.$route.params;
            this.licnum = licnum || undefined;
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
    font-size: 4vw;
    text-align: left;
    line-height: 15vw;
  }
</style>

