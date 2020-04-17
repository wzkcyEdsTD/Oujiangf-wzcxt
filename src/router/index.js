import Vue from 'vue'
import Router from 'vue-router'

import empindexChildren from './empindexChildren.js';
import homeParent from './homeParent.js';

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => require(['@/view/home.vue'], resolve),
      children: homeParent
    },
    /**
     * 登录
     */
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/view/login'], resolve)
    },
    /**
     * 信用停车说明
     */
    {
      path: '/parkexplain',
      name: 'parkexplain',
      component: resolve => require(['@/view/parkexplain'], resolve)
    },
    /**
     * 信用旅游说明
     */
    {
      path: '/tripexplain',
      name: 'tripexplain',
      component: resolve => require(['@/view/tripexplain'], resolve)
    },
    /**
     * 信用借阅说明
     */
    {
      path: '/bookexplain',
      name: 'bookexplain',
      component: resolve => require(['@/view/bookexplain'], resolve)
    },
    /**
     * 个人信息中心
     */
    {
      path: '/personinfo',
      name: 'personinfo',
      component: resolve => require(['@/view/personinfo'], resolve)
    },
    /**
     * 学历信息
     */
    {
      path: '/eduinfo',
      name: 'eduinfo',
      component: resolve => require(['@/view/eduinfo'], resolve)
    },
    /**
     * 学历信息-城市
     */
    {
      path: '/eduinfo_city',
      name: 'eduinfo_city',
      component: resolve => require(['@/view/eduinfo/page_city'], resolve)
    },
    /**
     * 学历信息-学校
     */
    {
      path: '/eduinfo_school',
      name: 'eduinfo_school',
      component: resolve => require(['@/view/eduinfo/page_school'], resolve)
    },
    /**
     * 图书借阅授权
     */
    {
      path: '/empindex',
      name: 'empindex',
      component: resolve => require(['@/view/empindex'], resolve),
      children: empindexChildren
    },
    /**
     * 学历信息-状态
     */
    {
      path: '/edustatus',
      name: 'edustatus',
      component: resolve => require(['@/view/eduinfo/edustatus'], resolve)
    },
    /**
     * 学历信息-学历
     */
    {
      path: '/edulevel',
      name: 'edulevel',
      component: resolve => require(['@/view/eduinfo/edulevel'], resolve)
    },
    /**
     * 身份信息
     */
    {
      path: '/ideninfo',
      name: 'ideninfo',
      component: resolve => require(['@/view/ideninfo'], resolve)
    },
    /**
     * 身份信息-职业
     */
    {
      path: '/job',
      name: 'job',
      component: resolve => require(['@/view/ideninfo/job'], resolve)
    },
    /**
     * 身份信息-婚姻
     */
    {
      path: '/marriage',
      name: 'marriage',
      component: resolve => require(['@/view/ideninfo/marriage'], resolve)
    },
    /**
     * 车辆信息
     */
    {
      path: '/carinfo',
      name: 'carinfo',
      component: resolve => require(['@/view/carinfo'], resolve)
    },
    /**
     * 车辆信息-车辆类型
     */
    {
      path: '/kind',
      name: 'kind',
      component: resolve => require(['@/view/carinfo/kind'], resolve)
    },
    /**
     * 信用记录
     */
    {
      path: '/xynote',
      name: 'xynote',
      component: resolve => require(['@/view/xynote'], resolve)
    },
    /**
     * 信用管理
     */
    {
      path: '/empmanager',
      name: 'empmanager',
      component: resolve => require(['@/view/empmanager'], resolve)
    },
    /**
     * 信用管理-信用借阅
     */
    {
      path: '/jyemp',
      name: 'jyemp',
      component: resolve => require(['@/view/empmanager/jyemp'], resolve)
    },
    /**
     * 信用管理-信用停车
     */
    {
      path: '/tcemp',
      name: 'tcemp',
      component: resolve => require(['@/view/empmanager/tcemp'], resolve)
    },
    /**
     * 信用管理-信用旅游
     */
    {
      path: '/lyemp',
      name: 'lyemp',
      component: resolve => require(['@/view/empmanager/lyemp'], resolve)
    },
    /**
     * 信用管理-信用健身
     */
    {
      path: '/jsemp',
      name: 'jsemp',
      component: resolve => require(['@/view/empmanager/jsemp'], resolve)
    },
    /**
     * 信用管理-信用金融
     */
    {
      path: '/jremp',
      name: 'jremp',
      component: resolve => require(['@/view/empmanager/jremp'], resolve)
    },
    /**
     * 瓯江分地图
     */
    {
      path: '/oujiangmap',
      name: 'oujiangmap',
      component: resolve => require(['@/view/oujiangmap/Oujiangfen.vue'], resolve)
    },
    /**
     * 分享瓯江分
     */
    {
      path: '/shareojf',
      name: 'shareojf',
      component: resolve => require(['@/view/sharecanvas/canvasImg.vue'], resolve)
    },
    /**
     * 分数预览页面
     */
    {
      path: '/previewImg',
      name: 'previewImg',
      component: resolve => require(['@/view/sharecanvas/previewImg.vue'], resolve)
    },
    /**
     * 公告页
     */
    {
      path: '/gonggao',
      name: 'gonggao',
      component: resolve => require(['@/view/gonggao.vue'], resolve)
    },
    /**
     * 首页
     */
    {
      path: '/*',
      name: 'xyptIndex',
      component: resolve => require(['@/view/xyptIndex'], resolve)
    },
  ]
});

router.beforeEach((to, from, next) => {
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  const route = ['home', 'gonggao', 'shareojf', 'book', 'trip', 'park', 'xyptIndex', 'WenchowMark', 'empindex', 'personinfo', 'eduinfo', 'eduinfo_city', 'eduinfo_school', 'edustatus', 'edulevel', 'ideninfo', 'job', 'marriage', 'political', 'driverinfo', 'type', 'carinfo', 'xynote', 'empmanager'];
  // 未登录状态；当路由到route指定页时，跳转至login
  if (route.indexOf(to.name) >= 0) {
    if (window.localStorage.getItem("idcard") && window.localStorage.getItem("username") && window.localStorage.getItem("token")) {
      next();
    } else {
      // next({
        // path: '/login'
      // });
      location.href = 'http://grcxf.wzcredit.gov.cn/cnvpweb/Home/login';
    }
  } else {
    next();
  }
});

export default router
