import {createRouter, createWebHashHistory} from 'vue-router';

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			redirect: '/home'
		},
		{
			path: '/home',
			component: () => import('@/App.vue'),
			meta: {title: 'Home'}
		},
		{
			path: '/dialog',
			component: () => import('@/views/Dialog/index.vue'),
			meta: {title: 'Dialog'}
		},
		{
			path: '/table',
			component: () => import('@/views/Table/index.vue'),
			meta: {title: 'Table'}
		},
		{
			path: '/confirmButton',
			component: () => import('@/views/ConfirmButton/index.vue'),
			meta: {title: 'ConfirmButton'}
		}
	]
})


export default router