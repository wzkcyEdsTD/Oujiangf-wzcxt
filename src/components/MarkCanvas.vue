<template>
  <div>
    <canvas ref="canvas" v-if="score" id="canvas" width="600" height="400" ></canvas>
  </div>
</template>
<script>
    let canvasFlag = null;
    export default {
        props: ['score'],
        watch: {
            score (val) {
                if (val) {
                    this.$nextTick(() => {
                        this.canvasScore('canvas', val);
                    });
                }
            }
        },
        data() {
            return {}
        },
        mounted () {
            canvasFlag = null;
            this.score && this.$nextTick(() => {
                this.canvasScore('canvas', this.score);
            });
        },
        methods: {
            canvasScore(id, getScore) {
                new init(this.$refs.canvas, {
                    teamNum: 20,  // round是40
                    radius: 8 / 2,
                    fullMarks: 1000,
                    grade: getScore,
                    color: '#44AAC9',
                    fillColor: '#ffffff',
                    type: 'circle',
                    //以下属性是type为round时使用的
                    round_radius: 1,
                    round_width: 7,
                    round_height: 4
                })

            }
        },
        beforeDestroy () {
            canvasFlag && window.cancelAnimationFrame(canvasFlag);
        }

    }

    function init(canvas, options) {
        if (!options) {
            options = {};
        }
        this.needNum = 0;
        this.time = 0; //动画的间隔
        this.maxTime = 1; //控制动画的最大值
        var cxt = canvas.getContext('2d');
        var clientWidth = document.documentElement.clientWidth;//根据设计图中的canvas画布的占比进行设置
        options.width = 290;//canvas的宽
        options.height = 210;//canvas的高
        if (options.type === 'round') {
            options.width = 300;//canvas的宽
            options.height = 160;//canvas的高
            // canvas.style.marginTop = '-2vw';
            this.needPoint = [];
        }
        var canvasWidth = Math.floor(clientWidth * options.width / (options.designChartWidth ? options.designChartWidth : 750));
        var canvasHeight = Math.floor(clientWidth * options.height / (options.designChartWidth ? options.designChartWidth : 750));
        canvas.setAttribute('width', canvasWidth * this.getDevicePixelRatio());
        canvas.setAttribute('height', canvasHeight * this.getDevicePixelRatio());
        if (options.type === 'circle') {
            canvas.style.width = canvasWidth * 1.1 + 'px';
            canvas.style.height = canvasHeight * 1.1 + 'px';
            options.radius = options.radius || 50 / 10;//小圆的直径
            options.radius = options.radius * this.getDevicePixelRatio()
            options.team_num = options.teamNum || 10;//小圆的个数
            options.circle_r = canvas.getAttribute('width') / 2 - options.radius; // 半径
            options.circle_x = 0 + options.circle_r + options.radius; // 圆心坐标x
            options.circle_y = 0 + options.circle_r + options.radius;//圆心坐标y
            this.loadTeams(cxt, options);
        } else if (options.type === 'round') {
            options.round_radius = options.round_radius || 3;//圆角矩形的圆角尺寸
            options.round_radius = options.round_radius * this.getDevicePixelRatio();
            options.team_num = options.teamNum || 10;//圆角矩形的个数
            options.round_width = options.round_width; // 圆角矩形的宽度
            options.round_height = options.round_height; // 圆角矩形的宽度
            var width = canvas.getAttribute('width') / 2;
            var height = canvas.getAttribute('height') / 2;
            options.circle_r = (width > height ? height - options.round_width : width - options.round_width);
            options.canvasWidth = width * 2;
            options.canvasHeight = height * 2;
            options.round_point = []; // 显示的圆角矩阵有几个
            this.loadRound(cxt, options);
        }
    }

    init.prototype = {
        loadTeams(cxt, options) {//加载布局模拟图
            this.font(cxt, options);
            this.seating(cxt, options);
            this.seatingPoint(cxt, options, 0);
        },
        loadRound (cxt, options) {
            this.font(cxt, options);
            this.drawRoundedRect(cxt, options);
            this.drawRoundedRectAnimate(cxt, options, 0);
        },
        font(cxt, options) {//加载图中文案
            if (options.function) {
                options.function(cxt, options);
            }
        },
        seating(cxt, options) { //分配小圆座次
            var angle = 230 / options.teamNum; //角度
            var a = options.fullMarks / options.teamNum;//计算每个小圆代表的值
            var team_x = 0, team_y = 0;
            var team_r = options.radius; // options.team_num < 20 ? 10 : Math.sqrt(options.circle_r * options.circle_r * 2 * (1 - Math.cos(changeRadian(angle)))) / 2;
            //余弦定理  计算小圆的最大半径     BC2=AB2＋AC2－2×AB×AC×cosα  如果小圆数目小于20个，半径最大30（上限）
            for (var i = 0; i < options.teamNum; i++) {
                team_x = options.circle_x + Math.sin(this.changeRadian((i * angle) + 250.9)) * options.circle_r;  //角度转弧度
                team_y = options.circle_y - Math.cos(this.changeRadian((i * angle) + 250.9)) * options.circle_r;
                cxt.beginPath();
                if ((i + 1) * a <= options.grade) this.needNum++;
                cxt.arc(team_x, team_y, team_r, 0, 2 * Math.PI);
                cxt.fillStyle = options.color ? "rgba(255,255,255,0.2)" : '#333333';
                cxt.fill();
            }
        },
        // canvas动画
        seatingPoint (cxt, options, num) {
            var angle = 230 / options.teamNum; //角度
            var a = options.fullMarks / options.teamNum;//计算每个小圆代表的值
            var team_x = 0, team_y = 0;
            var team_r = options.radius; // options.team_num < 20 ? 10 : Math.sqrt(options.circle_r * options.circle_r * 2 * (1 - Math.cos(changeRadian(angle)))) / 2;
            //余弦定理  计算小圆的最大半径     BC2=AB2＋AC2－2×AB×AC×cosα  如果小圆数目小于20个，半径最大30（上限）
            var i = num;
            var maxTime = this.maxTime;
            if (this.time >= maxTime) {
                this.maxTime = (maxTime >= 3 ? maxTime : maxTime + 1);
                this.time = 0;
                if (i > this.needNum - 1) return; // 大于了当前
                team_x = options.circle_x + Math.sin(this.changeRadian((i * angle) + 250.9)) * options.circle_r;  //角度转弧度
                team_y = options.circle_y - Math.cos(this.changeRadian((i * angle) + 250.9)) * options.circle_r;
                cxt.beginPath();
                cxt.arc(team_x, team_y, team_r, 0, 2 * Math.PI);
                switch ((i + 1) * a) {
                    case 600:
                        cxt.fillStyle = 'red';
                        break;
                    case 700:
                        cxt.fillStyle = 'orange';
                        break;
                    case 750:
                        cxt.fillStyle = 'yellow';
                        break;
                    case 800:
                        cxt.fillStyle = 'green';
                        break;
                    case 1000:
                        cxt.fillStyle = 'blue';
                        break;
                    default:
                        cxt.fillStyle = options.fillColor ? options.fillColor : 'red';
                }
                cxt.fillStyle = options.fillColor ? options.fillColor : 'red';
                cxt.fill();
                i++;
            } else {
                this.time++;
            }
            canvasFlag = window.requestAnimationFrame(() => {
                this.seatingPoint(cxt, options, i);
            });
        },
        changeRadian(angle) { //角度转换为弧度
            return Math.PI / 180 * angle;
        },
        // 画圆角矩形
        roundedRect (ctx, x, y, width, height, radius) {
            y = y - height / 2;
            ctx.beginPath();
            ctx.moveTo(x, y + radius);
            ctx.lineTo(x, y + height - radius);
            ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
            ctx.lineTo(x + width - radius, y + height);
            ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
            ctx.lineTo(x + width, y + radius);
            ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
            ctx.lineTo(x + radius, y);
            ctx.quadraticCurveTo(x, y, x, y + radius);
            ctx.fill();
        },
        // 画出圆角矩形背景
        drawRoundedRect (ctx, options) {
            const angle = Math.PI * 2 / options.team_num;
            ctx.fillStyle = "rgba(255,255,255,0.2)";
            ctx.save();
            ctx.translate(options.canvasWidth / 2, options.canvasHeight / 2);
            for (var i = 0; i < options.team_num; i++) {
                ctx.rotate(angle);
                if (angle * (i + 1) >= (Math.PI / 12) && angle * (i + 1) <= (23 * Math.PI / 24)) continue;
                options.round_point.push(i);
                this.roundedRect(ctx, options.circle_r, 0, options.round_width, options.round_height, options.round_radius);
            }
            ctx.restore();
            this.sortArray(options.round_point);
            this.needPoint = Math.floor(options.grade * options.round_point.length / options.fullMarks);
        },
        // 画出显示的圆角矩阵动画
        drawRoundedRectAnimate (ctx, options, num) {
            const angle = Math.PI * 2 / options.team_num;
            let i = num;
            let maxTime = this.maxTime;
            if (this.time >= maxTime) {
                this.maxTime = (maxTime >= 3 ? maxTime : maxTime + 1);
                this.time = 0;
                if (i >= this.needPoint) return;
                ctx.save();
                ctx.fillStyle = "#fff";
                ctx.translate(options.canvasWidth / 2, options.canvasHeight / 2);
                ctx.rotate(angle * options.round_point[i]);
                this.roundedRect(ctx, options.circle_r, 0, options.round_width, options.round_height, options.round_radius);
                ctx.restore();
                i++;
            } else {
                this.time++;
            }
            canvasFlag = window.requestAnimationFrame(() => {
                this.drawRoundedRectAnimate(ctx, options, i);
            });
        },
        // 排序数组
        sortArray (arr) {
            let index = -1;
            for (let i = 0; i < arr.length - 1; i++) {
                if (arr[i] + 1 !== arr[i+1]) { 
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                let spliceArr = arr.splice(0, index + 1);
                Array.prototype.push.apply(arr, spliceArr);
            }
            return arr;
        },
        getDevicePixelRatio() {//避免手机端失帧
            return window.devicePixelRatio || 1;
        }
    }
</script>

<style scoped>

</style>
