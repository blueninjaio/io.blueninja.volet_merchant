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
  let tac_token = await AsyncStorage.getItem("tac_token");

  if (route === "/users/edit") {
    let response = await fetch(`${url}${route}`, {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: body
    });
    return await response.json();
  } else if (route === "/users") {
    let response = await fetch(`${url}${route}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json1",
        "x-tac-token": `${tac_token}`
      },
      body: JSON.stringify(body)
    });
    return await response.json();
  } else if (route !== "/users") {
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
  }
};

export default {
  login: async (login_input, password) => {
    return post("/users/login", { login_input, password });
  },
  sendTAC: async contact => {
    return post("/tac/new", { contact });
  },
  checkTAC: async (contact, tac_code) => {
    return post("/tac/check", { contact, tac_code });
  },
  checkExistingTAC: async contact => {
    return post("/tac/contact", { contact });
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
    return post("/merchants", {
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
  }
};
