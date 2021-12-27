<template>
  <el-container class="framework">
    <el-aside style="background-color: rgb(238, 241, 246);width:auto">
      <el-menu
     
        :default-active="$route.path"
        :unique-opened="true"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        :router="true"
        background-color="#001529"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu
          :index="`${index}`"
          v-if="!item.path"
          v-for="(item, index) in menuList"
          :key="`${item.title}-${index}`"
        >
          <template slot="title"
            ><i :class="item.icon"></i><span>{{ item.title }}</span></template
          >
      
            <el-menu-item
             v-if="!val.children"
            v-for="(val, key) in item.children"
            :key="`${val.title}-${key}`"
              :index="`${index}-${key}`"
              @click="funGo(val.path, `${index}-${key}`)"
              >{{ val.title }}</el-menu-item
            >

          <el-submenu
            :index="`${index}-${key}`"
            v-if="val.children"
            v-for="(val, key) in item.children"
            :key="`${val.title}-${key}`"
          >
            <template slot="title">{{ val.title }}</template>
            <el-menu-item
              :index="`${index}-${key}-${num}`"
              v-for="(child, num) in val.children"
              :key="`${child.title}-${num}`"
              @click="funGo(child.path, `${index}-${key}-${num}`)"
              >{{ child.title }}</el-menu-item
            >
          </el-submenu>
        </el-submenu>

        <el-menu-item
          v-if="item.path"
          v-for="(item, index) in menuList"
          :key="`${item.title}-${index}`"
          :index="`${index}`"
          @click="funGo(item.path, `${index}`)"
        >
            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div style="display: flex; justify-content: space-between">
          <i
            :class="[
              { 'el-icon-s-fold': !isCollapse },
              'el-icon-s-unfold',
              'icon-switch',
            ]"
            @click="funSwitch()"
          ></i>
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
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item v-for="item in breadcrumb">{{
          item
        }}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      menuList: [
        {
          title: "导航一",
          icon: "el-icon-message",
          children: [
            {
              title: "选项1",
              path: "/index",
            },
            {
              title: "选项2",
              path: "/about",
            },
            {
              title: "选项3",
              children: [
                {
                  title: "选项3-1",
                  path: "/page1",
                },
              ],
            },
          ],
        },
        {
          title: "导航二",
          icon: "el-icon-menu",
          path: "/page2",
        },
         {
          title: "导航三",
          icon: "el-icon-menu",
          path: "/page2",
        },
      ],
      breadcrumb: [],
      defaultActive: "0-0",
      isCollapse: false,
    };
  },
  methods: {
    funSwitch() {
      this.isCollapse = !this.isCollapse;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    funGo(url, navList) {
      if (url && !window.location.hash.includes(url)) {
        this.$router.push(url);
      }
      this.defaultActive = navList;
      this.pushNav(navList);
    },
    pushNav(navList) {
      this.breadcrumb = [];
      let list = navList.split("-");
      switch (list.length) {
        case 3:
          this.breadcrumb.push(
            this.menuList[list[0]].title,
            this.menuList[list[0]].children[list[1]].title,
            this.menuList[list[0]].children[list[1]].children[list[2]].title
          );
          break;
        case 2:
          this.breadcrumb.push(
            this.menuList[list[0]].title,
            this.menuList[list[0]].children[list[1]].title
          );
          break;
        case 1:
          this.breadcrumb.push(this.menuList[list[0]].title);
          break;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.framework {
  height: 100vh;
  overflow: hidden;
}
.breadcrumb {
  padding: 10px;
}
.icon-switch {
  cursor: pointer;
  font-size: 28px;
  margin-top: 15px;
}
</style>
<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
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
</style>

