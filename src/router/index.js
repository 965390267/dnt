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
        title:'Nova 质变'
      }
    },

    // {
    //   path: '/zhiya',
    //   name: 'zhiya',
    //   component:()=>import('@/view/ziya'),
    //   meta:{
    //     title:'Nova 质变'
    //   }
    // }
    // ,
    {
      path: '/suhui',
      name: 'suhui',
      component:()=>import('@/view/suhui'),
      meta:{
        title:'Nova 质变'
      }
    }
    ,
    {
      path: '/mynodedetail',
      name: 'mynodedetail',
      component:()=>import('@/view/mynodedetail'),
      meta:{
        title:'Nova 质变'
      }
    },
    {
      path: '/moneyrecord',
      name: 'moneyrecord',
      component:()=>import('@/view/moneyrecord'),
      meta:{
        title:'Nova 质变'
      }
    },
    {
      path: '/recentrecord',
      name: 'recentrecord',
      component:()=>import('@/view/recentrecord'),
      meta:{
        title:'Nova 质变'
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