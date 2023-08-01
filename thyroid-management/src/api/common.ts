import request from '@/utils/request';

export default {
  /**
   * 发送短信
   * @param mobile
   * @returns
   */
  sendMessage(mobile: string) {
    return request.get('/public/common/third/smscode', {
      params: { mobile },
    });
  },
  /**
   * 跳转登录
   * @param params
   * @returns
   */
  otherLogin() {
    return request.get('/user-info/otherLogin');
  },
};
