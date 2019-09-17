import { url } from "../config/index";
import { AsyncStorage } from "react-native";

const get = async route => {
  let token = AsyncStorage.getItem("token");
  let response = await fetch(`${url}${route}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  return await response.json();
};

const post = async (route, body) => {
  let token = AsyncStorage.getItem("token");

  let response = await fetch(`${url}${route}`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });
  return await response.json();
};

export default {
  login: async (login_input, password) => {
    return post("/merchants/login", { login_input, password });
  }
};
