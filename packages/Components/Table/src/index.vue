<template>
	<div>
		<el-table
			:ref="tableRef"
			class="be-table"
			v-bind="$attrs"
			v-loading="loading"
			:row-class-name="border ? rowClassName : 'be-table__row--bt ' + rowClassName"
			:border="border"
			:data="isSelfPaging ? data.slice((pageNo - 1) * pageCount, pageNo * pageCount) : data"
			:show-header="showHeader"
			:height="height"
			:header-row-class-name="headerRowClassName"
			:header-cell-class-name="headerCellClassName"
			:highlight-current-row="highlightCurrentRow"
			:span-method="spanMethod"
			:row-key="rowKey"
			:expand-row-keys="expandRowKeyList"
			:default-sort="computedDefaultSort"
			@current-change="$_handleCurrentRowChange"
			@row-click="$_handleRowClick"
			@sort-change="$_handleSortChange"
			@selection-change="$_handleSelectionChange"
			@expand-change="$_handleExpandChange"
		>
			<template v-for="item in columns">
				<template v-if="item.render">
					<el-table-column
						v-if="item.renderHeader"
						:sortable="item.sortable ? item.sortable : false"
						:align="item.align"
						:width="item.width"
						:min-width="item.minWidth"
						:render-header="item.renderHeader"
						:class-name="item.className"
					>
						<template v-slot="params">
							<SlotRender :render="item.render" :column="params.column" :row="params.row" :index="params.$index"></SlotRender>
						</template>
					</el-table-column>
					<el-table-column
						v-else-if="item.type === 'expand'"
						:sortable="item.sortable ? item.sortable : false"
						:align="item.align"
						:width="item.width"
						:min-width="item.minWidth"
						:render-header="item.renderHeader"
						:class-name="item.className"
						:type="item.type"
					>
						<template v-slot="params">
							<SlotRender :render="item.render" :column="params.column" :row="params.row" :index="params.$index"></SlotRender>
						</template>
					</el-table-column>
					<el-table-column
						v-else
						:label="item.label"
						:sortable="item.sortable ? item.sortable : false"
						:align="item.align"
						:width="item.width"
						:min-width="item.minWidth"
						:class-name="item.className"
					>
						<template v-slot="params">
							<SlotRender :render="item.render" :column="params.column" :row="params.row" :index="params.$index"></SlotRender>
						</template>
					</el-table-column>
				</template>

				<el-table-column
					v-else
					:type="item.type"
					:prop="item.prop"
					:label="item.label"
					:key="item.prop"
					:sortable="item.sortable ? item.sortable : false"
					:align="item.align"
					:width="item.width"
					:min-width="item.minWidth"
					:render-header="item.renderHeader"
					:class-name="item.className"
					:formatter="item.formatter"
					show-overflow-tooltip
				>
				</el-table-column>
			</template>
		</el-table>

		<div v-if="showPagination" class="be-pagination">
			<el-pagination
				@size-change="$_handleSizeChange"
				@current-change="$_handlePageChange"
				:current-page="pageNo"
				:page-sizes="pageSizes"
				:page-size="pageCount"
				:layout="pageLayout"
				:total="isSelfPaging ? data.length : total"
			>
			</el-pagination>
		</div>
	</div>
</template>
<script>
import SlotRender from './SlotRender'

const getRowIdentity = (row, rowKey) => {
	if (rowKey.indexOf('.') === -1) {
		return row[rowKey]
	}

	const keys = rowKey.split('.')
	let val = row

	keys.forEach((key) => {
		val = val[key]
	})

	return val
}

