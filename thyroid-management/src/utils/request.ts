import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { Toast } from 'antd-mobile';
import { CHANNEL_CODE, SERVICERECORDID, USER_INFO } from './CONSTANT';
import { history } from 'umi';
import { getToken, removeToken } from './tools';

const service: any = axios.create({
  // URL
  baseURL: '/health-management',
  // 请求超时时间
  timeout: 30000,
  headers: {
    'service-type': '9',
  },
});

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken();
    const headers = config.headers || {};
    if (token) {
      headers['token'] = token;
    }
    if (localStorage.getItem(CHANNEL_CODE)) {
      headers['channelCode'] = localStorage.getItem(CHANNEL_CODE)!;
    }
    if (sessionStorage.getItem(SERVICERECORDID)) {
      headers['serviceRecordId'] = sessionStorage.getItem(SERVICERECORDID)!;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

// 返回拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    if (!res.status) {
      if (res.statusCode === 401) {
        removeToken();
        localStorage.removeItem(USER_INFO);
        sessionStorage.removeItem(SERVICERECORDID);
        history.replace('/login');
        return;
      }
      Toast.fail(res.message);
      return Promise.reject(res);
    } else {
      return res;
    }
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

export default service;
