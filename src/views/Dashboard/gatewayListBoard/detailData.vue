<template>
  <a-layout>
    <a-row
      style="background: #fff"
      type="flex"
      justify="space-between"
      align="top"
      :gutter="16"
    >
      <a-col :span="10">
        <div class="iot_view_detail_textCard">
          <a-row class="iot_view_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_detail_textCard_p">网关MAC：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_detail_textCard_p">
                {{ this.returnedData.id }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_detail_textCard_text_light">
            <a-col :span="8">
              <p class="iot_view_detail_textCard_p">网关名称：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_detail_textCard_p">
                {{ this.returnedData.name }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_detail_textCard_p">网络服务器：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_detail_textCard_p">
                {{ this.getServerName }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_detail_textCard_text_light">
            <a-col :span="8">
              <p class="iot_view_detail_textCard_p">通信模式：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_detail_textCard_p">
                {{ this.returnedData.modulation }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_detail_textCard_p">频段：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_detail_textCard_p">
                {{ this.returnedData.channels }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_detail_textCard_text_light">
            <a-col :span="8">
              <p class="iot_view_detail_textCard_p">状态：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_detail_textCard_p">
                {{ this.getState }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_detail_textCard_p">信号：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_detail_textCard_p">
                {{ this.getSign }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_detail_textCard_text_light">
            <a-col :span="8">
              <p class="iot_view_detail_textCard_p">
                上行数据量(24h)：
              </p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_detail_textCard_p">
                {{ this.getUp }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_detail_textCard_p">
                下行数据量(24h)：
              </p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_detail_textCard_p">
                {{ this.getDown }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_detail_textCard_text_light">
            <a-col :span="8">
              <p class="iot_view_detail_textCard_p">
                最后心跳时间：
              </p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_detail_textCard_p">
                {{ this.returnedData.lastSeenAt }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_detail_textCard_p">添加时间：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_detail_textCard_p">
                {{ this.returnedData.createdAt }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_detail_textCard_text_light">
            <a-col :span="8">
              <p class="iot_view_detail_textCard_p">经纬度：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_detail_textCard_p">
                {{
                  this.returnedData.location.latitude +
                    "/" +
                    this.returnedData.location.longitude
                }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_detail_textCard_p">海拔：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_detail_textCard_p">
                {{ this.returnedData.location.altitude }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view__detail_textCard_text_light">
            <a-col :span="8">
              <p class="iot_view_detail_textCard_p">地理位置：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_detail_textCard_p">
                {{ this.getArea }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_detail_textCard_p">网关描述：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_detail_textCard_p">
                {{ this.returnedData.description }}
              </p>
            </a-col>
          </a-row>
        </div>
      </a-col>
      <a-col :span="14">
        <div class="iot_amap_gatewayDetail_container">
          <el-amap vid="gateway_detail"> </el-amap>
        </div>
      </a-col>
    </a-row>

    <div style="background: #fff">
      <div
        id="gateway_myChartUp"
        style="width: auto; height:300px;margin-top: 30px"
      ></div>
      <div id="gateway_myChartDown" style="width: auto; height:300px"></div>
    </div>
  </a-layout>
</template>

<script>
import ARow from "ant-design-vue/es/grid/Row";
import ACol from "ant-design-vue/es/grid/Col";
import wifi_map from "../../../assets/wifi.png";
import { getNetworkServerNameById, getAreaLabel } from "../../../utils/util";
export default {
  components: { ACol, ARow },

  data() {
    return {
      returnedData: {
        id: "",
        name: "",
        description: "",

        networkServerID: "",
        organizationID: "",

        province: "",
        city: "",
        district: "",

        location: {
          latitude: "",
          longitude: "",
          altitude: ""
        },

        modulation: "",
        channels: "",

        createdAt: "",
        updatedAt: "",

        firstSeenAt: "",
        lastSeenAt: "",

        gatewayProfileID: ""
      }
    };
  },

  computed: {
    getState() {
      return "off";
    },

    getSign() {
      return "off";
    },

    getUp() {
      return "";
    },

    getDown() {
      return "";
    },

    getArea() {
      return getAreaLabel(
        this.returnedData.province,
        this.returnedData.city,
        this.returnedData.district
      );
    },

    getServerName() {
      //debugger;
      return getNetworkServerNameById(this.returnedData.networkServerID);
    }
  },
  created() {},
  beforeMount() {
    this.returnedData.id = this.$route.query.id;
    this.getDetail(this.returnedData.id);
  },
  mounted() {},
  updated() {
    this.drawLineUp();
    this.drawLineDown();
  },
  methods: {
    getDetail(id) {
      this.$api.gateway
        .gatewayDetail({
          extra: id
        })
        .then(res => {
          if (res.status === 200) {
            let infoData = res.data;
            this.returnedData.id = infoData.gateway.id;
            this.returnedData.name = infoData.gateway.name;
            this.returnedData.description = infoData.gateway.description;
            this.returnedData.gatewayProfileID =
              infoData.gateway.gatewayProfileID;
            this.returnedData.networkServerID =
              infoData.gateway.networkServerID;

            this.returnedData.modulation = infoData.gateway.modulation;
            this.returnedData.channels = infoData.gateway.channels;

            this.returnedData.province = infoData.gateway.province;
            this.returnedData.city = infoData.gateway.city;
            this.returnedData.district = infoData.gateway.district;
            this.returnedData.location = infoData.gateway.location;

            this.returnedData.lastSeenAt = infoData.lastSeenAt;
            this.returnedData.createdAt = infoData.createdAt;

            let mapObj = new AMap.Map("gateway_detail", {
              // eslint-disable-line no-unused-vars
              resizeEnable: true, //自适应大小
              zoom: 14,
              center: [
                this.returnedData.location.longitude,
                this.returnedData.location.latitude
              ]
            });
            console.log(mapObj);
            let startIcon = new AMap.Icon({
              // 图标尺寸
              size: new AMap.Size(25, 25),
              // 图标的取图地址
              image: wifi_map, // 您自己的图标
              // 图标所用图片大小
              imageSize: new AMap.Size(25, 25)
            });
            const marker = new AMap.Marker({
              // eslint-disable-line no-unused-vars
              map: mapObj,
              icon: startIcon,
              position: mapObj.center, // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
              title: "网关"
            });
          } else {
            console.log("获取网关节点详情失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    drawLineUp() {
      // 基于准备好的dom，初始化echarts实例
      let myChartUp = this.$echarts.init(
        document.getElementById("gateway_myChartUp")
      );
      myChartUp.clear();
      // 绘制图表
      myChartUp.setOption({
        title: { text: "下行数据统计(30天)" },
        tooltip: {},
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "20th",
            "21th",
            "22th",
            "23th",
            "24th",
            "25th",
            "26th",
            "27th",
            "28th",
            "29th",
            "30th",
            "31th",
            "1th",
            "2th",
            "3th",
            "4th",
            "5th",
            "6th",
            "7th",
            "8th",
            "9th",
            "10th",
            "11th",
            "12th",
            "13th",
            "14th",
            "15th",
            "16th",
            "17th",
            "18th"
          ]
        },
        itemStyle: {
          color: "#1eaf84"
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [
              5,
              7,
              4,
              0,
              7,
              12,
              27,
              27,
              27,
              27,
              27,
              7,
              27,
              2,
              27,
              27,
              2,
              7,
              27,
              7,
              7,
              5,
              7,
              4,
              2,
              6,
              54,
              1,
              4,
              2,
              5
            ],
            type: "line"
          }
        ]
      });
    },
    drawLineDown() {
      // 基于准备好的dom，初始化echarts实例
      let myChartDown = this.$echarts.init(
        document.getElementById("gateway_myChartDown")
      );
      myChartDown.clear();
      // 绘制图表
      myChartDown.setOption({
        title: { text: "下行数据统计(30天)" },
        tooltip: {},
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "20th",
            "21th",
            "22th",
            "23th",
            "24th",
            "25th",
            "26th",
            "27th",
            "28th",
            "29th",
            "30th",
            "31th",
            "1th",
            "2th",
            "3th",
            "4th",
            "5th",
            "6th",
            "7th",
            "8th",
            "9th",
            "10th",
            "11th",
            "12th",
            "13th",
            "14th",
            "15th",
            "16th",
            "17th",
            "18th"
          ]
        },
        itemStyle: {
          color: "#1eaf84"
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [
              5,
              7,
              4,
              0,
              7,
              12,
              27,
              27,
              27,
              27,
              27,
              7,
              27,
              2,
              27,
              27,
              2,
              7,
              27,
              7,
              7,
              5,
              7,
              4,
              2,
              6,
              54,
              1,
              4,
              2,
              5
            ],
            type: "line"
          }
        ]
      });
    }
  }
};
</script>

<style scoped>
.iot_view_detail_textCard {
  border-style: solid;
  border-color: #e8e8e8;
  border-width: 1px;
  background: #fff;
}
.iot_view_detail_textCard_p {
  line-height: 24px;
  height: 24px;
  margin-bottom: 0;
  margin-left: 10px;
  font-size: 10px;
}
.iot_view_detail_textCard_text_dark {
  background: #f0f0f0;
}
.iot_amap_gatewayDetail_container {
  height: 384px;
  width: 100%;
}
.iot_view_gatewayList_detail_textCard_text_light {
  background: #fff;
}
</style>
