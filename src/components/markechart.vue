<template>
  <div class="mkcharts" id="myChart" :style="{width: '60vw', height: '50vw'}"></div>
</template>

<script>
    import projectApi from '../assets/index'
    // 引入基本模板
    let echarts = require('echarts/lib/echarts')
    // 引入雷达图组件
    require('echarts/lib/chart/radar')
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')
    require('echarts/lib/component/radar')
    export default {
        name: 'markecharts',
        data() {
            return {
                sfmark: 1,
                csmark: 1,
                shmark: 1,
                symark: 1,
                zjmark: 1,
            }
        },
        mounted() {
            //瓯江分
            const params = new URLSearchParams();
            params.append('idcard', window.localStorage.getItem('idcard'));
            params.append('username', window.localStorage.getItem('username'));
            params.append("appid","201907220859170241269488");
            params.append("key","NdcfkWTJyNEA");
            projectApi.getmark(params).then(rs1 => {
                if (rs1.code === 200 && rs1.message === "Success" && typeof (rs1.data) != "undefined") {
                    //身份特质
                    this.sfmark = rs1.data.identityScore * 0.5 + 5;
                    //社会贡献
                    this.csmark = rs1.data.contributionScore * 0.5 + 5;
                    //生活信用
                    this.shmark = rs1.data.lifeScore * 0.5 + 5;
                    //商业信用
                    this.symark = rs1.data.commercialScore * 0.5 + 5;
                    //遵纪守法
                    this.zjmark = rs1.data.complianceScore * 0.5 + 5;
                    this.drawRadar(this.sfmark,this.zjmark,this.symark,this.shmark,this.csmark);
                }
            })
        },
        methods: {
            drawRadar(a,b,c,d,e) {
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    tooltip: {
                        trigger: "axis"
                    },
                    radar: {
                        indicator: [
                            {
                                max: 10
                            },
                            {
                                max: 10
                            },
                            {
                                max: 10
                            },
                            {
                                max: 10
                            },
                            {
                                max: 10
                            }
                        ]
                    },
                    series: [{
                        show: false,
                        name: '个人信用分',
                        type: 'radar',
                        color: '#FFF',
                        itemStyle: {
                            opacity: 0
                        },
                        lineStyle: {
                            opacity: 0
                        },
                        // areaStyle: {normal: {}},
                        data: [
                            {
                                value: [a, e, d, c, b]
                            }
                        ]
                    }]
                });
                document.querySelector('.markbg').addEventListener('touchstart', function () {
                    myChart.setOption({
                        series: {
                            itemStyle: {
                                opacity: 1
                            },
                            lineStyle: {
                                opacity: 1
                            }
                        }
                    });
                });
                document.querySelector('.markbg').addEventListener('touchend', function () {
                    myChart.setOption({
                        series: {
                            itemStyle: {
                                opacity: 0
                            },
                            lineStyle: {
                                opacity: 0
                            }
                        }
                    });
                });
            }
        }
    }
</script>
<style scoped>
  #myChart {
    padding-top: 9vw;
    top: 3vw;
  }
</style>
