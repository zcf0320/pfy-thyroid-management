import { history } from 'umi';
import { getToken, getUrlParams, setToken } from './utils/tools';
import { CHANNEL_CODE, SERVICERECORDID } from './utils/CONSTANT';
import Store from './store';

export function render(oldRender: Function) {
  getUrlParams('token') && setToken(getUrlParams('token'));
  getUrlParams(CHANNEL_CODE) &&
    localStorage.setItem(CHANNEL_CODE, getUrlParams(CHANNEL_CODE));
  sessionStorage.setItem(
    SERVICERECORDID,
    getUrlParams('serviceRecordId') || '',
  );
  const token = getToken();

  if (token) {
    Store.UserStore.setToken(token);
  } else {
    history.replace('/');
  }
  oldRender();
}
