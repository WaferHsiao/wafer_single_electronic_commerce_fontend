<template>
<div class="container">
    <el-card class="form-card">
      <div style="text-align: center; font-size: 20px; margin-bottom: 20px;">
        {{isLogin ? '登录' : '注册'}}
      </div>
      <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item class = "button_item">
          <el-button type="primary" @click="submitForm" style="width: 100px;">
            {{isLogin?'登录':'注册'}}
          </el-button>
        </el-form-item>
        <el-form-item class = "button_item">
          <el-button type="text" @click="toggleForm">
            切换为{{isLogin?'注册':'登录'}}
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
</div>
</template>

<script setup>
import {reactive , ref } from 'vue';
import {ElMessage} from 'element-plus';
import axios from 'axios';

const isLogin = ref(true);
const formRef = ref();

const form = reactive({
  username:'',
  password:''
});

const rules = {
  username:[{require:true,message:'请输入用户名',trigger:'blur'}],
  password:[{require:true,message:'请输入密码',trigger:'blur'}]
};

const toggleForm = () => {
  isLogin.value = !isLogin.value;
  form.username = '';
  form.password = '';
};

const submitForm = () => {
  formRef.value.validate(async valid => {
    if(!valid) {
      return;
    }

    const url = isLogin.value ? '/api/login' : '/api/register';
    try{
      const response = await axios.post(url,form);
      ElMessage.success(response.data.message || (isLogin.value ? '登录成功':'注册成功'));
      //登录成功后跳转
      if(isLogin.value){
        window.location.href = '/Home';
      }
    }catch (error){
      ElMessage.error(error.response?.data?.message || '操作失败');
    }
  })
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.form-card {
  width: 400px;
  padding: 30px 20px;
}

.button_item {
  display: flex;
  justify-content: center;
}




</style>