<template>
<el-card class="login-card">
  <div style="text-align: center; font-size: 20px; margin-bottom:20px;">
    {{isRegister?'注册' : '登录'}}
  </div>
  <el-form :model="form" label-width="100px">
    <el-form-item label="email">
      <el-input v-model="form.email"></el-input>
    </el-form-item>
    <el-form-item label="password">
      <el-input type= "password" v-model="form.password"></el-input>
    </el-form-item>

    <!-- 只有注册时才显示-->
    <el-form-item v-if="isRegister" label="ConfirmPssword">
      <el-input type="password" v-model="form.confirmPassword"></el-input>
    </el-form-item>

    <el-form-item>
      <div class="btn-container">
      <el-button type="primary" @click="handleSubmit">
        {{isRegister ? '注册': '登录'}}
      </el-button>
        <el-link type="primary" @click="isRegister = !isRegister">
          {{isRegister ? '已有账号？去登录' : '没有账号，去注册'}}
        </el-link>
      </div>
    </el-form-item>
  </el-form>
</el-card>
</template>


<script setup>
import {reactive,ref} from 'vue'
import { login , register } from '@/api/api'
import {ElMessage} from "element-plus";

const isRegister = ref(false) //false登录  true注册
const form = reactive({
  email: '',
  password: '',
  confirmPassword: ''
})

const handleSubmit = () => {
  if(isRegister.value){
    register(form)
        .then(res=>{
          console.log('注册返回信息',res)
          if(res.data.code != 200){
            ElMessage.error(res.data.message)
          }else{
            ElMessage.success('注册成功！')
          }
        })
        .catch(() => {
          ElMessage.error('请求失败，请检查网络')
        })
    console.log('注册信息',form)

  }else{
    login(form)
        .then(res=>{
          console.log('登录返回信息',res)
          if(res.data.code != 200){
            ElMessage.error(res.data.message)
          }else{
            ElMessage.success('登录成功！')
          }
        })
        .catch(() => {
          ElMessage.error('请求失败，请检查网络')
        })
    console.log('登录信息',form)
  }
}
</script>

<style scoped>
.login-card{
  width: 400px;
  margin: 100px auto;
  padding: 20px;
}

.btn-container {
  display: flex;
  flex-direction: column; /* 纵向排列：按钮在上，文字在下 */
  align-items: center;   /* 居中对齐 */
}
</style>