export default {
	name: 'BeTable',
	props: {
		border: {
			type: Boolean,
			default: false
		},
		columns: {
			required: true,
			type: Array
		},
		data: {
			required: true,
			type: Array
		},
		rowClassName: {
			type: [Function, String]
		},
		showHeader: {
			type: Boolean,
			default: true
		},
		headerRowClassName: [Function, String],
		headerCellClassName: [Function, String],
		height: [String, Number],
		highlightCurrentRow: {
			type: Boolean,
			default: false
		},
		spanMethod: Function,
		isSelfPaging: {
			// 是否前端自己分页
			type: Boolean,
			default: false
		},
		rowKey: {
			type: String
		},
		expandRowKeys: {
			type: Array
		},
		rowClick2Expand: {
			// 点击当前行是否展开折叠的内容
			type: Boolean,
			default: false
		},
		accordion: {
			// 是否每次只展开一行，即手风琴模式，为 true 时需要设置 rowKey
			type: Boolean,
			default: false
		},
		defaultSort: {
			type: Object,
			default: () => undefined,
			validator(value) {
				return !!value.prop
			}
		},
		pageIndex: {
			type: Number,
			default: 1
		},
		pageSizes: {
			type: Array,
			default: () => [10, 20, 30, 40, 50]
		},
		pageSize: {
			type: Number,
			default: 10
		},
		total: {
			type: Number,
			default: 0
		},
		pageLayout: {
			type: String,
			default: 'total, sizes, prev, pager, next, jumper'
		},
		showPagination: {
			type: Boolean,
			default: true
		}
	},
	emits: ['pageSizeChange', 'pageChange', 'currentRowChange', 'rowClick', 'expandChange', 'selectionChange', 'sortChange'],
	data() {
		return {
			tableRef: 'table_' + Date.now(),
			loading: false,
			pageNo: this.pageIndex,
			pageCount: this.pageSize,
			expandRowKeyList: this.expandRowKeys
		}
	},
	components: { SlotRender },
	computed: {
		computedDefaultSort() {
			return {
				order: 'ascending',
				...this.defaultSort
			}
		}
	},
	watch: {
		pageIndex: function (val) {
			this.pageNo = val
		},
		pageSize: function (val) {
			this.pageCount = val
		}
	},
	mounted() {
		this.table = this.$refs[this.tableRef]
	},
	methods: {
		$_handleSortChange: function (params) {
			// isSelfPaging 为 true 时前端自己分页排序自然也是前端自己进行，因为所有数据都在前端；
			// 为 false 时如果 sortable === 'custom' 则为后端排序与 el-table 逻辑一致，可参见官方文档
			const sortable = params?.column?.sortable ?? null
			if (!this.isSelfPaging && sortable === 'custom') {
				let order = params.column.order || ''
				let column = {
					order: order.replace('ending', ''),
					key: params.column.property
				}
				this.$emit('sortChange', column)
			} else {
				const handleSort = ({ order }) => {
					if (order === null || !this.defaultSort?.prop) {
						return
					}

					// 升序与降序算法是从element的table组件中移植的，与其排序效果一致
					const reverse = order === 'descending' ? -1 : 1

					if (order === 'ascending') {
						this.data.sort((a, b) => compare(a[this.defaultSort.prop], b[this.defaultSort.prop]))
					}

					if (order === 'descending') {
						this.data.sort((a, b) => compare(a[this.defaultSort.prop], b[this.defaultSort.prop]) * reverse)
					}

					function compare(v1, v2) {
						for (let i = 0, len = v1.length; i < len; i++) {
							if (v1[i] < v2[i]) {
								return -1 // v1小于v2， v1排在v2前面
							}

							if (v1[i] > v2[i]) {
								return 1 // v1大于v2，v1排在v2后面
							}
						}

						return 0 // 等于，位置不变
					}
				}

				handleSort(params)
			}
		},
		$_handleSizeChange(val) {
			this.pageNo = 1
			this.pageCount = val

			this.$emit('pageSizeChange', {
				pageIndex: this.pageNo,
				pageSize: this.pageCount
			})
		},
		$_handlePageChange(val) {
			this.pageNo = val

			this.$emit('pageChange', {
				pageIndex: this.pageNo,
				pageSize: this.pageCount
			})
		},
		$_handleCurrentRowChange(val, oldCurrentRow) {
			// 返回选中的当前行
			this.$emit('currentRowChange', val, oldCurrentRow)
		},
		$_handleRowClick(row, column, event) {
			// row click 与 expand change 是互不干扰的，点击行时不会触发 expand change。

			// event.path[1].type !== "button"，屏蔽掉行内的操作按钮点击事件
			if (this.rowClick2Expand && event.path[1].type !== 'button') {
				const rowIdentity = getRowIdentity(row, this.rowKey)
				if (this.accordion) {
					if (this.expandRowKeyList.length !== 0) {
						// 有则删除，无则替换
						this.expandRowKeyList = this.expandRowKeyList.includes(rowIdentity) ? [] : [rowIdentity]
					} else {
						this.expandRowKeyList = [getRowIdentity(row, this.rowKey)]
					}
				} else {
					if (this.expandRowKeyList.length !== 0) {
						// 无则添加，有则删除
						this.expandRowKeyList = this.expandRowKeyList.includes(rowIdentity)
							? this.expandRowKeyList.filter((item) => item !== rowIdentity)
							: this.expandRowKeyList.concat([rowIdentity])
					} else {
						this.expandRowKeyList = [getRowIdentity(row, this.rowKey)]
					}
				}
			}

			this.$emit('rowClick', row, column, event)
		},
		$_handleExpandChange(row, val) {
			const expanded = val.map((item) => getRowIdentity(item, this.rowKey))

			if (this.accordion) {
				const rowIdentity = getRowIdentity(row, this.rowKey)
				this.expandRowKeyList = val.length > 0 ? expanded.filter((ex) => ex === rowIdentity) : []
			} else {
				if (this.rowClick2Expand) {
					if (val.length === 0) {
						this.expandRowKeyList = []
					} else {
						this.expandRowKeyList = expanded
					}
				}
			}

			this.$emit('expandChange', row, val)
		},
		$_handleSelectionChange(val) {
			// 当选择项发生变化时会触发该事件
			this.$emit('selectionChange', val)
		},
		clearSelection() {
			this.$refs[this.tableRef].clearSelection()
		},
		load(val) {
			this.loading = val
		}
	}
}
</script>
