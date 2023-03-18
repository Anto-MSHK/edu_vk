import axios from "axios";

export const BASE_URL = "https://eduback-production.up.railway.app";

export const $api = axios.create({
  //   withCredentials: true,
  baseURL: BASE_URL,
});

export const getUser = async (id) => {
  return await $api.get("user/get/" + id).then((res) => {
    console.log(res.data);
    return res.data;
  });
};
