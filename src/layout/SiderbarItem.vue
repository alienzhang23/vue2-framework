<template>
  <div>
    <template v-if="!item.children ">
      <el-menu-item :index="item.path">
        <i :class="item.icon"></i>
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
    </template>

    <el-submenu v-else ref="subMenu" :index="item.title" popper-append-to-body>
      <template slot="title">
        <i :class="item.icon"></i>
        <span slot="title">{{ item.title }}</span>
      </template>
      <siderbar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: "SiderbarItem",
  props: {
    item: {
      type: Object
    }
  },
  methods: {
  }
};
</script>

<style lang="less" scoped>

.el-header {
  background-color: #ffffff;
  color: #333;
  line-height: 60px;
  border-bottom: 1px solid #e8e8e8;
}

.el-aside {
  color: #333;
  height: 100%;
}
.el-container {
  height: 100%;
  overflow: hidden;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu--collapse {
  height: 100% !important;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  height: 100% !important;
}
.el-menu-vertical-demo.el-menu--collapse i {
  margin-right: 20px;
}

.el-menu {
  border-right: none;
  overflow: hidden;
}
</style>