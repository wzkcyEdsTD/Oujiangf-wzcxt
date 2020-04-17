// 首页子路由
const empindexChildren = [
  {
    path: 'book',
    name: 'book',
    component: resolve => require(['@/view/empindex/book.vue'], resolve),
    meta: {
      title: '图书'
    }
  },
  {
    path: 'park',
    name: 'park',
    component: resolve => require(['@/view/empindex/park.vue'], resolve),
    meta: {
      title: '停车'
    }
  },
  {
    path: 'hospital',
    name: 'hospital',
    component: resolve => require(['@/view/empindex/hospital.vue'], resolve),
    meta: {
      title: '医院'
    }
  },
  {
    path: 'trip',
    name: 'trip',
    component: resolve => require(['@/view/empindex/trip.vue'], resolve),
    meta: {
      title: '旅游'
    }
  },
  {
    path: 'exercise',
    name: 'exercise',
    component: resolve => require(['@/view/empindex/exercise.vue'], resolve),
    meta: {
      title: '健身'
    }
  },
  {
    path: 'finance',
    name: 'finance',
    component: resolve => require(['@/view/empindex/finance.vue'], resolve),
    meta: {
      title: '金融'
    }
  }
];
export default empindexChildren;
