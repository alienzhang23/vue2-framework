<template>
  <div>
    <el-container class="framework">
      <el-aside style="width:auto">
        <el-scrollbar wrap-class="scrollbar-wrapper" :vertical="true">
          <el-menu class="el-menu-vertical-demo" router :default-active="activeMenu" :collapse="isCollapse"
            background-color="#001529" text-color="#fff" :unique-opened="false" active-text-color="#ffd04b"
            :collapse-transition="true" mode="vertical">
            <siderbar-item v-for="route in menuList" :key="route.id" :item="route" />
          </el-menu>
        </el-scrollbar>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <div style="display: flex; justify-content: space-between">

            <i :class="[
              { 'el-icon-s-fold': !isCollapse },
              'el-icon-s-unfold',
              'icon-switch',
            ]" @click="funSwitch()"></i>

            <div>
              <el-dropdown>
                <i class="el-icon-setting" style="margin-right: 15px"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>查看</el-dropdown-item>
                  <el-dropdown-item>新增</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <span>王小虎</span>
            </div>
          </div>
        </el-header>


        <el-main>
          <keep-alive>
            <router-view />
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import SiderbarItem from "./SiderbarItem";
export default {
  data() {
    return {
      menuList: [
        {
          icon: "el-icon-menu",
          path: "/page2",
          name: "Page2",
          title: 'page2'
        },
        {
          title: '导航一',
          icon: "el-icon-message",
          children: [
            {
              path: "/index",
              name: "Home",
              title: '首页'
            },
            {
              title: '选项3',
              children: [
                {
                  title: 'page1',
                  path: "/page1",
                  name: "Page1",
                }
              ],
            },
            {
              path: "/about",
              name: "About",
              title: '关于'
            },
          ],
        }
      ],
      breadcrumb: [],
      isCollapse: false
    };
  },
  computed: {
    activeMenu() {
      const route = this.$route;
      const { path } = route;
      return path;
    },
    routes() {
      return this.$route;
    }
  },
  methods: {
    funSwitch() {
      this.isCollapse = !this.isCollapse;
    },
  },
  watch: {

  },

  components: {
    SiderbarItem
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
  background: rgb(0, 21, 41);
  height: 100%;
}

.el-container {
  height: 100%;
  overflow: hidden;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}

.framework {
  height: 100vh;
  overflow: hidden;
}

.breadcrumb {
  line-height: 60px;
  margin-left: 10px;
}

.icon-switch {
  cursor: pointer;
  font-size: 28px;
  margin-top: 15px;
}

.el-menu {
  border-right: none;
  overflow: hidden;
}
</style>