import { DEV_TOKEN, TEST_TOKEN, TOKEN } from './CONSTANT';
import cookie from 'js-cookie';

export const formatDate = (num: number) => {
  return num < 10 ? '0' + num : num;
};
export const getUrlParams = (name: string, url?: string) => {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, '\\$&'); // eslint-disable-line
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);
  if (!results) {
    return '';
  }
  if (!results[2]) {
    return '';
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};
export const checkPhone = (phone: string) => {
  if (!/^1[3456789]\d{9}$/.test(phone)) {
    return false;
  } else {
    return true;
  }
};

export const setToken = (token: any) => {
  if (location.hostname.indexOf('localhost') > -1) {
    cookie.set(DEV_TOKEN, token);
  } else if (location.hostname.indexOf('dev') > -1) {
    cookie.set(DEV_TOKEN, token, { domain: '.g-hcare.com' });
  } else if (location.hostname.indexOf('test') > -1) {
    cookie.set(TEST_TOKEN, token, { domain: '.g-hcare.com' });
  } else {
    cookie.set(TOKEN, token, { domain: '.g-hcare.com' });
  }
};
export const getToken = () => {
  let token = '';
  if (location.hostname.indexOf('localhost') > -1) {
    token = cookie.get(DEV_TOKEN) || '';
  } else if (location.hostname.indexOf('dev') > -1) {
    token = cookie.get(DEV_TOKEN) || '';
  } else if (location.hostname.indexOf('test') > -1) {
    token = cookie.get(TEST_TOKEN) || '';
  } else {
    token = cookie.get(TOKEN) || '';
  }
  return token;
};
export const removeToken = () => {
  if (location.hostname.indexOf('localhost') > -1) {
    cookie.remove(DEV_TOKEN);
  } else if (location.hostname.indexOf('dev') > -1) {
    cookie.remove(DEV_TOKEN);
  } else if (location.hostname.indexOf('test') > -1) {
    cookie.remove(TEST_TOKEN);
  } else {
    cookie.remove(TOKEN);
  }
};
