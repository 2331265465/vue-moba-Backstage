<template>
  <div>
    <h1>物品列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="220"></el-table-column>
      <el-table-column prop="name" label="物品名称" width="120"></el-table-column>
      <el-table-column prop="icon" label="图标" width="120">
        <template slot-scope="scope">
          <img :src="scope.row.icon" :alt="scope.row.name">
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button
              type="primary"
              size="small"
              @click="$router.push(`/items/edit/${scope.row._id}`)">
            编辑
          </el-button>
          <el-button
              type="danger"
              size="small"
              @click="remove(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  name: "ItemList",
  data() {
    return {
      items: []
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const {data,status} = await this.$http.get('rest/items')
      if (status === 200) {
        this.items = data
      }
    },
    async remove(row){
      try {
        await this.$confirm(`是否要删除该分类"${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await this.$http.delete(`rest/items/${row._id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        await this.fetch()
      }catch {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      }
    }
  }
}
</script>

<style scoped>

</style>