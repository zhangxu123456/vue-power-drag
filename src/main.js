import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import axios from 'axios'
Vue.config.productionTip = false
Vue.use(ElementUI)
/* router.beforeEach((to, from, next) => {
	const token = localStorage.token
	const role = 'user'
	//需要路由验证
	console.log(to.meta.roles)
	if (to.meta.requireAuth) {
		//需要进行token验证
		if (token) {
			if (to.path === '/login') {
				next({ path: '/' })
			} else {
				if (to.meta.roles.includes(role)) {
					next()
				} else {
					console.log('无权限')
				}
			}
		} else {
			if (to.path === '/login') {
				next()
			} else {
				next({ path: '/login' })
			}
		}
	} else {
		next()
	}
})
//每次请求带上token
axios.interceptors.request.use(
	config => {
		const token = localStorage.token
		console.log(config)
		if (token) {
			config.headers.accessToken = token
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)
//服务器每次响应对token进行验证
axios.interceptors.response.use(config => {
	//token失效
	if (config.data && config.data.code === 401) {
		router.push({ name: 'login' })
	}
	return config
}) */
new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
