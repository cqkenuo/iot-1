<template>
  <a-card
    class="registerForm"
    :style="{
      padding: 0
    }"
  >
    <div class="iot_register_layout_text">
      <a class="iot_register_layout_text_content">注册</a>
    </div>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item class="iot_register_formItem">
        <a-input
          v-decorator="[
            'username',
            { rules: [{ required: true, message: '请输入用户姓名!' }] }
          ]"
          placeholder="用户名"
          style="text-align: left"
        />
      </a-form-item>
      <a-form-item class="iot_register_formItem">
        <a-input
          v-decorator="[
            'email',
            { rules: [{ required: true, message: '请输入电子邮箱!' }] }
          ]"
          placeholder="电子邮箱"
          style="text-align: left"
        />
      </a-form-item>

      <a-form-item class="iot_register_phoneNumber">
        <a-input
          v-decorator="[
            'phoneNumber',
            {
              initialValue: phoneNumber,
              rules: [{ required: true, message: '请输入手机号' }]
            }
          ]"
          placeholder="手机号"
          style="text-align: left"
        >
          <a-icon slot="prefix" type="phone" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <!--
      <a-form-item class="iot_register_note">
        <a-input
          class="iot_register_note_input"
          v-decorator="[
            'note',
            {
              initialValue: phoneNumber,
              rules: [{ required: true, message: '请输入短信验证码' }]
            }
          ]"
          placeholder="短信验证码"
          style="text-align: left"
        >
          <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)" />
        </a-input>
        <a-button type="primary" class="register_form_note_button">
          发送验证码
        </a-button>
      </a-form-item>
      -->
      <a-form-item class="iot_register_password">
        <a-input
          v-decorator="[
            'password',
            {
              initialValue: password,
              rules: [{ required: true, message: '请输入用户密码' }]
            }
          ]"
          type="password"
          placeholder="用户密码"
          style="text-align: left"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item class="iot_register_second_password">
        <a-input
          v-decorator="[
            'secondPassword',
            {
              initialValue: password,
              rules: [{ required: true, message: '请输入用户密码' }]
            }
          ]"
          type="password"
          placeholder="确认用户密码"
          style="text-align: left"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
        <a-button
          type="primary"
          class="register_form_submit_button"
          html-type="submit"
          :loading="commitLoading"
        >
          注册
        </a-button>
        <div class="iot_register_text_content">
          已有账号，
          <router-link to="/user/login" id="router" class="iot_register_text"
            >返回登录</router-link
          >
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
      phoneNumber: "",
      password: "",
      commitLoading: false
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (values.password != values.secondPassword) {
          alert("两次密码不一致，请核对");
          return;
        }

        if (!err) {
          console.log("Received values of form: ", values);
          this.commitLoading = true;
          var data = {
            username: values.username,
            password: values.password,
            email: values.email,
            phonenumber: values.phoneNumber,
            isAdmin: true,
            isActive: true,
            note: ""
          };

          this.$api.login
            .register(data)
            .then(res => {
              if (res.status === 200) {
                this.commitLoading = false;
                this.$message.success("注册成功");

                setSessionKey(res.data.jwt);
                initProfile();
                setTimeout(() => {
                  this.$router.push("/admin/dashboard");
                }, 300);
              } else {
                this.$message.error(res.data.code);
                this.$message.error(res.data.error);
              }
            })
            .catch(err => {
              console.log(err);
            })
            .finally(() => {
              this.commitLoading = false;
            });
        }
      });
    },
    handleSelectChange(value) {
      console.log(value);
      this.form.setFieldsValue({
        note: `Hi, ${value === "male" ? "man" : "lady"}!`
      });
    }
  }
};
</script>

<style>
.registerForm {
  margin: auto;
  width: 30%;
  height: 450px;
}
.iot_register_layout_text {
  height: 40px;
  text-align: center;
  color: black;
  font-size: 20px;
  margin-bottom: 8px;
}
.iot_register_note_input {
  width: 70%;
  float: left;
  line-height: 30px;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}
.iot_register_layout_text_content {
  color: black;
  letter-spacing: 2px;
}
.iot_register_formItem {
  margin-bottom: 12px;
}
.iot_register_phoneNumber {
  margin-bottom: 12px;
}
.iot_register_note {
  margin-bottom: 12px;
}
.iot_register_password {
  margin-bottom: 12px;
}
.iot_register_second_password {
  margin-bottom: 12px;
}
.register_form_note_button {
  height: 32px;
  font-size: 12px;
  float: right;
  width: 30%;
  text-align: center;
  font-variant-position: initial;
  color: #1eaf84;
  background: transparent;
  border-color: #1eaf84;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
.register_form_submit_button {
  margin-top: 24px;

  width: 100%;
  background: #1eaf84;
  border-radius: 1px;
  border-color: #1eaf84;
  font-size: 14px;
}
.iot_register_text_content {
  float: right;
  margin-top: 8px;
}
.iot_register_text {
  color: #1eaf84;
}
</style>
