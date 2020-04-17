<template>
	<div class="preview-img">
		<img :src="src">
	</div>
</template>
<script>
import projectApi from '@/assets/index';
export default {
	data () {
		return {
			src: ''
		}
	},	
	methods: {
		getImg () {
			var params = new URLSearchParams();
            params.append('signid', this.$route.query['src'] || '');
			projectApi.getShareImg(params).then((res) => {
				this.src = res['imgStr'];
			}).catch((err) => {
				console.log(err);
			})
		}
	},
	created () {
		this.getImg();
	}
}	
</script>
<style scoped>
	.preview-img {
		width: 100%;
		height: 100%;
		background-color: black;
	}
	.preview-img img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
</style>