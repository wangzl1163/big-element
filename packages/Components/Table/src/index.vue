<template>
   <div>
      <VTable
         :ref="tableRef"
         :row-class-name="rowClassName"
         :border="border"
         :data="tableData"
         :show-header="showHeader"
         :height="height"
         :header-row-class-name="headerRowClassName"
         :header-cell-class-name="headerCellClassName"
         :highlight-current-row="highlightCurrentRow"
         :span-method="spanMethod"
         @current-change="handleCurrentRowChange"
         @sort-change="orderMethod"
         @selection-change="handleSelectionChange">
         <template v-for="(item) in columns">
            <template v-if="item.render">
               <VTableColumn v-if="item.renderHeader"
                  :prop="item.key"
                  :sortable="item.sortable?item.sortable:false"
                  :key="item.key" :align="item.align"
                  :width="item.width"
                  :render-header="item.renderHeader"
                  :class-name="item.className">
                  <template slot-scope="params">
                     <v-slot :render="item.render" :column="item" :row="params.row" :index="params.$index"></v-slot>
                  </template>
               </VTableColumn>

               <VTableColumn v-else
                  :prop="item.key"
                  :label="item.title"
                  :sortable="item.sortable?item.sortable:false"
                  :key="item.key"
                  :align="item.align"
                  :width="item.width"
                  :class-name="item.className">
                  <template slot-scope="params">
                     <v-slot :render="item.render" :column="item" :row="params.row" :index="params.$index"></v-slot>
                  </template>
               </VTableColumn>
            </template>

            <VTableColumn v-else
               :prop="item.key"
               :label="item.title"
               :key="item.key"
               :sortable="item.sortable?item.sortable:false"
               :align="item.align"
               :width="item.width"
               :render-header="item.renderHeader"
               :class-name="item.className"
               show-overflow-tooltip>
            </VTableColumn>
         </template>
      </VTable>
      <div v-if="showPagination" style="margin-top: 20px;text-align: right;">
         <VPagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
         </VPagination>
      </div>
   </div>

</template>
<script>
import { VTable,VTableColumn,VPagination } from '@/Utils/register';
import vSlot from './SlotRender';

export default {
   name: 'BETable',
   components: {VTable,VTableColumn,VPagination},
   props: {
      border: {
         type: Boolean,
         default: false
      },
      columns: {
         type: Array
      },
      tableData: {
         type: Array
      },
      rowClassName: {
         type: Function | String
      },
      showHeader: {
         type: Boolean,
         default: true
      },
      headerRowClassName: Function | String,
      headerCellClassName: Function | String,
      height: String,
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
         default: 1
      },
      showPagination: {
         type: Boolean,
         default: true
      },
      highlightCurrentRow: {
         type: Boolean,
         default: false
      },
      spanMethod: Function
   },
   data() {
      return {
         tableRef: 'table_' + Date.now()
      }
   },
   components: { vSlot },
   methods: {
      orderMethod: function (params) {
         let order = params.column.order || ''
         let column = {
            order: order.replace('ending', ''),
            key: params.column.property
         }
         this.$emit('orderMethod', column)
      },
      handleSizeChange(val) {
         this.$emit('update:pageSize', val) // 用于支持.sync修饰符
         this.$emit('pageSizeChange', val)
      },
      handleCurrentChange(val) {
         this.$emit('update:pageIndex', val)
         this.$emit('pageChange', val)
      },
      handleCurrentRowChange(val){
         // 返回选中的当前行
         this.$emit('currentRowChange', val)
      },
      handleSelectionChange(val) {
         // 当选择项发生变化时会触发该事件
         this.$emit('selectionChange', val)
      },
      clearSelection(){
         this.$refs[this.tableRef].clearSelection()
      }
   }
}
</script>

