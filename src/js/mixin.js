export  const mixin = {
	data () {
		return {
			MixinInputs: []
		};
	},
	methods: {
		MixinInputsBlur (e) {
			e = e || window.event;
			if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
                e.target.scrollIntoView();
            }
		}
	},
	mounted () {
		this.MixinInputs = document.querySelectorAll('input');
		this.MixinInputs.length > 0 && this.MixinInputs.forEach((item) => {
			item.addEventListener('blur', this.MixinInputsBlur)
		});
	},
	beforeDestroy () {
		this.MixinInputs.length > 0 && this.MixinInputs.forEach((item) => {
			item.removeEventListener('blur', this.MixinInputsBlur);
		});
	}
};