<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-input
      id="dom1"
      v-model="input"
      style="width:200px;margin-right:20px"
      placeholder="请输入内容"
    ></el-input>
    <el-button id="dom2" type="primary">主要按钮</el-button>
   
  </div>
</template>
<script>
// import tipsDialog from "@/components/tipsDialog.vue";
export default {
  name: "About",
  data() {
    return {
      input: "",
      domId: "dom1",
    };
  },
  mounted() {

  },
  methods: {
    
  },
};
</script>
<style lang="less" scoped>
.user-explan {
  position: absolute;
  top: 50px;
  left: 0;
  width: 500px;
  height: 300px;
  background: #fff;
}
</style>
