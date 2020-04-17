// 首页子路由
const homeParentChildren = [
	/**
     * 首页
     */
	{
		path: '',
		name: 'xyptIndex',
		component: resolve => require(['@/view/xyptIndex.vue'], resolve),
		meta: {
			title: '首页瓯江分'
		}
	},
	/**
     * 我的瓯江分
     */
	{
		path: 'WenchowMark',
		name: 'WenchowMark',
		component: resolve => require(['@/view/WenchowMark1.vue'], resolve),
		meta: {
			title: '我的瓯江分'
		}
	}
];
export default homeParentChildren;
