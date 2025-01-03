<template>
  <div class="login-register-container">
    <el-tabs v-model="activeTab" type="card">
      <el-tab-pane label="登录" name="login">
        <el-form :model="loginForm" @submit.native.prevent="login">
          <el-form-item>
            <el-input v-model="loginForm.email" placeholder="邮箱" prefix-icon="el-icon-mobile"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="loginForm.password" type="password" placeholder="密码" prefix-icon="el-icon-lock"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="注册" name="register">
        <el-form :model="registerForm" @submit.native.prevent="register">
          <el-form-item>
            <el-input v-model="registerForm.email" placeholder="邮箱" prefix-icon="el-icon-mobile"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="registerForm.password" type="password" placeholder="密码" prefix-icon="el-icon-lock"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="register">注册</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <div class="social-login">
      <span>社交账号登录</span>
      <el-divider></el-divider>
      <div class="social-icons">
        <el-button icon="el-icon-wechat" circle></el-button>
        <el-button icon="el-icon-qq" circle></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      activeTab: 'login',
      loginForm: {
        email: '',
        password: '',
      },
      registerForm: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      axios.post('http://localhost:8080/auth/wxLogin', this.loginForm)
        .then(response => {
          console.log('Login successful', response.data);
        })
        .catch(error => {
          console.error('Login failed', error);
        });
    },
    register() {
      axios.post('http://localhost:8080/auth/register', this.registerForm)
        .then(response => {
          console.log('Registration successful', response.data);
        })
        .catch(error => {
          console.error('Registration failed', error);
        });
    },
  },
};
</script>

<style scoped>
.login-register-container {
  width: 400px;
  margin: 100px auto;
  padding: 30px;
  border: 1px solid #ebeef5;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.el-tabs__header {
  justify-content: center;
}
.el-form-item {
  margin-bottom: 20px;
}
.el-button {
  width: 100%;
}
.social-login {
  text-align: center;
  margin-top: 20px;
}
.social-icons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
}
</style>