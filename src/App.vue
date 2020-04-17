<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
    export default {
        name: 'App',
    }
</script>

<style>
  body {
    margin: 0px;
    padding: 0px;
  }

  #app {
    font-family: Microsoft YaHei, 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 0px;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  #app::-webkit-scrollbar {
    display: none;
  }
</style>
