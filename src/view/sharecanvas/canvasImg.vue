<template>
  <div class="canvas-img">
    <div class="canvas" ref="canvasHeight">
      <canvas id="mycanvas"></canvas>
      <canvas id="canvasBg"></canvas>
    </div>
    <div class="fenxiang">
      <div class="fenxiang-title">请选择你想分享的背景</div>
      <table>
        <tr v-for="(value, index) of topics" :key="index">
          <td v-for="(item, indx) of value" :key="indx" style="padding: 4px; width: 33%; box-sizing: border-box;">
            <div @click="changeTopic(item.src, index, indx)"
                 :class="['change-topic', currentImg === (index * 3 + indx) ? 'current-choose' : '']">
              <img :src="item.background" v-if="item.src !== 'file'">
              <span class="input-file" v-else>
								<input type="file" @change="upload($event)" accept="image/*"/>
							</span>
            </div>
          </td>
        </tr>
      </table>
      <span class="fenxiang-icon" @click="share($event)">晒分</span>
    </div>
    <div class="canvas-img-inner" v-show="showImg" @click="clearShowImg"></div>
  </div>
</template>
<script>
    const appid = window.allAppId;
    const logo = require('../../images/logo.png');
    const ercodeImg = require('../../images/ercode.jpg');
    const gift = require('../../images/gift.png');
    import {WXShare} from '@/js/wxShare.js';
    import projectApi from '@/assets/index';

    export default {
        data() {
            return {
                score: '',
                img: null,
                canvasImgSrc: null,
                currentImg: 0,
                topics: [
                    [
                        {
                            background: require('../../images/choose1.png'),
                            src: require('../../images/fenxiang1.png')
                        },
                        {
                            background: require('../../images/choose2.png'),
                            src: require('../../images/fenxiang2.png')
                        },
                        {
                            background: require('../../images/choose3.png'),
                            src: require('../../images/fenxiang3.png')
                        }
                    ],
                    [
                        {
                            background: require('../../images/choose4.png'),
                            src: require('../../images/fenxiang4.png')
                        },
                        {
                            background: require('../../images/choose5.png'),
                            src: require('../../images/fenxiang5.png')
                        },
                        {
                            src: 'file'
                        }
                    ]
                ],
                showImg: false,
                rank: ''
            }
        },
        methods: {
            clearShowImg() {
                this.showImg = false;
            },
            upload(e) {
                const fileInput = e.target,
                    file = fileInput.files[0],
                    reader = new FileReader(),
                    that = this;
                let orientation;
                //EXIF js 可以读取图片的元信息
                EXIF.getData(file, function () {
                    orientation = EXIF.getTag(this, 'Orientation');
                });
                reader.onload = function (event) {
                    that.getImgData(this.result, orientation, function (data) {
                        //data为正确的图片信息
                        that.img.src = data;
                        e.target.value = ''; // 消除input中value值
                    });
                };
                reader.readAsDataURL(file);
            },
            getImgData(img, dir, next) {
                var image = new Image();
                image.onload = function () {
                    var degree = 0, drawWidth, drawHeight, width, height;
                    drawWidth = this.naturalWidth;
                    drawHeight = this.naturalHeight;
                    //以下改变一下图片大小
                    var maxSide = Math.max(drawWidth, drawHeight);
                    if (maxSide > 1024) {
                        var minSide = Math.min(drawWidth, drawHeight);
                        minSide = minSide / maxSide * 1024;
                        maxSide = 1024;
                        if (drawWidth > drawHeight) {
                            drawWidth = maxSide;
                            drawHeight = minSide;
                        } else {
                            drawWidth = minSide;
                            drawHeight = maxSide;
                        }
                    }
                    var canvas = document.createElement('canvas');
                    canvas.width = width = drawWidth;
                    canvas.height = height = drawHeight;
                    var context = canvas.getContext('2d');
                    //判断图片方向，重置canvas大小，确定旋转角度，iphone默认的是home键在右方的横屏拍摄方式
                    switch (dir) {
                        //iphone横屏拍摄，此时home键在左侧
                        case 3:
                            degree = 180;
                            drawWidth = -width;
                            drawHeight = -height;
                            break;
                        //iphone竖屏拍摄，此时home键在下方(正常拿手机的方向)
                        case 6:
                            canvas.width = height;
                            canvas.height = width;
                            degree = 90;
                            drawWidth = width;
                            drawHeight = -height;
                            break;
                        //iphone竖屏拍摄，此时home键在上方
                        case 8:
                            canvas.width = height;
                            canvas.height = width;
                            degree = 270;
                            drawWidth = -width;
                            drawHeight = height;
                            break;
                    }
                    //使用canvas旋转校正
                    context.rotate(degree * Math.PI / 180);
                    context.drawImage(this, 0, 0, drawWidth, drawHeight);
                    //返回校正图片
                    next(canvas.toDataURL("image/png", .8));
                }
                image.src = img;
            },
            // 更换主题
            changeTopic(src, index, indx) {
                const ind = index * 3 + indx;
                if (this.currentImg === ind || src === 'file') return;
                this.currentImg = ind;
                this.img.src = src;
            },
            initCanvas() {
                const canvas = document.getElementById('mycanvas'),
                    canvasBg = document.getElementById('canvasBg'),
                    cxt = canvas.getContext('2d'), // 离屏的画布
                    height = this.$refs.canvasHeight.clientHeight * 0.97,
                    width = height / 1.78;
                canvas.style.width = width + "px";
                canvas.style.height = height + "px";
                canvasBg.style.width = width + "px";
                canvasBg.style.height = height + "px";
                const scale = window.devicePixelRatio;
                canvas.width = width * scale;
                canvas.height = height * scale;
                canvasBg.width = width * scale;
                canvasBg.height = height * scale;
                this.img = new Image();
                this.img.onload = (() => {
                    this.drawImage(canvasBg); // 先画底部背景图片
                });
                this.img.src = require('../../images/fenxiang1.png');
                this.drawFen(canvas, cxt, this.score); // 画分数
                this.drawRank(canvas, cxt, null);
                this.drawErcode(canvas, cxt);
                this.drawBottom(canvas, cxt); // 画底部的样式
            },
            drawFen(can, cxt, score) {
                cxt.save();
                const y1 = can.height * 0.19,
                    y2 = can.height * 0.26,
                    y3 = can.height * 0.4,
                    x = can.width / 2,
                    radius = can.width * 0.6 / 2;
                can.style.letterSpacing = '2px';
                const font1 = 0.035 * can.height;
                cxt.font = font1 + 'px SourceHanSansCN-Medium';
                cxt.fillStyle = '#fff';
                cxt.textAlign = 'center';
                cxt.fillText('我的瓯江分', x, y1);
                const font2 = 0.05 * can.height;
                cxt.font = font2 + 'px SourceHanSansCN-Medium';
                cxt.fillText(score, x, y2);
                // 画圆弧
                cxt.beginPath();
                cxt.lineCap = 'round';
                cxt.lineWidth = 0.016 * can.width;
                cxt.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                cxt.fillStyle = 'rgba(255, 255, 255, 0.3)';
                cxt.arc(x, y1 + (y2 - y1) / 2, radius, Math.PI / 10, 5 * Math.PI / 6, true);
                const w = 0.17 * can.width,
                    h = 0.042 * can.width;
                cxt.moveTo(x - Math.pow(3, 0.5) / 2 * radius, y1 + (y2 - y1) / 2 + radius / 2);
                cxt.arcTo(x - Math.pow(3, 0.5) / 2 * radius + w / 2, y1 + (y2 - y1) / 2 + radius / 2 - h, x - Math.pow(3, 0.5) / 2 * radius + w, y1 + (y2 - y1) / 2 + radius / 2, w * 0.6);
                cxt.arcTo(x - Math.pow(3, 0.5) / 2 * radius + w * 3 / 2, y1 + (y2 - y1) / 2 + radius / 2 + h, x - Math.pow(3, 0.5) / 2 * radius + w * 2, y1 + (y2 - y1) / 2 + radius / 2, w * 0.6);
                cxt.moveTo(x - Math.pow(3, 0.5) / 2 * radius, y1 + (y2 - y1) / 2 + radius / 2 + h);
                cxt.arcTo(x - Math.pow(3, 0.5) / 2 * radius + w / 2, y1 + (y2 - y1) / 2 + radius / 2, x - Math.pow(3, 0.5) / 2 * radius + w, y1 + (y2 - y1) / 2 + radius / 2 + h, w * 0.6);
                cxt.arcTo(x - Math.pow(3, 0.5) / 2 * radius + w * 3 / 2, y1 + (y2 - y1) / 2 + radius / 2 + 2 * h, x - Math.pow(3, 0.5) / 2 * radius + w * 2, y1 + (y2 - y1) / 2 + radius / 2 + h, w * 0.6);
                cxt.arcTo(x - Math.pow(3, 0.5) / 2 * radius + w * 5 / 2, y1 + (y2 - y1) / 2 + radius / 2, x - Math.pow(3, 0.5) / 2 * radius + w * 3, y1 + (y2 - y1) / 2 + radius / 2 + h, w * 0.6);
                cxt.stroke();
                cxt.beginPath();
                cxt.arc(x + Math.cos(25 * Math.PI / 180) * radius, y1 + (y2 - y1) / 2 + Math.sin(25 * Math.PI / 180) * radius, 0.016 * can.width / 2, 0, Math.PI * 2, true);
                cxt.fill();
                can.style.letterSpacing = '1px';
                cxt.restore();
            },
            drawImage(can) {
                const imgWidth = can.width,
                    imgHeight = imgWidth * 1.59,
                    cxt = can.getContext('2d');
                cxt.clearRect(0, 0, can.width, can.height);
                cxt.drawImage(this.img, 0, 0, imgWidth, imgHeight);
            },
            drawRank(can, cxt, rank, func) {
                const y3 = can.height * 0.4,
                    x = can.width / 2,
                    /*text = `恭喜您成为第${rank && rank >= 0 ? rank : 'XX'}名瓯江分用户`,*/
                    text = '',
                    lineWidth = can.width * (1.2 / text.length),
                    lineWidthX = can.width * (0.3 / text.length),
                    y4 = can.height * 0.45,
                    giftWidth = can.width * 0.04;
                cxt.save();
                const font3 = 0.028 * can.height;
                cxt.font = font3 + 'px SourceHanSansCN-Regular';
                cxt.fillStyle = '#fff';
                cxt.textAlign = 'center';
                cxt.fillText(text, x, y3 + font3 / 2 - window.devicePixelRatio);
                cxt.beginPath();
                cxt.strokeStyle = '#fff';
                cxt.moveTo(lineWidthX, y3);
                cxt.lineTo(lineWidthX + lineWidth, y3);
                cxt.moveTo(can.width - lineWidthX, y3);
                cxt.lineTo(can.width - lineWidthX - lineWidth, y3);
                cxt.stroke();
                cxt.closePath();
                const font4 = 0.025 * can.height;
                cxt.font = 'bold ' + font4 + 'px SourceHanSansCN-Regular';
                cxt.fillStyle = '#fff';
                cxt.textAlign = 'center';
                cxt.fillText('', x, y4 + font4 / 2 - window.devicePixelRatio);
                const img = new Image();
                img.onload = function () {
                    /*cxt.drawImage(img, can.width * 0.15, y4 - giftWidth / 2, giftWidth, giftWidth);
                    cxt.drawImage(img, can.width * 0.85 - giftWidth, y4 - giftWidth / 2, giftWidth, giftWidth);*/
                    func && func();
                }
                img.src = gift;
                cxt.restore();
            },
            drawErcode(can, cxt, func) {
                const y3 = can.height * 0.6,
                    x = can.width / 2,
                    lineWidth = can.width * 0.16,
                    lineWidthX = can.width * 0.24,
                    ercodeWidth = can.width * 0.31,
                    ercodeHeight = ercodeWidth,
                    ercodeX = can.width / 2 - ercodeWidth / 2,
                    ercodeY = can.height * 0.5;
                cxt.save();
                // const font3 = 0.028 * can.height;
                // cxt.font = font3 + 'px SourceHanSansCN-Regular';
                // cxt.fillStyle = '#fff';
                // cxt.textAlign = 'center';
                // cxt.fillText('扫一扫', x, y3 + font3 / 2 - window.devicePixelRatio);
                // cxt.beginPath();
                // cxt.strokeStyle = '#fff';
                // cxt.moveTo(lineWidthX, y3);
                // cxt.lineTo(lineWidthX + lineWidth, y3);
                // cxt.moveTo(can.width - lineWidthX, y3);
                // cxt.lineTo(can.width - lineWidthX - lineWidth, y3);
                // cxt.stroke();
                const img = new Image();
                img.onload = function () {
                    cxt.drawImage(img, ercodeX, ercodeY, ercodeWidth, ercodeHeight);
                    func && func();
                }
                img.src = ercodeImg;
                cxt.closePath();
                cxt.restore();
            },
            drawBottom(can, cxt, func) {
                cxt.save();
                const y = can.width * 1.59,
                    radius = 30,
                    logoWidth = can.width * 0.09;
                cxt.fillStyle = '#fff';
                cxt.fillRect(0, y, can.width, can.height - y);
                const img = new Image();
                img.onload = function () {
                    cxt.drawImage(img, can.width * 0.1 - logoWidth / 2, y + (can.height - y) / 2 - logoWidth / 2, logoWidth, logoWidth);
                    func && func();
                }
                img.src = logo;
                const font1 = can.height * 0.02;
                cxt.textAlign = 'left';
                cxt.font = font1 + 'px SourceHanSansCN-Regular';
                cxt.fillStyle = 'rgb(44, 44, 44)';
                cxt.fillText('打开微信公众号-信用温州-开始使用瓯江分', can.width * 0.18, (y + (can.height - y) / 2) + font1 / 2 - window.devicePixelRatio);
                cxt.restore();
            },
            canvasToImg(can, canBg, func) {
                const cxtBg = canBg.getContext('2d'),
                    finalCan = document.createElement('canvas');
                finalCan.style.width = canBg.style.width + "px";
                finalCan.style.height = canBg.style.height + "px";
                finalCan.width = canBg.width;
                finalCan.height = canBg.height;
                // this.drawImage(canBg);
                // cxtBg.drawImage(can, 0, 0);
                // this.mycanvasFlag = false;
                const finalCxt = finalCan.getContext('2d');
                finalCxt.drawImage(canBg, 0, 0)
                this.drawFen(finalCan, finalCxt, this.score); // 画分数
                this.drawRank(finalCan, finalCxt, this.rank, () => {
                    this.drawErcode(finalCan, finalCxt, () => {
                        this.drawBottom(finalCan, finalCxt, () => {
                            this.canvasImgSrc = finalCan.toDataURL('image/jpeg');
                            func && func();
                        }); // 画底部的样式
                    });
                });
                // this.drawErcode(finalCan, finalCxt);
                // this.drawBottom(finalCan, finalCxt); // 画底部的样式
                // this.canvasImgSrc = finalCan.toDataURL('image/jpeg');
                // this.canvasImgSrc = canBg.toDataURL('image/jpeg');
                // func && func();
            },
            wxShare(signId) {
                const vm = this;
                WXShare({
                    title: '瓯江分',
                    desc: '点击查看我的诚信分',
                    link: window.location.origin + `/#/previewImg?src=${signId}`,
                    imgUrl: window.origin + '/static/logo.png',
                    fail: function () {
                        vm.$indicator.close();
                        vm.$toast('图片生成失败,请重试');
                        console.log('失败');
                    },
                    success: function () {
                        vm.$indicator.close();
                        vm.showImg = true;
                        console.log('成功');
                    },
                    cancel: function () {
                        vm.$indicator.close();
                        console.log('取消');
                    }
                }, 3);
            },
            uploadImg(img) {
                var params = new URLSearchParams();
                params.append('imgstr', img);
                projectApi.insertShareImg(params).then((res) => {
                    this.wxShare(res['signId'])
                }).catch((err) => {
                    console.log(err);
                });
            },
            getRank(params) {
                projectApi.getrank(params).then(res => {
                    if (res['code'] === 200 && res['message'] === 'Success') {
                        this.rank = res['data']['authRanking']['ranking'];
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
            getScore(params, func) {
                projectApi.getmark(params).then((res) => {
                    if (res['code'] === 200 && res['message'] === 'Success') {
                        this.score = res['data']['score'];
                    }
                    func && func();
                }).catch((err) => {
                    console.log(err);
                    func && func();
                });
            },
            share(e) {
                const canvas = document.getElementById('mycanvas'),
                    canvasBg = document.getElementById('canvasBg');
                this.canvasToImg(canvas, canvasBg, () => {
                    this.$indicator.open({
                        spinnerType: "triple-bounce"
                    });
                    this.uploadImg(this.canvasImgSrc);
                }); // 将离屏canvas变成图片
            }
        },
        mounted() {
            const params = new URLSearchParams();
            params.append('idcard', window.localStorage.getItem('idcard'));
            params.append('username', window.localStorage.getItem('username'));
            params.append("appid", appid['oujiangfen']['appId']);
            params.append("key", appid['oujiangfen']['key']);
            this.getScore(params, () => {
                this.initCanvas();
            });
            this.getRank(params); // 获取排名
        },
        beforeDestroy() {
            this.$indicator.close();
        }
    }
</script>
<style scoped>
  .canvas-img {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #ddd;
    position: relative;
    z-index: 0;
  }

  .canvas-img-inner {
    position: absolute;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 10;
  }

  .canvas-img-inner::after {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    background: url('../../images/share_help.png') left top no-repeat;
    background-size: contain;
    z-index: 11;
  }

  .canvas-img-inner img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 11;
    width: 70%;
  }

  .canvas {
    flex: 1;
    display: flex;
    position: relative;
  }

  #mycanvas {
    background-color: transparent;
    z-index: 1;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  #canvasBg {
    position: absolute;
    z-index: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .fenxiang {
    background-color: #fff;
    padding: 0 .43rem;
  }

  .fenxiang-title {
    font-size: 0.37rem;
    font-weight: 500;
    padding: .25rem 0;
    color: rgba(112, 112, 112, 1);
    text-align: left;
  }

  .fenxiang-icon {
    display: block;
    width: 90%;
    height: 45px;
    line-height: 45px;
    font-size: 20px;
    border-radius: 100px;
    background: linear-gradient(152deg, rgba(80, 185, 252, 1) 0%, rgba(52, 148, 210, 1) 100%);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.16);
    color: #fff;
    margin: .45rem auto .55rem;
    text-align: center;
  }

  .change-topic {
    width: 100%;
    height: 1.6rem;
    position: relative;
    border-radius: 5px;
    overflow: hidden;
  }

  .current-choose::before {
    content: "";
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(61, 160, 224, .8);
    z-index: 5;
  }

  .current-choose::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 6;
    width: 28px;
    height: 28px;
    background: url('../../images/choose_right.png') center center no-repeat;
    background-size: 100% 100%;
  }

  .change-topic img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }

  .input-file {
    display: inline-block;
    width: 100%;
    height: 100%;
    background: url('../../images/photo.png') center center no-repeat;
    background-size: 100% 100%;
  }

  .input-file input {
    opacity: 0;
    width: 100%;
    height: 100%;
  }
</style>
