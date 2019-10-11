import { url } from "../config/index";
import { AsyncStorage } from "react-native";

const get = async route => {
  let token = await AsyncStorage.getItem("token");
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
  let token = await AsyncStorage.getItem("token");
  let tac_token = await AsyncStorage.getItem("tac_token");
  let response = await fetch(`${url}${route}`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "x-tac-token": `${tac_token}`
    },
    body: body instanceof FormData ? body : JSON.stringify(body)
  });
  return await response.json();
};

export default {
  login: async (login_input, password) => {
    return post("/users/login", { login_input, password });
  },
  sendTAC: async contact => {
    //register
    return post("/tac/new", { contact });
  },
  sendTACByContact: async contact => {
    //forgotPassword
    return post("/tac/contact", { contact });
  },
  sendTACToUser: async () => {
    //resetPassword
    return post("/tac/user");
  },
  checkTAC: async (contact, tac_code) => {
    //check Both Register and Forgot Password
    return post("/tac/check", { contact, tac_code });
  },
  checkUserTAC: async tac_code => {
    // Reset Password
    return post("/tac/check-user", { tac_code });
  },
  register: async (
    facebook_id,
    google_id,
    contact,
    f_name,
    l_name,
    email,
    password
  ) => {
    return post("/users", {
      facebook_id,
      google_id,
      contact,
      f_name,
      l_name,
      email,
      password
    });
  },
  editInfo: async body => {
    return post("/users/edit", body);
  },
  confirmPassword: async (temporary_password, email, contact, new_password) => {
    return post("/users/resetPassword", {
      temporary_password,
      email,
      contact,
      new_password
    });
  },
  usersInfo: async () => {
    return get("/users/me");
  },
  confirmPassword: async (token, old_password, new_password) => {
    return post("/users/reset-password", {
      token,
      old_password,
      new_password
    });
  }
};
