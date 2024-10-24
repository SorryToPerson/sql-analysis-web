import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { message } from 'antd';

// 创建axios实例
const instance = axios.create({
  baseURL: '/',
});

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在发送请求之前做些什么
    // 可以在这里对请求config进行处理，例如添加token等
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做点什么
    // 可以在这里对响应数据进行处理，例如统一处理错误提示等
    return response.data as any;
  },
  (error) => {
    const { response } = error;
    if ([401].includes(response?.status)) {
    }
    if ([403, 500].includes(response?.status)) {
      const data = response.data;
      if (data.detail) {
        message.error('执行异常: ' + data.detail);
      } else if (data.msg) {
        message.error('执行异常: ' + data.msg);
      } else {
        message.error('执行异常: ' + data);
      }
    }
    // 对响应错误做点什么
    return Promise.reject(error);
  },
);

export default instance;
