import { LoginForm } from '@/utils/interface';
import request from '@/utils/request';

export default {
  /**
   * 用户登录
   * @param params
   * @returns
   */
  login(params: LoginForm) {
    return request.get('/user-info/login', { params });
  },
  /**
   * 获取用户信息
   * @returns
   */
  getUserInfo() {
    return request.get('/user-info/getUserInfo');
  },

  /**
   * 录入用户信息
   * @param data
   * @returns
   */
  updateUserInfo(data: any) {
    return request.post('/user-info/entryInfo', data);
  },
};
