<template>
  <div class="pl-19 pr-19">
    <p class="fz-19 mt-10">登录</p>
    <div class="input-wrap mt-10">
      <van-cell-group inset>
        <van-field v-model="username" placeholder="请输入用户名" />
        <van-field v-model="password" placeholder="请输入密码" />
      </van-cell-group>
    </div>

    <div class="flex flex-jsb mt-23">
      <div></div>
      <div>忘记密码</div>
    </div>
    <div class="flex flex-jc mt-10">
      <van-button type="primary" @click="login">登录</van-button>
    </div>
    <div class="flex flex-jc mt-30">
      <span>还没有账号？</span><span class="underline-text" @click="toRegister">去注册</span>
    </div>
    
    <!-- <Component
     :is="renderForm()"
    /> -->
    <!-- <MyForm
      :form-list="formList"
      v-model="fromModelValue"
    />
    {{ fromModelValue }} -->
  </div>



</template>

<script setup lang='ts'>
import { showToast } from 'vant';
import { MyForm} from '../components/form.ts';
import { ref } from 'vue';
import { useRouter } from "vue-router"
import { loginApi } from '../utils/api'
import useUserStore from '../store/modules/useInfo';
const userStore = useUserStore();
const router = useRouter();
const username = ref('');
const password = ref('');
// const isLoading = ref(true)
const login = async () => {
  const res = await loginApi({
    username: username.value,
    password: password.value
  })
  console.log('登录成功----', res)
  userStore.saveToken(res.token)
  showToast('登录成功');
  router.push('/home')
}
const toRegister = () => {
  router.push('/register')
}

const formList = [
   {
    component: 'Field',
    props: {
        label: '用户名',
    },
    ext: {
        key: 'username'
    }
   },
   {
    component: 'Field',
    props: {
        label: '密码',
    },
    ext: {
        key: 'password'
    }
   }
]

const fromModelValue = ref<Record<string, any>>({
  username: 'zs',
  password: '1234'
})
</script>
<style lang="scss" scoped>
@import url('../styles/common.css');

.input-wrap :deep(.van-cell-group) {
  margin: 0;
  border-radius: 0;
}

.van-cell {
  background-color: #F7F8F9;
  margin-bottom: 18px;

}

.van-button--normal {
  width: 300px;
}

.underline-text {
  text-decoration: underline;
  color: #506DFE;
}
</style>