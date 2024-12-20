<template>
    <div class="pl-19 pr-19">
        <p class="fz-24">注册</p>
        <p class="fz-18 font-tip">没有账号？现在开始注册</p>
        <div class="input-wrap mt-56">
            <van-cell-group inset>
                <van-field v-model="username" placeholder="请输入用户名" />
                <van-field v-model="password" placeholder="请输入密码" />
                <van-field v-model="repassword" placeholder="请再次输入密码" />
                <van-field v-model="email" placeholder="请输入邮箱" />
                <div class="flex flex-hc">
                    <van-field v-model="vcode" placeholder="请输入验证码" />
                    <div @click="clickGetVcode" class="getVcode-btn" v-if="!isShowCode">
                        <span>获取验证码</span>
                    </div>
                    <div class="getVcode-btn code" v-if="isShowCode">
                        <span>{{ codeNum }}s</span>
                    </div>
                </div>
            </van-cell-group>
        </div>
        <div class="flex flex-hc flex-jc mt-24">
            <div class="btn-b mr-20" @click="goBack">返回</div>
            <div class="btn-r" @click="clickRegister">注册</div>
        </div>
    </div>



</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { showToast } from 'vant';
import { registerApi, sendCodeApi } from '../utils/api'
import { useRouter } from "vue-router"
const router = useRouter();
const username = ref('');
const password = ref('');
const repassword = ref('');
const vcode = ref('')
const email = ref('');
const codeNum = ref(60)
const isShowCode = ref(false);
const goBack = () => {
    router.back()
}
const clickGetVcode = () => {
    codeNum.value = 60
    isShowCode.value = true
    setInterval(() => {
        codeNum.value--
        if (codeNum.value == 0) {
            isShowCode.value = false
        }
    }, 1000)
    sendCode()
}
const sendCode = async () => {
    const res = await sendCodeApi({
        email: email.value,
    })
    if (res) {
        console.log('验证码发送成功', res)
        showToast('验证码发送成功');
    }
}
const clickRegister = async () => {
    if (!username.value) {
        showToast('用户名不能为空');
        return
    }
    if (!password.value) {
        showToast('密码不能为空');
        return
    }
    if (!repassword.value) {
        showToast('请再次输入密码');
        return
    }
    if (password.value !== repassword.value) {
        showToast('两次密码输入不一致，请再次输入');
        return
    }
    if (!email.value) {
        showToast('网易邮箱不能为空');
        return
    }
    if (!vcode.value) {
        showToast('验证码不能为空');
        return
    }
    const res = await registerApi({
        username: username.value,
        password: password.value,
        email: email.value,
        code: vcode.value
    })
    if (res) {
        console.log('注册成功', res)
        showToast('注册成功');
        router.push('/')
    }

}
</script>
<style lang="scss" scoped>
@import url('../styles/common.css');

.font-tip {
    color: #939393;
    // font-family: 苹方-简;
}

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

.btn-b {
    width: 122px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    border-radius: 5px;
    font-size: 16px;
    background: #fff;
    box-shadow: 0px 4px 10px 0px #00000049;
}

.btn-r {
    width: 144px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    border-radius: 5px;
    font-size: 16px;
    color: #fff;
    background: #506DFE;
    box-shadow: 0px 4px 10px 0px #00000049;
}

.getVcode-btn {
    width: 120px;
    height: 30px;
    font-size: 16px;
    color: #fff;
    background: #506DFE;
    text-align: center;
    line-height: 30px;
    margin-bottom: 18px;
    margin-left: 10px;
}

.code {
    background: #eee;
    color: #00000049;
}
</style>