<template>
	<div class="be-date-picker" :class="computedDisplayStyle">
		<div v-if="pickerShortcuts.length === 0" class="be-date-picker__radio">
			<el-radio-group v-model="radioShortCut" @change="$_radioChange">
				<el-radio-button v-for="item in shortCuts" :key="item.value" :label="item.value">{{ item.name }}</el-radio-button>
			</el-radio-group>
		</div>
		<div class="be-date-picker--picker">
			<el-date-picker
				v-model="datePickerValue"
				v-bind="attrs"
				class="be-date-picker--picker_date"
				type="daterange"
				:value-format="$_formatValue()"
				range-separator="-"
				start-placeholder="开始日期"
				end-placeholder="结束日期"
				@change="$_pickerChange"
			/>
		</div>
	</div>
</template>

<script>
import { vueVersion } from '../../../Store'

export default {
	name: 'BeDatePicker',
	model: {
		prop: 'modelValue',
		event: 'update:modelValue'
	},
	props: {
		modelValue: {
			type: Array,
			default: () => []
		},
		defaultShortCut: {
			type: String,
			default: '1'
		},
		displayShortCuts: {
			type: Array,
			default: () => ['1', '7', '30']
		},
		valueFormat: {
			type: String,
			default: 'YYYY-MM-DD'
		},
		displayStyle: {
			type: String,
			default: 'tab' // 可选值：border，tab
		},
		pickerShortcuts: {
			type: Array,
			default: () => []
		}
	},
	emits: ['update:modelValue', 'change'],
	data() {
		return {
			radioShortCut: parseInt(this.defaultShortCut),
			datePickerValue: null
		}
	},
	computed: {
		shortCuts() {
			return Object.entries({
				0: {
					name: '今天',
					value: 0
				}, // 今天
				1: {
					name: '昨天',
					value: 1
				}, // 昨天
				// '6': 6, // 本周
				7: {
					name: '近7天',
					value: 7
				}, // 近7天
				// '29': 29, // 本月
				30: {
					name: '近30天',
					value: 30
				}, // 近30天
				90: {
					name: '近90天',
					value: 90
				} // 近90天
			}).reduce((pre, sc) => {
				if (this.displayShortCuts.includes(sc[0])) {
					pre[sc[0]] = sc[1]
				}

				return pre
			}, {})
		},
		computedDisplayStyle() {
			return this.pickerShortcuts.length === 0
				? {
						tab: 'be-date-picker--tab',
						border: 'be-date-picker--border'
				  }[this.displayStyle]
				: 'be-date-picker--no-radio-short-cut'
		},
		attrs() {
			if (vueVersion.isVue2()) {
				return {
					pickerOptions: {
						disabledDate: this.$_disableDate,
						shortcuts: this.pickerShortcuts
					}
				}
			}

			if (vueVersion.isVue3()) {
				return {
					disabledDate: this.$_disableDate,
					shortcuts: this.pickerShortcuts
				}
			}
		}
	},
	watch: {
		radioShortCut(value) {
			this.$_handleValueUpdate(value)
		}
	},

	methods: {
		// 禁用当前日期以后的日期
		$_disableDate(date) {
			const curDate = new Date()
			curDate.setHours(23, 59, 59, 0)

			return date > curDate.getTime()
		},
		$_radioChange() {
			this.datePickerValue = null
		},
		$_pickerChange(e) {
			this.radioShortCut = ''
			this.$_handleValueUpdate(this.radioShortCut)
		},
		$_formatValue() {
			if (vueVersion.isVue2()) {
				return this.valueFormat.replace(/Y/g, 'y').replace(/D/g, 'd')
			}

			if (vueVersion.isVue3()) {
				return this.valueFormat.replace(/y/g, 'Y')
			}
		},
		$_handleValueUpdate(radioShortCut) {
			let res = []

			if (radioShortCut) {
				const getTime = (days) => {
					const date = new Date().setHours(0, 0, 0, 0)
					return days === 0
						? [date, new Date().setTime(date + (3600 * 23 + 60 * 59 + 59) * 1000)]
						: [new Date().setTime(date - 3600 * 24 * 1000 * days), date - 1000]
				}

				res = getTime(radioShortCut)
			} else {
				res = this.datePickerValue
			}

			this.$emit('update:modelValue', res)
			// 对外暴露一个change事件
			this.$emit('change', res)
		}
	}
}
</script>
