<!--<template>-->
<!--  <div>-->
<!--    <div style="height: 60px; background-color: #fff; display: flex; align-items: center; border-bottom: 1px solid #ddd; position: relative">-->
<!--      <div style="position: absolute; left: 50%; transform: translateX(-50%); text-align: center">-->
<!--        <div style="display: inline-flex; align-items: center">-->
<!--          <img src="@/assets/imgs/logo.png" alt="" style="width: 40px">-->
<!--          <div style="font-weight: bold; font-size: 24px; margin-left: 5px; color: #239113">农产品销售管理系统</div>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div style="width: fit-content; padding-right: 10px; display: flex; align-items: center;">-->
<!--        <img style="width: 40px; height: 40px; border-radius: 50%" :src="data.user.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" alt="">-->
<!--        <span style="margin-left: 5px">{{ data.user.name }}</span>-->
<!--      </div>-->
<!--    </div>-->

<!--    <div style="display: flex">-->
<!--      <div style="width: 200px; border-right: 1px solid #ddd; min-height: calc(100vh - 60px)">-->
<!--        <el-menu-->
<!--            router-->
<!--            style="border: none"-->
<!--            :default-active="router.currentRoute.value.path"-->
<!--            :default-openeds="['/1', '2']"-->
<!--        >-->
<!--          <el-menu-item index="/home">-->
<!--            <el-icon><HomeFilled /></el-icon>-->
<!--            <span>系统首页</span>-->
<!--          </el-menu-item>-->
<!--          <el-menu-item index="/buy" v-if="data.user.role === 'USER'">-->
<!--            <el-icon><Goods /></el-icon>-->
<!--            <span>农产品购买</span>-->
<!--          </el-menu-item>-->
<!--          <el-menu-item index="/orders" >-->
<!--            <el-icon><Tickets /></el-icon>-->
<!--            <span>订单管理</span>-->
<!--          </el-menu-item>-->
<!--          <el-sub-menu index="1" v-if="data.user.role === 'ADMIN'">-->
<!--            <template #title>-->
<!--              <el-icon><Menu /></el-icon>-->
<!--              <span>农产品管理</span>-->
<!--            </template>-->
<!--            <el-menu-item index="/category">-->
<!--              <el-icon><Menu /></el-icon>-->
<!--              <span>农产品分类管理</span>-->
<!--            </el-menu-item>-->
<!--            <el-menu-item index="/goods">-->
<!--              <el-icon><Goods /></el-icon>-->
<!--              <span>农产品管理</span>-->
<!--            </el-menu-item>-->
<!--            <el-menu-item index="/goodsStock">-->
<!--              <el-icon><SoldOut /></el-icon>-->
<!--              <span>农产品进货管理</span>-->
<!--            </el-menu-item>-->
<!--          </el-sub-menu>-->
<!--          <el-menu-item index="/notice" v-if="data.user.role === 'ADMIN'">-->
<!--            <el-icon><Bell /></el-icon>-->
<!--            <span>系统公告管理</span>-->
<!--          </el-menu-item>-->
<!--          <el-sub-menu index="2" v-if="data.user.role === 'ADMIN'">-->
<!--            <template #title>-->
<!--              <el-icon><Memo /></el-icon>-->
<!--              <span>用户管理</span>-->
<!--            </template>-->
<!--            <el-menu-item index="/admin">-->
<!--              <el-icon><User /></el-icon>-->
<!--              <span>管理员信息</span>-->
<!--            </el-menu-item>-->
<!--            <el-menu-item index="/user">-->
<!--            <el-icon><User /></el-icon>-->
<!--            <span>普通用户信息</span>-->
<!--          </el-menu-item>-->
<!--          </el-sub-menu>-->
<!--          <el-menu-item index="/person">-->
<!--            <el-icon><User /></el-icon>-->
<!--            <span>个人资料</span>-->
<!--          </el-menu-item>-->
<!--          <el-menu-item index="/password">-->
<!--            <el-icon><Lock /></el-icon>-->
<!--            <span>修改密码</span>-->
<!--          </el-menu-item>-->
<!--          <el-menu-item index="login" @click="logout">-->
<!--            <el-icon><SwitchButton /></el-icon>-->
<!--            <span>退出系统</span>-->
<!--          </el-menu-item>-->
<!--        </el-menu>-->
<!--      </div>-->

