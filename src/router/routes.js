
const routes = [
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/travel/Travel.vue'),
      },{
        path: '/travel',
        component: () => import('pages/travel/Travel.vue'),
      },{
        path: '/restaurant',
        component: () => import('../pages/restaurant/Restaurant'),
      }
    ]
  },
  {
    path: '/',
    component: () => import('../layouts/LoginLayout'),
    children: [
      {
        path: '/login',
        component: () => import('../pages/Login')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
