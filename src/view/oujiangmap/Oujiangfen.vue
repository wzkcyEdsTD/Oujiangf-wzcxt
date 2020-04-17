<template>
	<div class="oujiangfen" @click="listenerHandler">
		<span class="boat"></span>
		<div class="fueryi" @click.stop="clickHandler(0)">
			<img src="../../../static/oujiangmap/fueryi.png" class="img">
		</div>
		<div class="zhongxi" @click.stop="clickHandler(1)">
			<img src="../../../static/oujiangmap/zhongxi.png" class="img">
		</div>
		<div class="shufang1" @click.stop="clickHandler(2)">
			<img src="../../../static/oujiangmap/shufang.png" class="img">
		</div>
		<div class="shufang2" @click.stop="clickHandler(3)">
			<img src="../../../static/oujiangmap/shufang.png" class="img">
		</div>
		<div class="tushuguan" @click.stop="clickHandler(4)">
			<img src="../../../static/oujiangmap/tushuguan.png" class="img">
		</div>
		<div class="xinyiyi" @click.stop="clickHandler(5)">
			<img src="../../../static/oujiangmap/xinyiyi.png" class="img">
		</div>
		<div class="park">
			<img src="../../../static/oujiangmap/park.png" class="img">
		</div>
		<div class="bottom-desc">
			<text-block title="简介" content="瓯江是温州的母亲河，奔流不息的瓯江水，哺育了温州2000多年的人杰地灵和瓯越文明。温州市民信用评价以“瓯江分”命名，寓意人之信用当如瓯江一样细水长流、源远流长。"></text-block>
		</div>
		<transition name="scale">
			<div class="content-block" v-show="blockFlag" v-if="blockContent[blockIndex]" :style="blockContent[blockIndex].style" @click.stop>
				<text-block :title="blockContent[blockIndex].title" :content="blockContent[blockIndex].content"></text-block>
			</div>
		</transition>
	</div>
