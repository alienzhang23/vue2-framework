<template>
  <div id="form-table">
    <table class="list" cellspacing="0">
      <slot></slot>
      <tr v-for="(item, index) in data" :key="index">
        <component
          v-for="(items, indexs) in item"
          :key="indexs"
          :is="items.type"
          :items="items"
          :nextItem="item[indexs - 1]"
        ></component>
      </tr>
    </table>
  </div>
</template>

<script>
import The_th from "./the_th";
import The_td from "./the_td";

export default {
  name: "form-table",
  components: { The_th, The_td },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style lang="less" scoped>
  #form-table {
    width: 100%;
    display: flex;
    .list {
      border: 1px solid #dee9ff;
      flex: 1;
      border-collapse: collapse;
      table-layout: fixed;
      tr {
        width: 100%;
        th,
        td {
          font-size: 16px;
          font-family: MicrosoftYaHeiUI;
          color: #1C1C1C;
          line-height: 20px;
          height: 48px;
          text-align: left;
          border: 1px solid #F6F8F9;
          font-weight: normal;
        }
      }

      .th_1 {
        background: #E6F3FF;
        border: 1px solid #F6F8F9;
        padding-left: 20px;
      }
    }
  }
</style>
<style  lang="less">
#form-table {
  margin: 40px 0 0;
  width: 100%;
    display: flex;
  .el-input__inner,.el-textarea__inner{
    border: 0;
  }
 
}
</style>
