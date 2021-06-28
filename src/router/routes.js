
const routes = [
  {
    path: '',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/home', component: () => import('src/pages/PageNotes.vue') },
      { path: '/auth', component: () => import('src/pages/PageAuth.vue') },
      { path: '/about', component: () => import('src/pages/PageAbout.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
