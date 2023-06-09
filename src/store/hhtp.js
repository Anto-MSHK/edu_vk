import axios from "axios";

export const BASE_URL = "https://eduback-production.up.railway.app";

export const $api = axios.create({
  //   withCredentials: true,
  baseURL: BASE_URL,
});

export const getUser = async (id) => {
  const curId = id ? id : "";
  return await $api.get("user/get/" + curId).then((res) => {
    return res.data;
  });
};

export const setActiveUser = async (id) => {
  return await $api.put("user/set-active/" + id).then((res) => {
    return res.data;
  });
};
