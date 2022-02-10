<template>
	<div class="be-password-view">
		<span v-if="showLabel" v-html="label" class="be-password-view__label" />
		<template v-if="password">
			<span class="be-password-view__content" :style="'width:' + contentWidth + 'px'">
				{{ show ? password : maskCode }}
			</span>
			<i v-if="isVue2" class="el-input__icon el-icon-view" style="line-height: 1" @click="show = !show" />
			<View v-if="isVue3" style="width: 1em; height: 1em; margin-left: 8px;" @click="show = !show"/>
		</template>
	</div>
</template>

<script>
import { vueVersion } from '../../../Store'

export default {
	name: 'BePasswordView',
	props: {
		password: {
			type: String,
			default: ''
		},
		label: {
			type: String,
			default: '密码：'
		},
		showLabel: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			show: false
		}
	},
	computed: {
		isVue2() {
			return vueVersion.isVue2()
		},
		isVue3() {
			return vueVersion.isVue3()
		},
		maskCode(){
			return '•'.repeat(this.password.length)
		},
		contentWidth(){
			return this.password.length * 8
		}
	}
}
</script>
