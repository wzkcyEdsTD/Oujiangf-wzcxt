<template>
  <div class="gonggao">
    <div class="gonggao-title">试运行公告</div>
    <div class="gonggao-inner">
      <p style="font-size: 16px;">尊敬的广大市民朋友：
      </p>
      <p style="text-indent: 10px;font-size: 14px;margin: 10px;">
        温州城市个人诚信分--瓯江分已上线试运行。我们将逐步完善栏目功能，不断优化评价模型，努力拓展应用场景。真诚欢迎您开通并试用瓯江分，关注个人信用状况，助力建设信用温州！
      </p>
      <p style="font-size: 14px;text-align: right;">温州市信用信息中心</p>
      <p style="font-size: 14px;text-align: right;">2019年10月19日</p>
    </div>
  </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        methods: {},
        created() {
        }
    }
</script>
<style scoped>
  .gonggao {
    width: 100%;
    height: 100%;
    background: url('../../static/xyptIndex/gonggao_bg.png') left top repeat-y;
    background-size: 100% auto;
  }

  .gonggao-title {
    font-size: 20px;
    padding: 20px;
  }

  .gonggao-title::before {
    content: "";
    display: inline-block;
    width: 30px;
    height: 30px;
    background: url('../../static/xyptIndex/laba.png') center center no-repeat;
    background-size: 100% 100%;
    vertical-align: bottom;
    margin-right: 10px;
  }

  .gonggao-inner {
    padding: 0 40px;
    text-align: left;
  }
</style>
