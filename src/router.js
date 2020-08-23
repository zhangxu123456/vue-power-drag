import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const constantRouterMap = [
  {
    path: '/Home',
    name: 'Home',
    label: '首页',

    component: () => import('./views/Home.vue')
  },
  {
    path: '/about',
    name: 'about',
    label: '首页',

    component: () => import('./views/About.vue')
  },
  {
    path: '/two',
    name: 'two',
    label: '首页',

    component: () => import('./views/two.vue')
  },
  {
    path: '/shizhong',
    name: 'shizhong',
    label: '首页',
    component: () => import('./views/shizhong.vue')
  },
  {
    path: '/three1',
    name: 'three1',
    label: '首页',
    component: () => import('./views/three1.vue')
  },
  {
    path: '/four',
    name: 'four',
    label: 'four',
    component: () => import('./views/four.vue')
  }
  /* {
		path: '/',
		name: 'Admin',
		label: '首页',
		component: () => import('./views/Home.vue'),
	},

	{
		path: '/parent',
		name: 'parent',
		component: () => import('./views/parent.vue'),
	},
	{
		path: '/login',
		name: 'login',
		label: '登录',
		component: () => import('./components/Login.vue'),
		children: [
			{
				path: 'parent',
				component: () => import('./views/parent.vue'),
			},
		],
	}, */
]

export default new Router({
  mode: 'history',
  routes: constantRouterMap
})
