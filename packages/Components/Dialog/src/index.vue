<template>
	<el-dialog
		v-bind="attrs"
		:title="title"
		:append-to-body="appendToBody"
		:width="dialogWidth"
		:close-on-click-modal="maskCloseable"
		:show-close="showClose"
		:customClass="'be-dialog ' + customClass"
		@close="cancel"
		@open="open"
		@closed="closed"
	>
		<template v-slot:title>
			<slot name="title"></slot>
		</template>

		<template v-slot:header>
			<slot name="header"></slot>
		</template>

		<slot></slot>

		<template v-slot:footer v-if="$slots.footer">
			<slot name="footer"></slot>
		</template>
		<template v-slot:footer v-else-if="showFooter">
			<el-button v-if="showCancel" @click="cancel">{{ cancelText }}</el-button>
			<el-button type="primary" :loading="loading" @click="confirm">{{ confirmText }}</el-button>
		</template>
	</el-dialog>
</template>
<script>
import { vueVersion } from '../../../Store/index'
import { isValidWidthUnit } from '../../../Utils/validators'
import { isNumber } from '../../../Utils/util'

export default {
	name: 'BeDialog',
	props: {
		visible: {
			required: true,
			type: Boolean
		},
		title: {
			type: String,
			default: ''
		},
		width: {
			type: [String, Number],
			default: '550px',
			validator: isValidWidthUnit
		},
		maskCloseable: {
			type: Boolean,
			default: false
		},
		showClose: {
			type: Boolean,
			default: true
		},
		appendToBody: {
			type: Boolean,
			default: true
		},
		customClass: {
			type: String,
			default: ''
		},
		showFooter: {
			// footer 非 slot 时是否显示内置的 footer
			type: Boolean,
			default: true
		},
		showCancel: {
			// footer 非 slot 时生效
			type: Boolean,
			default: true
		},
		confirmText: {
			// footer 非 slot 时生效
			type: String,
			default: '确定'
		},
		cancelText: {
			// footer 非 slot 时生效
			type: String,
			default: '取消'
		}
	},
	// vue2 会自动忽略该选项
	emits: ['update:visible', 'confirm', 'cancel', 'open', 'closed'],
	data() {
		return {
			loading: false
		}
	},
	computed: {
		attrs() {
			if (vueVersion.isVue2()) {
				return {
					...this.$attrs,
					visible: this.visible
				}
			}

			if (vueVersion.isVue3()) {
				return {
					...this.$attrs,
					modelValue: this.visible
				}
			}
		},
		dialogWidth() {
			return isNumber(this.width) ? this.width + 'px' : this.width
		}
	},
	watch: {
		visible() {
			this.loading = false
		}
	},
	methods: {
		confirm() {
			this.$emit('confirm', (isLoading = false) => {
				this.loading = isLoading
			})
		},
		cancel() {
			this.$emit('update:visible', false)
			this.$emit('cancel')
		},
		open() {
			this.$emit('open')
		},
		closed() {
			this.$emit('update:visible', false)
			this.$emit('closed')
		}
	}
}
</script>
