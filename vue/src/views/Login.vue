<!--<template>-->
<!--  <div class="login-container">-->
<!--    <div style="color: #2367bf; font-size: 70px; font-weight: bold; position: absolute; text-align: center; top: 50px">农产品销售系统</div>-->
<!--    <div class="login-box">-->
<!--      <div style="font-weight: bold; font-size: 24px; text-align: center; margin-bottom: 30px; color: #1450aa">欢 迎 登 录</div>-->
<!--      <el-form :model="data.form"  ref="formRef" :rules="data.rules">-->
<!--        <el-form-item prop="username">-->
<!--          <el-input :prefix-icon="User" size="large" v-model="data.form.username" placeholder="请输入账号" />-->
<!--        </el-form-item>-->
<!--        <el-form-item prop="password">-->
<!--          <el-input :prefix-icon="Lock" size="large" v-model="data.form.password" placeholder="请输入密码" show-password />-->
<!--        </el-form-item>-->
<!--        <el-form-item prop="role">-->
<!--          <el-select size="large" style="width: 100%" v-model="data.form.role">-->
<!--            <el-option value="ADMIN" label="管理员"></el-option>-->
<!--            <el-option value="USER" label="普通用户"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <el-button size="large" type="primary" style="width: 100%" @click="login">登 录</el-button>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      <div style="text-align: right;">-->
<!--        还没有账号？请 <a href="/register">注册</a>-->
<!--      </div>-->
<!--    </div>-->

<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--  import { reactive, ref } from "vue";-->
<!--  import { User, Lock } from "@element-plus/icons-vue";-->
<!--  import request from "@/utils/request";-->
<!--  import {ElMessage} from "element-plus";-->
<!--  import router from "@/router";-->

<!--  const data = reactive({-->
<!--    form: { role: 'ADMIN' },-->
<!--    rules: {-->
<!--      username: [-->
<!--        { required: true, message: '请输入账号', trigger: 'blur' },-->
<!--      ],-->
<!--      password: [-->
<!--        { required: true, message: '请输入密码', trigger: 'blur' },-->
<!--      ],-->
<!--    }-->
<!--  })-->

<!--  const formRef = ref()-->

<!--  // 点击登录按钮的时候会触发这个方法-->
<!--  const login = () => {-->
<!--    formRef.value.validate((valid => {-->
<!--      if (valid) {-->
<!--        // 调用后台的接口-->
<!--        request.post('/login', data.form).then(res => {-->
<!--          if (res.code === '200') {-->
<!--            ElMessage.success("登录成功")-->
<!--            router.push('/')-->
<!--            localStorage.setItem('system-user', JSON.stringify(res.data))-->
<!--          } else {-->
<!--            ElMessage.error(res.msg)-->
<!--          }-->
<!--        })-->
<!--      }-->
<!--    })).catch(error => {-->
<!--      console.error(error)-->
<!--    })-->
<!--  }-->

<!--</script>-->

<!--<style scoped>-->
<!--.login-container {-->
<!--  height: 100vh;-->
<!--  overflow:hidden;-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--  background-image: url("@/assets/imgs/bg.png");-->
<!--  background-size: cover;-->
<!--}-->
<!--.login-box {-->
<!--  width: 350px;-->
<!--  padding: 50px 30px;-->
<!--  border-radius: 5px;-->
<!--  box-shadow: 0 0 10px rgba(0, 0, 0,.1);-->
<!--  background-color: rgba(255, 255, 255, .8);-->
<!--}-->
<!--</style>-->


<template>
  <div class="login-container">
    <div class="cool-title">农产品销售系统</div>
    <div class="login-box">
      <div class="welcome-title">欢 迎 登 录</div>
      <el-form :model="data.form" ref="formRef" :rules="data.rules">
        <el-form-item prop="username">
          <el-input :prefix-icon="User" size="large" v-model="data.form.username" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input :prefix-icon="Lock" size="large" v-model="data.form.password" placeholder="请输入密码" show-password />
        </el-form-item>
        <el-form-item prop="role">
          <el-select size="large" style="width: 100%" v-model="data.form.role">
            <el-option value="ADMIN" label="管理员"></el-option>
            <el-option value="USER" label="普通用户"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="large" type="primary" style="width: 100%" @click="login">登 录</el-button>
        </el-form-item>
      </el-form>
      <div class="register-link">
        还没有账号？请 <a href="/register">注册</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
