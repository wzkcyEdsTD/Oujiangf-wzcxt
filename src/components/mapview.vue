<template>
  <div>
    <div id="viewDiv"></div>
    <div id="newmap"></div>
  </div>
</template>

<script>
  import esriLoader from 'esri-loader'
  export default {
    mounted(){
      const options = {
        // 可以使用自定义资源加载,arcgis 官网加载太慢了,经常加载失败.后面会讲到自己本地如何配置资源
        url: 'http://localhost:8099/arcgis_js_v411_api/arcgis_js_api/library/4.11/init.js'
      };
      esriLoader.loadModules ([
        'esri/Map',
        'esri/views/MapView',
      ], options)
        .then (([
                  Map,
                  MapView
                ]) => {
          const map = new Map ({
            basemap: "streets"
          })
          const mapview = new MapView ({
            container: "viewDiv",
            map: map,
            zoom: 12,
            center: [ 102.7346125, 25.0563901 ]
          })
        }, reason => {
          console.log (reason);
        })
    }
  };
</script>
<style>
  #viewDiv {
    margin: 20px auto;
    border: 1px solid #000;
    width: 500px;
    height: 400px;
    background: red;
  }
</style>
