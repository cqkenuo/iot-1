<template>
  <a-layout
    id="components-layout-demo-top-side-2"
    style="min-height: 100%;height: 100%"
  >
    <a-layout-header class="header">
      <Header />
    </a-layout-header>
    <a-layout style="height: 100%">
      <a-layout-sider
        breakpoint="lg"
        collapsedWidth="0"
        @collapse="onCollapse"
        @breakpoint="onBreakpoint"
        class="iot_basicLayout_sider"
        style="background: #fff"
      >
        <a-menu theme="light" mode="inline" class="iot_menu_base">
          <a-menu-item key="1">
            <router-link to="/admin/dashboard">
              <a-icon type="idcard" />首页
            </router-link>
          </a-menu-item>
          <Authorized :authority="['admin']">
            <a-sub-menu key="sub1">
              <span slot="title"><a-icon type="hdd" />基础管理</span>
              <a-menu-item key="11">
                <router-link
                  to="/admin/dashboard/organization"
                  style="color: #606060"
                >
                  <a-icon
                    type="caret-right"
                    style="margin-right: 0px;color: #C0C0C0;font-size: 0.8em"
                  />
                  组织机构</router-link
                >
              </a-menu-item>
              <a-menu-item key="12">
                <router-link
                  to="/admin/dashboard/networkServer"
                  style="color: #606060"
                  ><a-icon
                    type="caret-right"
                    style="margin-right: 0px;color: #C0C0C0;font-size: 0.8em"
                  />网络服务器</router-link
                >
              </a-menu-item>
              <a-menu-item key="13">
                <router-link
                  to="/admin/dashboard/serviceProfileManage"
                  style="color: #606060"
                  ><a-icon
                    type="caret-right"
                    style="margin-right: 0px;color: #C0C0C0;font-size: 0.8em"
                  />服务管理</router-link
                >
              </a-menu-item>
              <!--
              <a-menu-item key="3">
                <router-link to="/admin/dashboard/message">消息</router-link>
              </a-menu-item>
              -->
            </a-sub-menu>
          </Authorized>
          <a-sub-menu key="sub2">
            <span slot="title"><a-icon type="gateway" />网关</span>
            <a-menu-item key="21">
              <router-link
                to="/admin/dashboard/gatewayManage"
                style="color: #606060"
                ><a-icon
                  type="caret-right"
                  style="margin-right: 0px;color: #C0C0C0;font-size: 0.8em"
                />网关管理</router-link
              >
            </a-menu-item>
            <a-menu-item key="22">
              <router-link
                to="/admin/dashboard/gatewayListBoard/iLogFlow"
                style="color: #606060"
                ><a-icon
                  type="caret-right"
                  style="margin-right: 0px;color: #C0C0C0;font-size: 0.8em"
                />日志查询</router-link
              >
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <span slot="title"><a-icon type="interation" />节点</span>
            <a-menu-item key="23">
              <router-link
                to="/admin/dashboard/nodeManage"
                style="color: #606060"
                ><a-icon
                  type="caret-right"
                  style="margin-right: 0px;color: #C0C0C0;font-size: 0.8em"
                />节点规范管理</router-link
              >
            </a-menu-item>
            <a-menu-item key="24">
              <router-link
                to="/admin/dashboard/nodeBoard/upLogFlow"
                style="color: #606060"
                ><a-icon
                  type="caret-right"
                  style="margin-right: 0px;color: #C0C0C0;font-size: 0.8em"
                />上行日志查询</router-link
              >
            </a-menu-item>
            <a-menu-item key="25">
              <router-link
                to="/admin/dashboard/nodeBoard/downLogFlow"
                style="color: #606060"
                ><a-icon
                  type="caret-right"
                  style="margin-right: 0px;color: #C0C0C0;font-size: 0.8em"
                />下行日志查询</router-link
              >
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub4">
            <span slot="title"><a-icon type="profile" />应用</span>
            <a-menu-item key="41">
              <router-link
                to="/admin/dashboard/appManage"
                style="color: #606060"
                ><a-icon
                  type="caret-right"
                  style="margin-right: 0px;color: #C0C0C0;font-size: 0.8em"
                />应用管理</router-link
              >
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub5">
            <span slot="title"><a-icon type="idcard" />用户</span>
            <Authorized :authority="['admin']">
              <a-menu-item key="51">
                <router-link
                  to="/admin/dashboard/usersManage"
                  style="color: #606060"
                  ><a-icon
                    type="caret-right"
                    style="margin-right: 0px;color: #C0C0C0;font-size: 0.8em"
                  />用户管理</router-link
                >
              </a-menu-item>
            </Authorized>
            <a-menu-item key="52">
              <router-link
                to="/admin/dashboard/personData"
                style="color: #606060"
                ><a-icon
                  type="caret-right"
                  style="margin-right: 0px;color: #C0C0C0;font-size: 0.8em"
                />个人资料</router-link
              >
            </a-menu-item>
          </a-sub-menu>

          <!--
          <Authorized :authority="['admin']">
            <a-menu-item key="11">
              <router-link to="/admin/dashboard/iLogFlow">
                <a-icon type="user" />
                管理员管理
              </router-link>
            </a-menu-item>
          </Authorized>
           -->
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 18px 5px;min-height: 100%">
        <div class="iot_view_dashboard_title">
          <a-breadcrumb class="iot_breadcrumb">
            <a-breadcrumb-item v-for="(item, index) in list" :key="item.name">
              <router-link
                v-if="item.name != name && index != 0"
                :to="{ path: item.path === '' ? '/' : item.path }"
                >{{ item.meta.title }}</router-link
              >
              <span v-else>{{ item.meta.title }}</span>
            </a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <a-layout
          style="{
            margin: 0;
            min-height: fit-content;
          }"
        >
          <router-view />
        </a-layout>
        <a-layout-footer class="footer">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import Header from "./Header";