import request from "@/utils/request";
import { ElMessage } from "element-plus";
import router from "@/router";

const data = reactive({
  form: { role: 'ADMIN' },
  rules: {
    username: [
      { required: true, message: '请输入账号', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
    ],
  }
})

const formRef = ref()

const login = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      request.post('/login', data.form).then(res => {
        if (res.code === '200') {
          ElMessage.success("登录成功")
          router.push('/')
          localStorage.setItem('system-user', JSON.stringify(res.data))
        } else {
          ElMessage.error(res.msg)
        }
      })
    }
  }).catch(error => {
    console.error(error)
  })
}

onMounted(() => {
  startTitleAnimation();
});

const startTitleAnimation = () => {
  const title = document.querySelector('.cool-title');
  if (title) {
    title.animate([
      { textShadow: '0 0 5px rgba(255,255,255,0.5), 0 0 10px rgba(255,255,255,0.3)' },
      { textShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.5), 0 0 30px rgba(46, 204, 113, 0.7)' }
    ], {
      duration: 2000,
      easing: 'ease-in-out',
      iterations: Infinity,
      direction: 'alternate'
    });
  }
};
</script>

<style scoped>
.login-container {
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("@/assets/imgs/bg.png");
  background-size: cover;
  position: relative;
}

/* 虚化透明登录框 */
.login-box {
  width: 380px;
  padding: 60px 40px;
  border-radius: 12px;
  backdrop-filter: blur(10px); /* 毛玻璃效果 */
  -webkit-backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.15); /* 半透明背景 */
  border: 1px solid rgba(255, 255, 255, 0.3); /* 透明边框 */
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15); /* 渐变阴影 */
  position: relative;
  z-index: 10;
  transition: all 0.3s ease;
}

.login-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.2);
}

.cool-title {
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 70px;
  font-weight: 900;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  background-image: linear-gradient(135deg, #2ecc71, #27ae60, #f39c12, #f1c40f);
  text-shadow: 0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(46, 204, 113, 0.5);
  letter-spacing: 2px;
  text-align: center;
  animation: pulse 3s infinite;
  z-index: 20;
}

@keyframes pulse {
  0% {
    transform: translateX(-50%) scale(1);
  }
  50% {
    transform: translateX(-50%) scale(1.05);
  }
  100% {
    transform: translateX(-50%) scale(1);
  }
}

.cool-title:hover {
  text-shadow: 0 0 15px rgba(255,255,255,0.8), 0 0 30px rgba(46, 204, 113, 0.8), 0 0 45px rgba(243, 156, 18, 0.7);
  animation: none;
}

/* 欢迎登录样式 */
.welcome-title {
  font-weight: bold;
  font-size: 28px;
  text-align: center;
  margin-bottom: 35px;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  padding-bottom: 15px;
}

.welcome-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #2ecc71, #f39c12);
  border-radius: 3px;
}

/* 注册链接样式 */
.register-link {
  text-align: right;
  margin-top: 20px;
}

.register-link a {
  color: #2ecc71;
  text-decoration: none;
  transition: color 0.3s;
  display: inline-flex;
  align-items: center;
}

.register-link a:hover {
  color: #f39c12;
}

.register-link a::before {
  content: '';
  display: inline-block;
  width: 16px;
  height: 16px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%232ecc71' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'%3E%3C/path%3E%3Crect x='8' y='2' width='8' height='4' rx='1' ry='1'%3E%3C/rect%3E%3C/svg%3E");
  margin-right: 6px;
  vertical-align: middle;
}
</style>