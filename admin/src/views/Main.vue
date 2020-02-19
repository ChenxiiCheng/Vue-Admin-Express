<template>
  <el-container style="height: 100vh;">
    <el-aside width="260px" style="background-color: rgb(238, 241, 246)">
      <el-menu router :default-openeds="['1']" unique-opened :default-active="$route.path">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>内容管理 / Content Manager
          </template>
          <el-menu-item-group>
            <template slot="title">物品 / Item</template>
            <el-menu-item index="/items/create">新建物品 / Create Item</el-menu-item>
            <el-menu-item index="/items/list">物品列表 / Item List</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">英雄 / Champion</template>
            <el-menu-item index="/heroes/create">新建英雄 / Create Champion</el-menu-item>
            <el-menu-item index="/heroes/list">英雄列表 / Champion List</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">文章 / Article</template>
            <el-menu-item index="/articles/create">新建文章 / Create Article</el-menu-item>
            <el-menu-item index="/articles/list">文章列表 / Article List</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-message"></i>运营管理 / Manage
          </template>

          <el-menu-item-group>
            <template slot="title">广告位 / Advertise</template>
            <el-menu-item index="/ads/create">新建广告 / Create Advertise</el-menu-item>
            <el-menu-item index="/ads/list">广告列表 / Advertise List</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-message"></i>系统设置 / System
          </template>
          <el-menu-item-group>
            <template slot="title">分类 / Category</template>
            <el-menu-item index="/categories/create">新建分类 / Create Category</el-menu-item>
            <el-menu-item index="/categories/list">分类列表 / Category List</el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group>
            <template slot="title">管理员 / Admin User</template>
            <el-menu-item index="/admin_users/create">新建管理员 / Create Admin User</el-menu-item>
            <el-menu-item index="/admin_users/list">管理员列表 / Admin User List</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 15px">
        <span style="color: white; margin-right: 30px;">Welcome</span>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(20).fill(item)
    };
  }
};
</script>
