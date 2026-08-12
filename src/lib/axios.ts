import axios from "axios";

//共通して使うAPIのURLを設定
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
