<template>
  <div class="login-container">
    <el-card header="Login" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="Username">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="secondary" native-type="submit" size="small"
            >LOGIN</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post('/login', this.model);
      localStorage.token = res.data.token;
      this.$router.push('/');
      this.$message({
        type: 'success',
        message: '登录成功'
      });
    }
  }
};
</script>

<style>
.login-card {
  margin: 9rem auto;
  width: 25rem;
}
</style>
