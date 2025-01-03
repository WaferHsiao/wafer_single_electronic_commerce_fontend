<template>
  <div class="register-container">
    <div class="register-form">
      <h2 class="title">HELLO AI</h2>
      <el-form :model="registerForm" :rules="rules" ref="registerForm" @submit.native.prevent="register" label-width="100px">
        <el-form-item label="Email" prop="email">
          <el-input v-model="registerForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register">Register</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      registerForm: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          { required: true, message: 'Please input email', trigger: 'blur' },
          { type: 'email', message: 'Please input a valid email address', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: 'Please input password', trigger: 'blur' },
          { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' }
        ],
      },
    };
  },
  methods: {
    register() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          axios.post('http://localhost:8080/auth/register', this.registerForm)
            .then(response => {
              // Handle success, e.g., notify user, redirect, etc.
              console.log('Registration successful', response.data);
              this.$message.success('Registration successful');
            })
            .catch(error => {
              // Handle error
              console.error('Registration failed', error);
              this.$message.error('Registration failed');
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.register-form {
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
}

.title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-button {
  width: 100%;
}
</style>