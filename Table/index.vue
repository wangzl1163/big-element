<template>
   <el-table :row-class-name="rowClassName" :border="border" :data="tableData"
      @sort-change="orderMethod" :show-header="showHeader" :height="height">
      <template v-for="(item) in columns">
         <template v-if="item.render">
            <el-table-column v-if="item.renderHeader"
               :prop="item.key"
               :sortable="item.sortable?item.sortable:false"
               :key="item.key" :align="item.align"
               :width="item.width"
               :render-header="item.renderHeader"
               :class-name="item.className">
               <template slot-scope="params">
                  <Slot :render="item.render" :column="item" :row="params.row" :index="params.$index"></Slot>
               </template>
            </el-table-column>

            <el-table-column v-else
               :prop="item.key"
               :label="item.title"
               :sortable="item.sortable?item.sortable:false"
               :key="item.key"
               :align="item.align"
               :width="item.width"
               :class-name="item.className">
               <template slot-scope="params">
                  <Slot :render="item.render" :column="item" :row="params.row" :index="params.$index"></Slot>
               </template>
            </el-table-column>
         </template>

         <el-table-column v-else
            :prop="item.key"
            :label="item.title"
            :key="item.key"
            :sortable="item.sortable?item.sortable:false"
            :align="item.align"
            :width="item.width"
            :render-header="item.renderHeader"
            :class-name="item.className"
            show-overflow-tooltip>
         </el-table-column>
      </template>
   </el-table>
</template>
<script>
import Slot from './SlotRender';

export default {
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
         type: Function
      },
      showHeader: {
         type: Boolean,
         default: true
      },
      height: String
   },
   data() {
      return {}
   },
   components: { Slot },
   methods: {
      orderMethod: function (params) {
         let order = params.column.order || ''
         let column = {
            order: order.replace('ending', ''),
            key: params.column.property
         }
         this.$emit('orderMethod', column)
      }
   }
}
</script>