<!--      <div style="flex: 1; width: 0; background-color: #f8f8ff; padding: 10px">-->
<!--        <router-view @updateUser="updateUser" />-->
<!--      </div>-->
<!--    </div>-->

<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import { reactive } from "vue";-->
<!--import router from "@/router";-->
<!--import {ElMessage} from "element-plus";-->

<!--const data = reactive({-->
<!--  user: JSON.parse(localStorage.getItem('system-user') || '{}')-->
<!--})-->

<!--if (!data.user?.id) {-->
<!--  ElMessage.error('请登录！')-->
<!--  router.push('/login')-->
<!--}-->

<!--const updateUser = () => {-->
<!--  data.user = JSON.parse(localStorage.getItem('system-user') || '{}')-->
<!--}-->

<!--const logout = () => {-->
<!--  ElMessage.success('退出成功')-->
<!--  localStorage.removeItem('system-user')-->
<!--  router.push('/login')-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.el-menu-item.is-active {-->
<!--  background-color: #e0edfd !important;-->
<!--}-->
<!--.el-menu-item:hover {-->
<!--  color: #1967e3;-->
<!--}-->
<!--:deep(th)  {-->
<!--  color: #333;-->
<!--}-->
<!--</style>-->


<template>
  <div class="app-container">
    <!-- 顶部导航栏 -->
    <header class="app-header">
      <div class="header-title">
        <img src="@/assets/imgs/logo.png" alt="系统logo" class="logo-image" />
        <div class="title-text">田枢智售</div>
      </div>

      <div class="user-profile">
        <img
            :src="data.user.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
            alt="用户头像"
            class="avatar-image"
        />
        <span class="user-name">{{ data.user.name }}</span>
        <el-icon class="user-dropdown-icon"><CaretBottom /></el-icon>
      </div>
    </header>

    <!-- 顶部菜单 -->
    <nav class="top-menu">
      <el-menu
          router
          class="custom-top-menu"
          :default-active="router.currentRoute.value.path"
          :default-openeds="['1', '2']"
          background-color="#f5f7fa"
          text-color="#333"
          active-text-color="#239113"
          mode="horizontal"
      >
        <el-menu-item index="/home">
          <el-icon><HomeFilled /></el-icon>
          <span>系统首页</span>
        </el-menu-item>

        <el-menu-item index="/buy" v-if="data.user.role === 'USER'">
          <el-icon><Goods /></el-icon>
          <span>农产品购买</span>
        </el-menu-item>

        <el-menu-item index="/orders">
          <el-icon><Tickets /></el-icon>
          <span>订单管理</span>
        </el-menu-item>

        <el-sub-menu index="1" v-if="data.user.role === 'ADMIN'">
          <template #title>
            <el-icon><Menu /></el-icon>
            <span>农产品管理</span>
          </template>
          <el-menu-item index="/category">
            <el-icon><Menu /></el-icon>
            <span>农产品分类管理</span>
          </el-menu-item>
          <el-menu-item index="/goods">
            <el-icon><Goods /></el-icon>
            <span>农产品管理</span>
          </el-menu-item>
          <el-menu-item index="/goodsStock">
            <el-icon><SoldOut /></el-icon>
            <span>农产品进货管理</span>
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item index="/notice" v-if="data.user.role === 'ADMIN'">
          <el-icon><Bell /></el-icon>
          <span>系统公告管理</span>
        </el-menu-item>

        <el-sub-menu index="2" v-if="data.user.role === 'ADMIN'">
          <template #title>
            <el-icon><Memo /></el-icon>
            <span>用户管理</span>
          </template>
          <el-menu-item index="/admin">
            <el-icon><User /></el-icon>
            <span>管理员信息</span>
          </el-menu-item>
          <el-menu-item index="/user">
            <el-icon><User /></el-icon>
            <span>普通用户信息</span>
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item index="/person">
          <el-icon><User /></el-icon>
          <span>个人资料</span>
        </el-menu-item>

        <el-menu-item index="/password">
          <el-icon><Lock /></el-icon>
          <span>修改密码</span>
        </el-menu-item>

        <el-menu-item index="/AI" v-if="data.user.role === 'USER'">
          <el-icon><Connection /></el-icon>
          <span>问问AI</span>
        </el-menu-item>

        <el-menu-item index="login" @click="logout">
          <el-icon><SwitchButton /></el-icon>
          <span>退出系统</span>
        </el-menu-item>
      </el-menu>
    </nav>

    <!-- 主内容区 -->
    <div class="main-content">
      <!-- 内容区 -->
      <div class="content-wrapper">
        <router-view @updateUser="updateUser" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import router from "@/router";
import { ElMessage } from "element-plus";
import { CaretBottom } from "@element-plus/icons-vue";

const data = reactive({
  user: JSON.parse(localStorage.getItem('system-user') || '{}')
})

// 检查登录状态
onMounted(() => {
  if (!data.user?.id) {
    ElMessage.error('请登录！')
    router.push('/login')
  }
})

// 更新用户信息
const updateUser = () => {
  data.user = JSON.parse(localStorage.getItem('system-user') || '{}')
}

// 退出登录
const logout = () => {
  ElMessage.success('退出成功')
  localStorage.removeItem('system-user')
  router.push('/login')
}
</script>

<style scoped>
/* 整体布局 */
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

/* 顶部导航栏 */
.app-header {
  height: 60px;
  background: linear-gradient(90deg, #239113 0%, #4cd964 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 10;
}

.header-title {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.logo-image {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.logo-image:hover {
  transform: scale(1.1);
}

.title-text {
  font-weight: bold;
  font-size: 24px;
  margin-left: 10px;
  background: linear-gradient(90deg, #ffffff 0%, #f0f0f0 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.user-profile {
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 5px 10px;
  border-radius: 20px;
}

.user-profile:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.avatar-image {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.user-profile:hover .avatar-image {
  border-color: white;
}

.user-name {
  margin-left: 8px;
  font-weight: 500;
}

.user-dropdown-icon {
  margin-left: 5px;
  transition: transform 0.3s ease;
}

.user-profile:hover .user-dropdown-icon {
  transform: rotate(180deg);
}

/* 顶部菜单 */
.top-menu {
  background-color: #f5f7fa;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 9;
}

.custom-top-menu {
  border-bottom: none !important;
  justify-content: center !important;
}

.custom-top-menu .el-menu-item,
.custom-top-menu .el-sub-menu__title {
  height: 50px !important;
  line-height: 50px !important;
  border-radius: 8px !important;
  margin: 0 5px !important;
  transition: all 0.3s ease !important;
  position: relative !important;
  overflow: hidden !important;
}

.custom-top-menu .el-menu-item::before,
.custom-top-menu .el-sub-menu__title::before {
  content: '' !important;
  position: absolute !important;
  left: 0 !important;
  bottom: 0 !important;
  height: 3px !important;
  width: 100% !important;
  background-color: #239113 !important;
  transform: scaleX(0) !important;
  transform-origin: left center !important;
  transition: transform 0.3s ease !important;
}

.custom-top-menu .el-menu-item.is-active::before,
.custom-top-menu .el-sub-menu__title.is-active::before,
.custom-top-menu .el-menu-item:hover::before,
.custom-top-menu .el-sub-menu__title:hover::before {
  transform: scaleX(1) !important;
}

.custom-top-menu .el-menu-item.is-active {
  background-color: rgba(35, 145, 19, 0.05) !important;
  color: #239113 !important;
  font-weight: 500 !important;
}

.custom-top-menu .el-menu-item:hover,
.custom-top-menu .el-sub-menu__title:hover {
  background-color: rgba(35, 145, 19, 0.05) !important;
  color: #239113 !important;
}

.custom-top-menu .el-menu-item i,
.custom-top-menu .el-sub-menu__title i {
  font-size: 18px !important;
  margin-right: 5px !important;
  transition: transform 0.3s ease !important;
}

.custom-top-menu .el-menu-item:hover i,
.custom-top-menu .el-sub-menu__title:hover i {
  transform: translateY(-3px) !important;
}

/* 主内容区 */
.main-content {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* 内容区 */
.content-wrapper {
  flex: 1;
  overflow-y: auto;
  background-color: #f8f9fa;
  padding: 20px;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .custom-top-menu .el-menu-item span,
  .custom-top-menu .el-sub-menu__title span {
    font-size: 12px !important;
  }

  .custom-top-menu .el-menu-item i,
  .custom-top-menu .el-sub-menu__title i {
    font-size: 16px !important;
  }
}

@media (max-width: 768px) {
  .top-menu {
    display: none;
  }

  .title-text {
    font-size: 20px;
  }
}
</style>