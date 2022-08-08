<template>
  <div class="login-container">
    <div class="login-wrp">
      <h1>登录</h1>
      <div class="login-form">
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item prop="account">
            <el-input v-model="form.account" placeholder="请输入账号" />
          </el-form-item>
          <el-form-item class="login-form-password" prop="password">
            <el-input
              v-model="form.password"
              placeholder="请输入密码"
              :type="passwordType"
              @keyup.enter.native="handleLogin"
            />
          </el-form-item>
          <el-form-item>
            <div class="login-form-operate">
              <el-button
                class="login-form-btn"
                type="primary"
                :loading="loading"
                @click="handleLogin()"
              >
                登录
              </el-button>
              <div class="login-form-register-forget">
                <el-button type="text" @click="goForgetPwd">忘记密码</el-button>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog
      class="dialog-forget"
      title="忘记密码"
      :visible.sync="dialogVisible"
      width="40%"
      center
    >
      <div>
        <el-form
          ref="dialogForm"
          :rules="dialogRules"
          :model="dialogForm"
          label-width="30%"
        >
          <el-form-item label="账号：" prop="account">
            <el-input
              maxlength="11"
              v-model.trim="dialogForm.account"
              placeholder="请输入账号"
              size="small"
              class="input"
              style="width: 250px"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码：" prop="password1">
            <el-input
              type="password"
              style="width: 250px"
              v-model.trim="dialogForm.password1"
              placeholder="请输入新密码"
              size="small"
              class="input"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码确认：" prop="password2">
            <el-input
              type="password"
              style="width: 250px"
              v-model.trim="dialogForm.password2"
              placeholder="请输入新密码"
              size="small"
              class="input"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="dialogSubmit()"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var passWordRule = (rule, value, callback) => {
      if (value !== this.dialogForm.password1) {
        return callback(new Error("新密码不一致"));
      } else {
        callback();
      }
    };
    return {
      form: {
        account: "",
        password: "",
      },
      rules: {
        account: [{ required: true, trigger: "blur", message: "请输入账号" }],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
      },
      passwordType: "password",
      loading: false,
      dialogVisible: false,
      dialogForm: {
        account: "",
        password1: "",
        password2: "",
      },
      dialogRules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],

        password1: [
          { required: true, message: "请输入新密码", trigger: "blur" },
        ],
        password2: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          {
            validator: passWordRule,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    dialogSubmit() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          //调接口
        } else {
          return false;
        }
      });
    },
    handleLogin() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          //调接口,成功后loading置为false
        }
      });
    },
 
    goForgetPwd() {
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="less">
.login-container {
  background: #70cccc;
  width: 100vw;
  height: 100vh;
}
.login-wrp {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 440px;
  height: 300px;
  padding: 39px 65px 40px;
  background: #ffffff;
  box-shadow: 0 8px 40px 0 rgba(0, 0, 0, 0.04);
  border-radius: 20px;
}
</style>

<style lang="less" scoped>
.login-form {
  margin-top: 48px;

  .login-form-operate {
    margin-top: 20px;
  }

  .login-form-btn {
    width: 100%;
    height: 40px;
    background: #70cccc;
    box-shadow: 0px 4px 10px 0px rgba(112, 204, 204, 0.5);
    border-radius: 20px;
  }

  .login-form-password {
    position: relative;
  }

  .login-form-register-forget {
    display: flex;
    justify-content: flex-end;
    font-size: 14px;
    font-weight: 400;
    color: #70cccc;
  }
}

::v-deep .el-input__inner {
  border-radius: 20px;
  border: 1px solid #70cccc;
}

::v-deep .el-button--primary {
  border: none;
  background-color:#70cccc;
}

::v-deep .el-button--text {
  color: #70cccc;
}

</style>
