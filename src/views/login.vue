<template>
    <div class="login-container">
        <div class='login-wrp'>
            <div class="login-form">
                <el-form ref="loginForm" :model="form" :rules="rules">
                    <el-form-item prop="mobile">
                        <el-input v-model="form.mobile" placeholder="请输入手机号" />
                        <span class="login-form__input-ic">
                            <svg-icon :icon-class="'login_account'" />
                        </span>
                    </el-form-item>
                    <el-form-item class="login-form__password" prop="password">
                        <el-input v-model="form.password" placeholder="请输入密码" :type="passwordType"
                            @keyup.enter.native="handleLogin" />
                        <span class="login-form__input-ic">
                            <svg-icon :icon-class="'login_pwd'" />
                        </span>
                        <span class="login-form__show-pwd" @click="showPwd">
                            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                        </span>
                    </el-form-item>
                    <el-form-item>
                        <div class="login-form__operate">
                            <el-button class="login-form__btn" type="primary" :loading="loading" @click="handleLogin()">
                                登录
                            </el-button>
                            <div class="login-form__register-forget">
                                <el-button type="text" @click="goForgetPwd">忘记密码</el-button>
                            </div>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                mobile: '',
                password: ''
            },
            rules: {
                mobile: [{ required: true, trigger: 'blur', message: '请输入手机号' }],
                password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
            },
            passwordType: 'password',
            loading: false
        };
    },
    methods: {
        handleLogin() {
            this.$refs['loginForm'].validate(valid => {
                if (valid) {
                    this.loading = true;
                }
            });
        },
        showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = '';
            } else {
                this.passwordType = 'password';
            }
        },
        goRegister() {

        },
        goForgetPwd() {

        }
    }
};
</script>

<style lang="less">
.login-container {
    background: #f3f3fa;
    height: 100%;
    background: red // background-size: cover;
}
.login-wrp {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 440px;
    height: 437px;
    padding: 39px 65px 40px;
    background: #ffffff;
    box-shadow: 0 8px 40px 0 rgba(0, 0, 0, 0.04);
    border-radius: 20px;
}
</style>

<style lang="less" scoped>
.login-form {
    margin-top: 48px;

    &__operate {
        margin-top: 20px;
    }

    &__btn {
        width: 100%;
        height: 40px;
        background: #70cccc;
        box-shadow: 0px 4px 10px 0px rgba(112, 204, 204, 0.5);
        border-radius: 20px;
    }

    &__password {
        position: relative;
    }

    &__input-ic {
        padding: 0 10px;
        cursor: pointer;
        position: absolute;
        display: block;
        left: 10px;
        top: 0;
    }

    &__show-pwd {
        padding: 0 10px;
        cursor: pointer;
        position: absolute;
        display: block;
        right: 10px;
        top: 0;
    }

    &__register-forget {
        display: flex;
        justify-content: flex-end;
        font-size: 14px;
        font-weight: 400;
        color: #70cccc;
    }
}

/deep/ .el-input__inner {
    border-radius: 20px;
    border: 1px solid #70cccc;
    padding-left: 46px;
}

/deep/ .el-button--primary {
    border: none;
}

/deep/ .el-button--text {
    color: #70cccc;
}
</style>
