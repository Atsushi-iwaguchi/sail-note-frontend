import axios from "axios";

//共通して使うAPIのURLを設定
export const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

api.interceptors.request.use((config) => {
    //localstorageからトークンを取得
  const token = localStorage.getItem("token");

  if (token) {
    //tokenが存在するならconfigにAuthorizationヘッダーを追加
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
