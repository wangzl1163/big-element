<template>
	<el-tooltip ref="tooltip" v-bind="$attrs" v-model="tooltipVisible" :disabled="!tooltipVisible" placement="top" :content="tooltipContent">
		<div class="be-overflow-tooltip" :style="{ maxWidth:  realMaxWidth }" @mouseenter="$_handleMouseEnter">
			<span :id="id">
				{{ content }}
			</span>
		</div>
	</el-tooltip>
</template>

<script>
import { isNumber } from '../../../Utils/util';

export default {
	name: 'BeOverflowTooltip',
	props: {
		content: [String, Number, Boolean],
		maxWidth: {
			type: [Number, String]
		}
	},
	data() {
		return {
			id: Math.random().toString(36).slice(2),
			tooltipContent: '',
			tooltipVisible: false,
			offset: 0
		}
	},

	computed: {
		realMaxWidth(){
			return isNumber(this.maxWidth) ? this.maxWidth + 'px' : this.maxWidth
		}
	},

	created() {
		this.timerId = undefined
	},

	methods: {
		$_handleMouseEnter() {
			const el = document.getElementById(this.id)
			const elComputed = document.defaultView.getComputedStyle(el, '')
			const padding = parseInt(elComputed.paddingLeft.replace('px', '')) + parseInt(elComputed.paddingRight.replace('px', ''))

			const range = document.createRange()
			range.setStart(el, 0)
			range.setEnd(el, el.childNodes.length)
			const rangeWidth = range.getBoundingClientRect().width
			const realWidth = rangeWidth + padding
			if ((realWidth > el.offsetWidth || el.scrollWidth > el.offsetWidth) && this.$refs.tooltip) {
				this.offset = el.offsetWidth / 2 //realWidth - el.offsetWidth > realWidth / 2 ? el.offsetWidth / 2 :
				this.tooltipContent = this.content
				this.tooltipVisible = true
			}
		}
	}
}
</script>
