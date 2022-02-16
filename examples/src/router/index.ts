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
			path: '/confirmButton',
			component: () => import('@/views/ConfirmButton/index.vue'),
			meta: {title: 'ConfirmButton'}
		},
		{
			path: '/datePicker',
			component: () => import('@/views/DatePicker/index.vue'),
			meta: {title: 'DatePicker'}
		},
		{
			path: '/dialog',
			component: () => import('@/views/Dialog/index.vue'),
			meta: {title: 'Dialog'}
		},
		{
			path: '/overflowTooltip',
			component: () => import('@/views/OverflowTooltip/index.vue'),
			meta: {title: 'OverflowTooltip'}
		},
		{
			path: '/passwordInput',
			component: () => import('@/views/PasswordInput/index.vue'),
			meta: {title: 'PasswordInput'}
		},
		{
			path: '/passwordView',
			component: () => import('@/views/PasswordView/index.vue'),
			meta: {title: 'PasswordView'}
		},
		{
			path: '/statusText',
			component: () => import('@/views/StatusText/index.vue'),
			meta: {title: 'StatusText'}
		},
		{
			path: '/table',
			component: () => import('@/views/Table/index.vue'),
			meta: {title: 'Table'}
		}
	]
})


export default router