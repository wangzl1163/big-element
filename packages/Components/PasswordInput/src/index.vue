<template>
	<el-input v-model="value" :type="type" :placeholder="placeholder" @input="$emit('update:modelValue', $event)">
		<template v-slot:suffix>
			<i v-if="isVue2" class="el-input__icon el-icon-view" style="line-height: 1" @click="handleClickView" />
			<View v-if="isVue3" class="be-password-input__icon--vue3" @click="handleClickView"/>
		</template>
	</el-input>
</template>

<script>
import { vueVersion } from '../../../Store'

export default {
	name: 'BePasswordInput',
	model: {
		prop: 'modelValue',
		event: 'update:modelValue'
	},
	props: {
		modelValue: {
			type: String,
			default: ''
		},
		placeholder: {
			type: String,
			default: '请输入'
		}
	},
	emits: ['update:modelValue'],
	data() {
		return {
			value: this.modelValue,
			type: 'password'
		}
	},
	computed: {
		isVue2() {
			return vueVersion.isVue2()
		},
		isVue3() {
			return vueVersion.isVue3()
		}
	},
	methods: {
		handleClickView() {
			this.type = this.type === 'password' ? 'text' : 'password'
		}
	}
}
</script>
