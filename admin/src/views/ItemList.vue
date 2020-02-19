<template>
  <div class="about">
    <h1>物品列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="300"></el-table-column>
      <el-table-column prop="name" label="物品名称"></el-table-column>
      <el-table-column prop="icon" label="图标">
        <template slot-scope="scope">
          <img :src="scope.row.icon" style="height: 3rem;" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            @click="$router.push(`/items/edit/${scope.row._id}`)"
            type="primary"
            size="small"
            >EDIT</el-button
          >
          <el-button @click="remove(scope.row)" type="danger" size="small"
            >DELETE</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('/rest/items');
      this.items = res.data;
    },
    async remove(row) {
      this.$confirm(`是否确定要删除分类？"${row.name}"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`/rest/items/${row._id}`);
        this.$message({
          type: 'success',
          message: 'Success!'
        });
        this.fetch();
      });
    }
  },
  created() {
    this.fetch();
  }
};
</script>
