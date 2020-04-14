import Vue from "vue";
import Vuex from "vuex";
//import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseUrl: process.env.VUE_APP_OKTA_BASE_URL,
    status: "",
    useremail: localStorage.getItem("useremail"),
    user: {}
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, user) {
      state.status = "success";
      localStorage.setItem("useremail", user.email);
      state.user = user;
    },
    auth_error(state) {
      state.status = "error";
      state.user = null;
    },
    logout(state) {
      state.status = "";
      state.user = null;
    }
  },
  actions: {
    login({ commit }, user) {
      commit("auth_request");
      return new Promise(resolve => {
        commit("auth_success", user);
        resolve();
      });
    },
    logout({ commit }) {
      return new Promise(resolve => {
        commit("logout");
        localStorage.removeItem("useremail");
        resolve();
      });
    }
  },
  getters: {
    isLoggedIn: state => !!state.status,
    authStatus: state => state.status,
    userEmail: state => state.user.email,
    primaryAuthenticationCall: function(state) {
      let urlString = state.baseUrl + "/api/v1/authn";
      return urlString;
    }
  }
});
