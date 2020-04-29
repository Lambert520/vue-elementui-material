import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home.vue'
import login from '@/components/login.vue'
import zhuce from '@/components/zhuce.vue'
import headTop from '@/components/headTop.vue'
// import someCharts from '@/page/someCharts.vue'
// import webMap from '@/page/webMap.vue'
import navBar from '@/components/navBar.vue'
import first from '@/page/first'
import housemasterInfo from '@/page/housemasterInfo'
// import housemasterAllot from '@/page/housemasterAllot'
import studentInfo from '@/page/studentInfo'
import dormInfo from '@/page/dormInfo'
import sanitation from '@/page/sanitation'
// import bed from '@/page/bed'
import repaired from '@/page/repaired'
// import leavescholl from '@/page/leavescholl'
import latereturn from '@/page/latereturn'
// import watertransfer from '@/page/watertransfer'
// import waterdeliver from '@/page/waterdeliver'
import userInfo from '@/page/userInfo'

Vue.use(Router)

export default new Router({

  routes: [
    // {
    //   path: '/',  // 默认进入路由
    //   redirect: '/home/first'   //重定向
    // },
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/zhuce',
      name: 'zhuce',
      component: zhuce,
      meta:{ requireAuth:true}
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: { title: '首页', requireAuth:true },
      children:[
        
        {
          path: '/home/first',
          name: 'first',
          component : first,
          meta: { requireAuth:true },
        },
        // {
        //   path: '/home/webMap',
        //   name: 'webMap',
        //   component : webMap,
        //   meta: { title: '地图' , requireAuth:true}
        // },
        // {
        //   path: '/home/someCharts',
        //   name: 'someCharts',
        //   component : someCharts,
        //   meta: { title: '物资类别' , requireAuth:true},

        // },
        {
          path: '/home/housemasterInfo',
          name: 'housemasterInfo',
          component : housemasterInfo,
          meta:{title: '基本信息', requireAuth:true}
        },
        // {
        //   path: '/home/housemasterAllot',
        //   name: 'housemasterAllot',
        //   component : housemasterAllot,
        //   meta:{title: '人员分配', requireAuth:true}
        // },
        {
          path: '/home/studentInfo',
          name: 'studentInfo',
          component : studentInfo,
          meta:{title: '基本信息', requireAuth:true}
        },
        {
          path: '/home/dormInfo',
          name: 'dormInfo',
          component : dormInfo,
          meta:{title: '基本信息', requireAuth:true}
        },
        {
          path: '/home/sanitation',
          name: 'sanitation',
          component : sanitation,
          meta:{title: '卫生情况', requireAuth:true}
        },
        // {
        //   path: '/home/bed',
        //   name: 'bed',
        //   component : bed,
        //   meta:{title: '就寝信息', requireAuth:true}
        // },
        {
          path: '/home/repaired',
          name: 'repaired',
          component : repaired,
          meta:{title: '报修记录', requireAuth:true}
        },
        // {
        //   path: '/home/leavescholl',
        //   name: 'leavescholl',
        //   component : leavescholl,
        //   meta:{title: '报修记录', requireAuth:true}
        // },
        {
          path: '/home/latereturn',
          name: 'latereturn',
          component : latereturn,
          meta:{title: '晚归记录', requireAuth:true}
        },
        // {
        //   path: '/home/watertransfer',
        //   name: 'watertransfer',
        //   component : watertransfer,
        //   meta:{title: '搬水记录', requireAuth:true}
        // },
        // {
        //   path: '/home/waterdeliver',
        //   name: 'waterdeliver',
        //   component : waterdeliver,
        //   meta:{title: '搬水记录', requireAuth:true}
        // },
        {
          path: '/home/userInfo',
          name: 'userInfo',
          component : userInfo,
          meta:{title: '用户信息', requireAuth:true}
        }
      ]
    },
    {
      path: '/headTop',
      name: 'headTop',
      component : headTop,
      meta:{ requireAuth:true}
    },
    {
      path: '/navBar',
      name: 'navBar',
      component : navBar,
      meta:{ requireAuth:true}
    }
  ]
})



