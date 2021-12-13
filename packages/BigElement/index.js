import installer from './defaults'
export * from '../Components'

export { default as makeInstaller } from './makeInstaller'
export { default } from './defaults'

export const install = installer.install

import {
	defineComponent,
	unref,
	shallowRef,
	toRefs,
	watch,
	computed,
	inject,
	onMounted,
	onUnmounted,
	h,
	nextTick,
	PropType,
	watchEffect,
	Vue2
 } from "vue-demi";

 