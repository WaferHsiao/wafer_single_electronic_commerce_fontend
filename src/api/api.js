import { getAction, deleteAction, putAction, postAction, httpAction } from '@/api/manage'

//首页-登录注册
const login = (params)=>postAction("auth/login",params);
const register = (params)=>postAction("auth/register",params);



export{
    login,
    register
}