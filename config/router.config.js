export default [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      { path: '/', component: './index/index', title: '首页' },
      { path: '/login', component: './login/index', title: '登录', guest: true },
      // { path: '/task', component: './task/index', title: '任务列表' },
      // { path: '/task/affirm', component: './task/affirm', title: '任务列表' },
      // { path: '/task/install', component: './task/install', title: '任务列表' },
      // { path: '/task/submit', component: './task/submit', title: '任务详情' },
      // { path: '/confirm/cart', component: './confirm/cart', title: '提交需求单' },
      // { path: '/confirm/receiving', component: './confirm/receiving', title: '收货确认' },
      // { path: '/confirm/install', component: './confirm/install', title: '安装确认' },

      // { path: '/task/detail', component: './task/detail', title: '任务详情' },
      // { path: '/demand', component: './demand/index', title: '活动物料需求单' },
      // { path: '/demand/detail', component: './demand/detail', title: '需求单详情' },
      // { path: '/resource', component: './resource/index', title: '资源点列表' },

      // { path: '/logistics', component: './logistics/index', title: '物流查询' },

      // { path: '/message', component: './message/index', title: '消息中心' },
      { path: '/userinfo', component: './userinfo/index', title: '我的资料' },
      { path: '/test', component: './test/index', title: '测试页面' },
      {
        path: '/exception',
        component: '../layouts/ExceptionLayout',
        routes: [
          { path: '/exception/403', title: '无权限', component: './exception/403' },
          { path: '/exception/500', title: '服务器出错了', component: './exception/500' },
        ],
      },
      { component: '404', title: '页面没找到' },
    ],
  },
];
