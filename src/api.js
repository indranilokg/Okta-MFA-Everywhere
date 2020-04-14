// eslint-disable-next-line no-unused-vars
import Vue from "vue";
import axios from "axios";
import store from "./store";

const client = axios.create({
  baseURL: store.state.baseUrl,
  json: true
});

export default {
  async execute(method, resource, data) {
    return client({
      method,
      url: resource,
      data,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36"
      }
    })
      .then(req => {
        return req.data;
      })
      .catch(error => {
        console.log(error);
        return error.response.data;
      });
  }
};
