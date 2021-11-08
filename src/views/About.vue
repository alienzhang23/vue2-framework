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
    <tips-dialog :idStr="domId" ref="tipsDialog" pos="left">
      <template v-slot:content>
        <div class="user-explan">
          <!-- 你自己的用户指引内容 -->
          <el-button type="primary" @click="funNext()">下一步</el-button>
        </div>
      </template>
    </tips-dialog>
  </div>
</template>
<script>
import tipsDialog from "@/components/tipsDialog.vue";
export default {
  components: {
    tipsDialog,
  },
  data() {
    return {
      input: "",
      domId: "dom1",
    };
  },
  mounted() {
    this.$nextTick(() => {
      // 打开用户指引
      this.domId = "dom1";
      this.$refs.tipsDialog.open();
    });
  },
  methods: {
    funNext() {
      this.$refs.tipsDialog.close();
      // 打开用户指引
      this.domId = "dom2";
      this.$refs.tipsDialog.open();
    },
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
