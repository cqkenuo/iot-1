<template>
  <a-card
    class="loginForm"
    :style="{
      padding: 0
    }"
  >
    <div class="iot_login_layout_text">
      <a class="iot_login_layout_text_content">登录</a>
    </div>
    <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
    >
      <a-form-item class="iot_login_userNameForm">
        <a-input
          v-decorator="[
            'username',
            {
              rules: [{ required: true, message: '请输入用户名' }]
            }
          ]"
          placeholder="用户名"
          style="font-size: 14px;text-align: left"
          @keyup.enter="handleSubmit"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            {
              rules: [{ required: true, message: '请输入用户密码' }]
            }
          ]"
          type="password"
          placeholder="密码"
          style="font-size: 14px;text-align: left"
          @keyup.enter="handleSubmit"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          @click="handleSubmit"
          class="login-form-button"
        >
          登录
        </a-button>
        <div class="iot_userNameForm_item_layout">
          <router-link
            to="/user/retrieve/step"
            id="retrieve"
            class="iot_userNameForm_item_retrieve_text"
            >找回密码</router-link
          >
          <div class="iot_userNameForm_item_register">
            没有账号，
            <router-link
              to="/user/register"
              id="register"
              class="iot_userNameForm_item_register_text"
              >注册一个</router-link
            >
          </div>
        </div>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import { setSessionKey, initProfile } from "@/utils/util";
export default {
  data() {
    this.form = this.$form.createForm(this);
    return {
      formData: {
        username: "",
        password: ""
      }
    };
  },

  methods: {
    handleSubmit() {
      this.form.validateFields((err, value) => {
        this.formData.username = value.username;
        this.formData.password = value.password;
        if (!err) {
          this.$api.login
            .login(this.formData)
            .then(res => {
              if (res.status === 200) {
                this.$message.success("登录成功");
                //debugger;
                setSessionKey(res.data.jwt);
                initProfile();
                setTimeout(() => {
                  this.$router.push("/admin/dashboard");
                }, 300);
              } else {
                this.$message.error("请输入正确的用户名和密码!");
              }
            })
            .catch(err => {
              console.log(err);
            })
            .finally(() => {});
        } else {
          console.log("Login Form in wrong");
          this.$message.error("请检查用户名和密码!");
        }
      });
    }
  }
};
</script>
<style>
.loginForm {
  margin: auto;
  width: 30%;
  height: 320px;
}
.iot_login_layout_text {
  height: 40px;
  text-align: center;
  color: black;
  font-size: 20px;
  margin-bottom: 8px;
}
.iot_login_layout_text_content {
  color: black;
  letter-spacing: 2px;
}
.iot_login_userNameForm {
  margin-top: 30px;
  margin-bottom: 12px;
}
.iot_userNameForm_item_layout {
  margin-top: 10px;
}
.iot_userNameForm_item_retrieve_text {
  float: left;
  color: #1eaf84;
}
.iot_userNameForm_item_register {
  float: right;
}
.iot_userNameForm_item_register_text {
  color: #1eaf84;
}
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
  background: #1eaf84;
  border-radius: 1px;
  border-color: #1eaf84;
  font-size: 14px;
}
</style>
