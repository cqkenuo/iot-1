<template>
  <a-layout style="background: #fff;padding: 0 14px 0">
    <a-form
      :form="edit_form"
      layout="vertical"
      class="iot_view_edit_form"
      labelAlign="right"
    >
      <a-form-item
        label="ID"
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
        class="iot_view_edit_formItem_temp"
      >
        <span style="float: left">{{ returnedData.id }}</span>
      </a-form-item>
      <a-form-item
        label="名称："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
        class="iot_view_edit_formItem"
      >
        <span style="float: left">{{ returnedData.name }}</span>
      </a-form-item>
      <a-form-item
        label="网关发现："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
        class="iot_view_edit_formItem"
      >
        <a-switch
          :disabled="true"
          :checked="returnedData.canHaveGateways"
          :defaultChecked="returnedData.canHaveGateways"
          checkedChildren="能"
          unCheckedChildren="否"
          v-decorator="[
            'canHaveGateways',
            {
              initialValue: returnedData.canHaveGateways,
              rules: [{ required: true, message: '是否拥有网关' }]
            }
          ]"
          style="float: left"
        >
        </a-switch>
      </a-form-item>

      <a-form-item
        class="iot_view_edit_formItem"
        label="选择行业："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
      >
        <span style="float: left">{{ returnedData.profession }}</span>
      </a-form-item>

      <a-form-item
        class="iot_view_edit_formItem"
        :label="areaLabel"
        :required="false"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
      >
        <span style="float: left">{{ getLocation }}</span>
      </a-form-item>
      <a-form-item
        class="iot_view_edit_formItem"
        :label="addresLabel"
        :required="false"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
      >
        <span style="float: left">{{ returnedData.address }}</span>
      </a-form-item>

      <a-row>
        <a-col :span="10" :offset="3">
          <div class="iot_view_edit_form_left">
            <a-button icon="delete" style="" @click="handleBack">返回</a-button>
          </div>
        </a-col>
      </a-row>
    </a-form>
  </a-layout>
</template>

<script>
import { getAreaLabel } from "@/utils/util";

export default {
  data() {
    return {
      //label need align
      areaLabel: "\xa0\xa0\xa0" + "所在区域：",
      addresLabel: "\xa0\xa0\xa0" + "详细地址：",

      /*
        edit_form: this.$form.createForm(this, {
          name: "edit_form"
        }),
        **/
      returnedData: {
        id: "",
        name: "",
        displayName: "",
        profession: "",
        province: "",
        city: "",
        district: "",
        address: "",
        canHaveGateways: false,
        createdAt: "",
        updatedAt: ""
      }
    };
  },

  computed: {
    getLocation() {
      return getAreaLabel(
        this.returnedData.province,
        this.returnedData.city,
        this.returnedData.district
      );
    }
  },

  beforeCreate() {
    this.edit_form = this.$form.createForm(this, {
      name: "edit_form"
    });

    this.edit_form.getFieldDecorator("keys", {
      initialValue: [],
      preserve: true
    });
  },
  beforeMount() {
    this.returnedData.id = this.$route.query.id;
  },

  mounted() {
    //debugger;
    this.$api.organization
      .getOrganization({
        limit: 1,
        extra: this.returnedData.id
      })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          this.returnedData.name = res.data.organization.name;
          this.returnedData.displayName = res.data.organization.displayName;
          this.returnedData.canHaveGateways =
            res.data.organization.canHaveGateways;
          this.returnedData.profession = res.data.organization.profession;
          this.returnedData.province = res.data.organization.province;
          this.returnedData.city = res.data.organization.city;
          this.returnedData.district = res.data.organization.district;

          this.returnedData.address = res.data.organization.address;
          this.returnedData.createdAt = res.data.createdAt;
          this.returnedData.updatedAt = res.data.updatedAt;
        } else {
          console.log("获取组织详细信息失败");
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    handleBack() {
      this.$router.push({
        name: "organizationInit"
      });
    }
  }
};
</script>

<style>
.iot_view_edit_form {
  padding: 20px 5px;
}
.iot_view_edit_formItem {
  margin-bottom: 8px;
}
.iot_view_edit_form_left {
  float: left;
}
.ant-form-item {
  margin-bottom: 10px;
}
.iot_view_edit_formItem_temp {
  margin-bottom: 8px;
}
</style>
