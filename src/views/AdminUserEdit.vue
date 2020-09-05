<template>
  <div class="about">
    <h1>{{id ? '编辑':'新建'}}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model.trim="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model.trim="model.password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AdminUserEdit",
  data() {
    return {
      model: {},
      parents: []
    }
  },
  props: ['id'],
  created() {
    this.id && this.fetch()
  },
  methods: {
    async save() {
      let res
      if (this.id) {
        res = await this.$http.put(`rest/admin_users/${this.id}`,this.model)
      }else {
        res = await this.$http.post('rest/admin_users',this.model)
      }
      if (res.status === 200) {
        this.$router.push('/admin_users/list')
        this.$message({
          type:"success",
          message: '保存成功'
        })
      }else {
        this.$message({
          type:"error",
          message: '保存失败'
        })
      }
    },
    async fetch() {
      const {data} = await this.$http.get(`rest/admin_users/${this.id}`)
      console.log(data)
      this.model = data
    }
  }
}
</script>

<style scoped>

</style>