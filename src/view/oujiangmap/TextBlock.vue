<script>
export default {
	props: {
		title: {
			type: String,
			default: ''
		},
		content: {
			type: String,
			default: ''
		}
	},
	data () {
		return {}	
	},
	methods: {

	},
	render: function (h) {
		const vm = this;
		return h('div', {
			staticClass: 'text-block' 
		}, [
			h('div', {
				staticClass: 'text-block-title'
			}, vm.title),
			h('div', {
				staticClass: 'text-block-content'
			}, vm.content)
		]);
	},
	created () {

	} 
}
</script>
<style scoped>
	.text-block {
		height: 100%;
		width: 100%;
		position: relative;
		padding: .5rem .45rem .3rem;
		box-sizing: border-box;
		border: 2px solid #59493F; 
		background-color: #fff;
	}
	.text-block-title {
		position: absolute;
		top: 0;
		left: 5%;
		background-color: #59493F;
		border-radius: 20px;
		text-align: center;
		min-width: 1.68rem;
		font-size: .3rem;
		font-weight: bold;
		line-height: .56rem;
		color: #fff;
		z-index: 5;
		transform: translate(0, -50%);
	}
	.text-block-content {
		width: 100%;
		height: 100%;
	}
</style>