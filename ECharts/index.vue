<template>
  <VECharts :ref="echartsId" :option="option" :update-options="updateOptions" />
</template>

<script>
import VECharts from './echarts.js'
export default {
  components: { VECharts },
  props: {
    option: {
      type: Object,
      default: () => ({})
    },
    updateOptions: {
      type: Object,
      default: () => ({
        notMerge: true // echarts options 不合并
      })
    }
  },
  data() {
    return {
      echartsId: 'echarts_' + Date.now()
    }
  },
  mounted() {
    this.$nextTick(() => this.$refs[this.echartsId].resize())
    window.onresize = () => {
      this.$refs[this.echartsId].resize()
    }
  }
}
</script>
