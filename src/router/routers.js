

import Index from '@/Navigation/Index'  // 主页

export default [{
    path: '/',
    name: 'Index',
    component: Index,
    children:[{
      path:'/',
      name:'HotWork',
      component:() => import("@/components/HomePageShowWork/HotWork.vue"),
    },
    {
      path:'/NewWork',
      name:'NewWork',
      component:() => import("@/components/HomePageShowWork/NewWork.vue"),
    }],redirect: '/'
  },
  {
    path: '/Works',
    name: 'Works',
    component: () => import("@/Navigation/Works.vue"),
  },
  {
    path: '/Team',
    name: 'Team',
    component: () => import("@/Navigation/Team.vue"),
    children: [{
      path: '/',
      name: 'TeamList',
      component: () => import("@/components/TeamList/TeamList.vue"),
    }],
    redirect: 'Team'
  },
  {
    path: '/SignIn',
    name: 'SignIn',
    component: () => import("@/Navigation/SignIn.vue"),
  },
  {
    path: '/Works/WorksDetails:pkId',
    name: 'WorksDetails',
    component: () => import("@/Page/Works/WorksDetails.vue"),
  },
  {
    path: '/Team/TeamDetail:pkId',
    name: 'TeamDetail',
    component: () => import("@/Page/Team/TeamDetail.vue"),
  }
]
