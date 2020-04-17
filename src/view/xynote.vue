<template>
  <div>
    <div class="title">
      <div class="num">56</div>
      <div class="kind">次</div>
      <div class="sm">本月使用瓯江分</div>
      <div class="setting"></div>
    </div>
    <div class="user"></div>
  </div>
</template>

<script src="https://wow.techbrood.com/libs/jquery/jquery-1.11.1.min.js"></script>
<script>
    export default {
        name: "xynote",
        data() {
            return {}
        },
        components: {},
        methods: {},
        mounted() {

        }
    }
</script>
<style scoped>
  .title {
    width: 100vw;
    height: 50vw;
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translate(-50%);
    background: url("../../static/eduinfo/edubg.png") no-repeat;
    background-size: 100% 100%;
  }

  .num {
    width: 16vw;
    height: 8vw;
    position: absolute;
    top: 6vw;
    left: 6vw;
    line-height: 8vw;
    font-size: 8vw;
    color: #FFF;
    text-align: center;
  }

  .kind {
    width: 4vw;
    height: 6vw;
    position: absolute;
    top: 8vw;
    left: 22vw;
    line-height: 6vw;
    font-size: 4vw;
    color: #FFF;
    text-align: center;
  }

  .sm {
    width: 22vw;
    height: 5vw;
    position: absolute;
    top: 15vw;
    left: 5vw;
    line-height: 5vw;
    font-size: 3vw;
    color: #FFF;
    text-align: center;
  }

  .setting {
    height: 8vw;
    width: 8vw;
    position: absolute;
    top: 6vw;
    right: 6vw;
    background: url('../../static/xynote/ques.png') no-repeat;
    background-size: 100% 100%;
  }

  .user {
    width: 90vw;
    height: 130vw;
    position: absolute;
    top: 40vw;
    left: 50%;
    transform: translate(-50%);
    background: url('../../static/xynote/xybg.png') no-repeat;
    background-size: 100% 100%;
  }
</style>