import Footer from "./Footer";
import { setArea } from "@/utils/util";

export default {
  data() {
    return {
      collapsed: false,
      name: "",
      list: []
    };
  },
  created() {
    this.getName();
  },
  watch: {
    $route() {
      this.getName();
    }
  },
  beforeMount() {
    //setArea(res.data.area_options);
    let areaData = this.$api.util.getAreaData();
    setArea(areaData.area_options);
  },
  methods: {
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint(broken) {
      console.log(broken);
    },
    getName() {
      this.list = [];
      this.$route.matched.forEach(record => this.list.push(record));
      this.name = this.$route.name;
    }
  },
  components: {
    Header,
    Footer
  }
};
</script>

<style>
.iot_menu_height {
}
.header {
  background: #1c8c6b;
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding: 0;
}
.footer {
  line-height: 1;
}
.iot_basicLayout_sider {
  min-height: 100%;
}
.iot_view_dashboard_title {
  padding-top: 10px;
  float: left;
}
.iot_breadcrumb {
  float: left;
  display: block;
  margin-bottom: 10px;
}
.iot_menu_base {
  text-align: left;
}
.ant-menu-inline .ant-menu-item,
.ant-menu-inline .ant-menu-submenu-title {
  font-size: 12px;
}
.ant-menu-vertical > .ant-menu-item,
.ant-menu-vertical-left > .ant-menu-item,
.ant-menu-vertical-right > .ant-menu-item,
.ant-menu-inline > .ant-menu-item,
.ant-menu-vertical > .ant-menu-submenu > .ant-menu-submenu-title,
.ant-menu-vertical-left > .ant-menu-submenu > .ant-menu-submenu-title,
.ant-menu-vertical-right > .ant-menu-submenu > .ant-menu-submenu-title,
.ant-menu-inline > .ant-menu-submenu > .ant-menu-submenu-title {
  height: 36px;
  line-height: 36px;
  margin-bottom: 2px;
  margin-top: 2px;
}

.ant-menu-sub.ant-menu-inline > .ant-menu-item,
.ant-menu-sub.ant-menu-inline > .ant-menu-submenu > .ant-menu-submenu-title {
  height: 32px;
  line-height: 32px;
  margin-bottom: 2px;
  margin-top: 2px;
}
.ant-menu-vertical .ant-menu-item:not(:last-child),
.ant-menu-vertical-left .ant-menu-item:not(:last-child),
.ant-menu-vertical-right .ant-menu-item:not(:last-child),
.ant-menu-inline .ant-menu-item:not(:last-child) {
  margin-bottom: 2px;
}
.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
  background-color: #f0f0f0;
  border-left: 3px solid #1eaf84;
}
.ant-menu-vertical .ant-menu-item::after,
.ant-menu-vertical-left .ant-menu-item::after,
.ant-menu-vertical-right .ant-menu-item::after,
.ant-menu-inline .ant-menu-item::after {
  border-right: 0 solid #1eaf84;
}
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
</style>
