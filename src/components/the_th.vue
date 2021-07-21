<template>
  <th
    :rowspan="items.rowspan"
    :colspan="items.colspan"
    class="th_1"
    :width="items.width"
    :style="{
      textAlign: items.align ? 'center' : '',
      width: items.width ? items.width : '',
      padding: items.padding ? items.padding : '',
      writingMode: items.writingMode ? items.writingMode : '',
    }"
  >
    <span class="require" v-if="items.isRequire">*</span>
    <span v-html="items.label">{{ items.label }}</span>
  </th>
</template>

<script>
export default {
  name: "the_th",
  props: {
    items: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="less" scoped>
.th_1 {
  .require {
    color: red;
    margin-right: 2px;
  }
}
</style>
