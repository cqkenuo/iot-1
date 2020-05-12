import store from "../store/index";

export default {
  getCurrentUser: function() {
    return store.getters["login/getCurrentUser"];
  },

  getCurrentOrganization: function() {
    return store.getters["login/getCurrentOrganization"];
  },

  getCurrentOrganizationID: function() {
    /*
    var organizations = store.getters["login/getCurrentOrganizations"];
    if (organizations != null && organizations.length > 0) {
      return organizations[0].organizationID;
    }
    */
    debugger;
    var organization = this.getCurrentOrganization();
    if (organization == null) return "";
    else return organization.organizationID;

    //return store.getters["login/getOrganizationID"];
  },

  getCurrentOrganizationList: function() {
    return store.getters["login/getCurrentOrganizationList"];
  },

  setCurrentOrganization: function(value) {
    debugger;
    var list = this.getCurrentOrganizationList();
    for (var i = 0; i < list.length; i++) {
      if (list[i].organizationID === value) {
        var o = list[i];
        store.commit("login/setCurrentOrganization", o);
        break;
      }
    }
  },

  /**
   * uuid
   */
  getGuid: function() {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
      var n = Math.floor(Math.random() * 16.0).toString(16);
      guid += n;
      if (i == 8 || i == 12 || i == 16 || i == 20) guid += "-";
    }
    return guid.toUpperCase();
  },

  generateDevEUI(organizationID, index) {
    var totalLength = 16;
    //左边6位
    var leftStr = (Array(6).join("0") + organizationID).slice(-6);
    //中间4位
    var centerStr = new Date().getFullYear();

    //右边6位
    var rightStr = (Array(6).join("0") + index).slice(-6);

    var result = leftStr + "" + centerStr + "" + rightStr;
    return result;
  },

  /**
   * 字符串判空
   * true：为空
   * false：不为空
   */
  isEmpty: function(str) {
    if ("" == str || null == str || undefined == str || "undefined" == str) {
      return true;
    } else {
      return false;
    }
  },

  getBeginTimestamp: function(date) {
    var day = this.formatDate(date, "yyyy-MM-dd");
    day += "T00:00:00Z";
    return day;
  },

  getEndTimestamp: function(date) {
    var day = this.formatDate(date, "yyyy-MM-ddTHH:mm:ssZ");
    //day += "T23:59:59Z";
    var time = this.getNowTime();
    day = day.replace("00:00:00", time);
    return day;
  },

  getDateFromStr: function(dateString) {
    //debugger
    if (dateString) {
      var date = new Date(dateString.replace(/-/, "/"));
      return date;
    }
  },

  getDateTimeFromStr: function(dateString) {
    if (dateString) {
      var arr1 = dateString.split(" ");
      var sdate = arr1[0].split("-");
      var date = new Date(sdate[0], sdate[1] - 1, sdate[2]);
      return date;
    }
  },

  getNextDate: function(date, day) {
    //debugger
    var dd = new Date(date);
    dd.setDate(dd.getDate() + day);
    return this.formatDate(dd, "yyyy-MM-dd");
  },
  /**
   * 返回date类型的yyyy-mm-dd格式
   */
  getNowDate: function() {
    var d = new Date();
    return this.formatDate(d, "yyyy-MM-dd");

    /*
    var seperator1 = "-";
    var year = date.getFullYear(); //年
    var month = date.getMonth() + 1; //月
    var strDate = date.getDate(); //日
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
    */
  },

  getNowDateTime: function() {
    var d = new Date();
    return this.formatDate(d, "yyyy-MM-dd HH:mm:ss");
  },

  getNowTime: function() {
    var d = new Date();
    return this.formatDate(d, "HH:mm:ss");
  },

  /**
   * 日期格式化
   * @param {Object} d
   * @param {Object} formatStr
   */
  formatDate: function(d, formatStr) {
    var str = formatStr;
    var Week = ["日", "一", "二", "三", "四", "五", "六"];

    str = str.replace(/yyyy|YYYY/, d.getFullYear());
    str = str.replace(
      /yy|YY/,
      d.getYear() % 100 > 9
        ? (d.getYear() % 100).toString()
        : "0" + (d.getYear() % 100)
    );
    var dMonth = d.getMonth() + 1;

    str = str.replace(/MM/, dMonth > 9 ? dMonth.toString() : "0" + dMonth);
    str = str.replace(/M/g, dMonth);

    str = str.replace(/w|W/g, Week[d.getDay()]);

    str = str.replace(
      /dd|DD/,
      d.getDate() > 9 ? d.getDate().toString() : "0" + d.getDate()
    );
    str = str.replace(/d|D/g, d.getDate());

    str = str.replace(
      /hh|HH/,
      d.getHours() > 9 ? d.getHours().toString() : "0" + d.getHours()
    );
    str = str.replace(/h|H/g, d.getHours());
    str = str.replace(
      /mm/,
      d.getMinutes() > 9 ? d.getMinutes().toString() : "0" + d.getMinutes()
    );
    str = str.replace(/m/g, d.getMinutes());

    str = str.replace(
      /ss|SS/,
      d.getSeconds() > 9 ? d.getSeconds().toString() : "0" + d.getSeconds()
    );
    str = str.replace(/s|S/g, d.getSeconds());

    return str;
  }
};
