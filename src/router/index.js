import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

 const router= new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component:()=>import('@/view/index'),
      meta:{
        title:'DNT双轨经济生态'
      }
    },

    {
      path: '/zhiya',
      name: 'zhiya',
      component:()=>import('@/view/ziya'),
      meta:{
        title:'DNT双轨经济生态'
      }
    }
    ,
    {
      path: '/suhuidnt',
      name: 'suhuidnt',
      component:()=>import('@/view/suhuidnt'),
      meta:{
        title:'DNT双轨经济生态'
      }
    },
    {
      path: '/suhuibfb',
      name: 'suhuibfb',
      component:()=>import('@/view/suhuibfb'),
      meta:{
        title:'DNT双轨经济生态'
      }
    }
    ,
    {
      path: '/mynodedetail',
      name: 'mynodedetail',
      component:()=>import('@/view/mynodedetail'),
      meta:{
        title:'DNT双轨经济生态'
      }
    },
    {
      path: '/moneyrecord',
      name: 'moneyrecord',
      component:()=>import('@/view/moneyrecord'),
      meta:{
        title:'收益记录'
      }
    },
    {
      path: '/recentrecord',
      name: 'recentrecord',
      component:()=>import('@/view/recentrecord'),
      meta:{
        title:'最近交易'
      }
    },
    {
      path: '/guide',
      name: 'guide',
      component:()=>import('@/view/guide'),
      meta:{
        title:'问题查看'
      }
    },

  ]
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next()
});

export default router