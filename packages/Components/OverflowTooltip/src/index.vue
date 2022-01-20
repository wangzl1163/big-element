<template>
	<div class="be-overflow-tooltip" :style="{ maxWidth: maxWidth }">
		<span :id="id">
			{{ content }}
		</span>
		<el-tooltip placement="top" ref="tooltip" :content="tooltipContent"></el-tooltip>
	</div>
</template>

<script>
export default {
	props: {
		content: [String, Number, Boolean],
		maxWidth: {
			type: String
		}
	},
	data() {
		return {
			id: Math.random().toString(36).slice(2),
			tooltipContent: ''
		}
	},

	created() {
		this.timerId = undefined
	},

	methods: {
		handleMouseEnter() {
			const el = document.getElementById(this.id)
			const elComputed = document.defaultView.getComputedStyle(el, '')
			const padding = parseInt(elComputed.paddingLeft.replace('px', '')) + parseInt(elComputed.paddingRight.replace('px', ''))

			const range = document.createRange()
			range.setStart(el, 0)
			range.setEnd(el, el.childNodes.length)
			const rangeWidth = range.getBoundingClientRect().width

			if ((rangeWidth + padding > el.offsetWidth || el.scrollWidth > el.offsetWidth) && this.$refs.tooltip) {
				const tooltip = this.$refs.tooltip
				this.tooltipContent = this.content
				tooltip.referenceElm = el.parentElement
				tooltip.$refs.popper && (tooltip.$refs.popper.style.display = 'none')
				;tooltip.doDestroy()
				tooltip.setExpectedState(true)
				// 防抖
				if (!this.timerId) {
					this.timerId = setTimeout(() => {
						tooltip.handleShowPopper()
						
						this.timerId = undefined
					}, 50);
				}
			}
		}
	}
}
</script>