</template>
<script>
import TextBlock from './TextBlock.vue';
export default {
	components: {
		TextBlock
	},
	data () {
		return {
			blockIndex: -1,
			blockContent: [
				{
					title: '借阅规则',
					content: '暂无',
					style: {
						left: '37%',
						top: '24%'
					}
				},
				{
					title: '借阅规则',
					content: '暂无',
					style: {
						left: '61%',
    					top: '26%'
					}
				},
				{
					title: '借阅规则',
					content: '普通免押读者证：普通书刊10册，光盘10盘，连续剧2套，借期30天，可续借2次 \n\n 信用借阅读者证： 普通书刊15册，光盘15盘，连续剧3套，借期30天，可续借3次',
					style: {
						left: '2%',
    					top: '44%'
					}
				},
				{
					title: '借阅规则',
					content: '普通免押读者证：普通书刊10册，光盘10盘，连续剧2套，借期30天，可续借2次 \n\n 信用借阅读者证： 普通书刊15册，光盘15盘，连续剧3套，借期30天，可续借3次',
					style: {
						left: '57%',
    					top: '46%'
					}
				},
				{
					title: '借阅规则',
					content: '普通免押读者证：普通书刊10册，光盘10盘，连续剧2套，借期30天，可续借2次 \n\n 信用借阅读者证： 普通书刊15册，光盘15盘，连续剧3套，借期30天，可续借3次',
					style: {
						left: '59%',
    					top: '38%'
					}
				},
				{
					title: '借阅规则',
					content: '暂无',
					style: {
						left: '8%',
    					top: '65%'
					}
				}
			],
			blockFlag: false
		}
	},
	methods: {
		listenerHandler () {
			if (this.blockFlag) this.blockFlag = false;
		},
		clickHandler (index) {
			this.blockFlag = true;
			this.blockIndex = index;
		}
	},
	created () {
	}
}
</script>
<style scoped>
	@keyframes boatFlow {
		0% {
			transform: translate(0, 0px) rotateY(0deg);
			right: 25%;
		}
		10% {
			transform: translate(0, -4px) rotateY(0deg);
			right: 33%;
		}
		20% {
			transform: translate(0, 0px) rotateY(0deg);
			right: 41%;
		}
		30% {
			transform: translate(0, 4px) rotateY(0deg);
			right: 49%;
		}
		40% {
			transform: translate(0, 0px) rotateY(0deg);
			right: 57%;
		}
		49% {
			transform: translate(0, -4px) rotateY(0deg);
			right: 65%;
		}
		50% {
			transform: translate(0, -4px) rotateY(180deg);
			right: 65%;
		}
		60% {
			transform: translate(0, 0px) rotateY(180deg);
			right: 57%;
		}
		70% {
			transform: translate(0, 4px) rotateY(180deg);
			right: 49%;
		}
		80% {
			transform: translate(0, 0px) rotateY(180deg);
			right: 41%;
		}
		90% {
			transform: translate(0, -4px) rotateY(180deg);
			right: 33%;
		}
		99% {
			transform: translate(0, 0px) rotateY(180deg);
			right: 25%;
		}
		100% {
			transform: translate(0, 0px) rotateY(0deg);
			right: 25%;
		}
	}
	.oujiangfen {
		height: 100%;
		width: 100%;
		background: url('../../../static/oujiangmap/oujiangfen.png') 0 0 no-repeat;
		background-size: 100% 100%;
		position: relative;
	}
	.boat {
		position: absolute;
		z-index: 5;
		width: 1.04rem;
		height: .53rem;
		background: url('../../../static/oujiangmap/boat.png') 0 0 no-repeat;
		background-size: 100% 100%;
    	top: 11%;
    	animation: boatFlow 15s linear infinite;
	}
	.bottom-desc {
		position: absolute;
		bottom: 1.21rem;
		left: .43rem;
		z-index: 10;
		width: 5rem;
		font-size: .23rem;
		line-height: .37rem;
	}
	.img {
		width: 100%;
		height: 100%;
	}
	.fueryi {
		position: absolute;
		z-index: 2;
		top: 23%;
		left: 9%;
		width: 2.5rem;
    	height: 1.23rem;
	}
	.fueryi::after {
		content: "";
		position: absolute;
		z-index: 2;
		top: -24px;
		left: 0;
		background: url('../../../static/oujiangmap/fueryi.gif') 0 0 no-repeat;
		background-size: 100% 100%;
		width: 1.57rem;
		height: .7rem;
	}
	.zhongxi {
		position: absolute;
		z-index: 2;
		top: 18%;
    	left: 38%;
	    width: 100px;
	    height: 53px;
	}
	.zhongxi::after {
		content: "";
		position: absolute;
		z-index: 2;
		top: -26px;
		left: 0;
		background: url('../../../static/oujiangmap/zhongxi.gif') 0 0 no-repeat;
		background-size: 100% 100%;
		width: 1.7rem;
		height: .7rem;
	}
	.shufang1 {
		position: absolute;
		z-index: 2;
		top: 37%;
    	left: 19%;
	    height: 1rem;
    	width: 1.4rem;
	}
	.shufang2 {
		position: absolute;
		z-index: 2;
		top: 46%;
    	left: 43%;
	    height: 1rem;
    	width: 1.4rem;
	}
	.shufang1::after, .shufang2::after {
		content: "";
		position: absolute;
		z-index: 2;
		top: -25px;
		left: -12px;
		background: url('../../../static/oujiangmap/shufang.gif') 0 0 no-repeat;
		background-size: 100% 100%;
		height: .7rem;
		width: 1.7rem;
	}
	.shufang2::after {
		background-image: url('../../../static/oujiangmap/shuwu.gif');
	}
	.tushuguan {
		position: absolute;
		z-index: 2;
		top: 30%;
    	left: 40%;
	    width: 100px;
	    height: 53px;
	}
	.tushuguan::after {
		content: "";
		position: absolute;
		z-index: 2;
		top: -23px;
		left: 0;
		width: 2.26rem;
		height: .7rem;
		background: url('../../../static/oujiangmap/tushuguan.gif') 0 0 no-repeat;
		background-size: 100% 100%;
	}
	.xinyiyi {
		position: absolute;
		z-index: 2;
		top: 66%;
    	left: 48%;
	    width: 130px;
	    height: 53px;
	}
	.xinyiyi::after {
		content: "";
		position: absolute;
		z-index: 2;
		top: -26px;
		left: 0;
		height: .7rem;
		background: url('../../../static/oujiangmap/xinyiyi.gif') 0 0 no-repeat;
		background-size: 100% 100%;
		width: 1.9rem;
	}
	.park {
		position: absolute;
		z-index: 2;
	    top: 32%;
    	left: 78%;
		width: 62px;
	}
	.content-block {
		position: absolute;
	    z-index: 10;
	    width: 3.74rem;
	    font-size: .23rem;
    	line-height: .37rem;
    	transition: left .5s ease, top .5s ease, bottom .5s ease;
	}
	.content-block /deep/ .text-block-title {
		background-color: #FF9000;
	}
	.content-block /deep/ .text-block {
		border-color: #FF9000;
	}

	.scale-enter-active {
		transition: opacity .5s ease;
	}
	.scale-leave-active {
		transition: all .5s ease-out;
	}
	.scale-leave-to {
		opacity: 0;
		transform: translateY(5%);
	}
	.scale-enter {
		opacity: 0;
	}
</style>
