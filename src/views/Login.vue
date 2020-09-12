<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      model: {
        username: 'admin',
        password: '123456'
      }
    }
  },
  methods:{
    async login() {
      const {data} = await this.$http.post('login',this.model)
      localStorage.token = data.token
      this.$router.push('/')
      this.$message.success('登陆成功')
    }
  }
}
</script>

<style scoped>
.login-container {
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-card {
  width: 50vw;
}
</style>