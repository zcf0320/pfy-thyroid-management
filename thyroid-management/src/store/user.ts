import { makeAutoObservable } from 'mobx';
import { USER_INFO } from '@/utils/CONSTANT';
import { history } from 'umi';
import user from '@/api/user';
import { setToken } from '@/utils/tools';
import common from '@/api/common';
class UserStore {
  constructor() {
    makeAutoObservable(this);
  }

  token = '';
  userInfo = {};
  setToken = (token: string) => {
    this.token = token;
    if (token) {
      setToken(token);
      common.otherLogin();
      return new Promise((resolve, reject) => {
        user
          .getUserInfo()
          .then((res: any) => {
            localStorage.setItem(USER_INFO, JSON.stringify(res.data));
            this.setUserInfo(res.data);
            if (res.data.thyroidEntryFlag === -1) {
              resolve(-1);
            } else {
              resolve(res.data.thyroidEntryFlag);
            }
          })
          .catch((res: any) => {
            reject(res.data);
          });
      });
    }
  };

  setUserInfo = (userInfo: any) => {
    this.userInfo = userInfo;
    if (userInfo.thyroidEntryFlag === -1) {
      history.replace('/thyroid-gland/custom?step=0');
    }
  };
}
export default new UserStore();
