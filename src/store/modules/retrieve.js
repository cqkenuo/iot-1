/**
 *  存放找回密码数据
 * **/

const state = {
  step1: {
    phoneNumber: "",
    note: ""
  },
  step2: {
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  }
};

const getters = {
  getPhoneNumber: () => state.step1.phoneNumber,

  getRetrieveNote: () => state.step1.note,
  getNewPassword: () => state.step2.newPassword,
  getStep2State() {
    if (state.step2.oldPassword["oldPassword"]) {
      if (
        state.step2.newPassword["newPassword"] ===
        state.step2.confirmPassword["confirmPassword"]
      ) {
        if (state.step2.newPassword["newPassword"]) {
          return true;
        }
      }
    }
    return false;
  }
};

const actions = {};

const mutations = {
  setPhoneNumber(state, data) {
    //设置参数
    state.step1.phoneNumber = data;
  },
  setNote(state, data) {
    //设置参数
    state.step1.note = data;
  },
  setOldPassword(state, data) {
    //设置参数
    state.step2.oldPassword = data;
  },
  setNewPassword(state, data) {
    //设置参数
    state.step2.newPassword = data;
  },
  setConfirmPassword(state, data) {
    //设置参数
    state.step2.confirmPassword = data;
  },
  resetData(state) {
    state.step1.phoneNumber = "";
    state.step1.note = "";
    state.step2.oldPassword = "";
    state.step2.newPassword = "";
    state.step2.confirmPassword = "";
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
