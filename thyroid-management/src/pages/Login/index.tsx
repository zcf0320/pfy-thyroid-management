import React, { useEffect, useState } from 'react';
import Page from '@/components/Page';
import { InputItem, Toast } from 'antd-mobile';
import { checkPhone } from '@/utils/tools';
import { useStores } from '@/utils/useStore';
import unchecked from '@/assets/images/unchecked.png';
import pitChing from '@/assets/images/pitching.png';
import common from '@/api/common';
import { history } from 'umi';
import user from '@/api/user';
import { CHANNEL_CODE, SERVICERECORDID } from '../../utils/CONSTANT';
import './index.less';
export default function Login(props: any) {
  const userStore = useStores('UserStore');
  const [code, setCode] = useState('');
  const [codeText, setCodeText] = useState('获取验证码');
  const [time, setTime] = useState(60);
  const [isSend, setIsSend] = useState(false);
  const [select, setSelect] = useState(false);
  const [mobile, setMobile] = useState('');

  // 获取验证码
  let sendCode = false;
  const sendMessage = () => {
    // 这里修改状态是异步
    if (!String(mobile).length) {
      Toast.info('请输入手机号');
      return;
    }
    // 校验手机号
    if (!checkPhone(mobile)) {
      Toast.info('请输入正确的手机号', 3);
      return;
    }
    sendCode = true;
    common
      .sendMessage(mobile)
      .then(() => {
        Toast.success('发送成功');
        setIsSend(true);
        sendCode = true;
      })
      .catch(() => {
        setIsSend(false);
        sendCode = false;
      });
  };
  useEffect(() => {
    let timer: any = null;
    if (isSend && time === 60) {
      timer = setInterval(() => {
        // 这时候的num由于闭包的原因，一直是0，所以这里不能用setNum(num-1)
        setTime((n) => {
          if (n === 0) {
            setCodeText('重新获取');
            setTime(60);
            setIsSend(false);
            sendCode = false;
            timer && clearInterval(timer);
          } else {
            setCodeText(`${n}s`);
          }
          return n - 1;
        });
      }, 1000);
    }
    return () => {
      // 组件销毁时，清除定时器
      timer && clearInterval(timer);
    };
  }, [isSend]);
  // 登录
  const submit = () => {
    if (!mobile || !code || !select) {
      return;
    }
    // 校验手机号
    if (!checkPhone(mobile)) {
      Toast.info('请输入正确的手机号', 3);
      return;
    }
    if (!code) {
      Toast.info('请输入验证码', 3);
      return;
    }
    if (!select) {
      Toast.info('请勾选用户协议！', 3);
      return;
    }
    user
      .login({
        mobile,
        code,
        type: '4',
        channelCode: localStorage.getItem(CHANNEL_CODE) || '',
      })
      .then((res: any) => {
        sessionStorage.removeItem(SERVICERECORDID);
        userStore.setToken(res.data).then((res: any) => {
          if (res >= 0) {
            history.replace(`/thyroid-gland/SufferConnection?id=${res}`);
          } else {
            history.replace('/thyroid-gland/custom?step=0');
          }
        });
      });
  };
  return (
    <Page title="甲状腺管理" showNav showBack>
      <div className="sleep-login-info">
        <div className="sleep-login-info-title">
          <div className="title-top">为您创建账号</div>
          <div className="title-bottom">用于长期跟进管理您的甲状腺健康状态</div>
        </div>
        <div className="sleep-login-info-input">
          <div className="input-phone mb-32">
            <InputItem
              onChange={(val: any) => {
                setMobile(val);
              }}
              className="input-mobile"
              clear
              maxLength={11}
              placeholder="请输入手机号码"
            ></InputItem>
          </div>
          <div className="input-code">
            <InputItem
              className="input-mobile"
              onChange={(val: any) => {
                setCode(val);
              }}
              clear
              placeholder="请输入验证码"
              maxLength={6}
            ></InputItem>
            <div className="send-btn" onClick={sendMessage}>
              {codeText}
            </div>
          </div>
          <div className="prot flex">
            <div
              className="select-content flex"
              onClick={() => {
                setSelect(!select);
              }}
            >
              {select ? (
                <img src={pitChing} alt="" className="select" />
              ) : (
                <img src={unchecked} alt="" className="select" />
              )}
            </div>

            <span className="prot-text">
              请阅读并同意
              <span
                className="text"
                onClick={() => {
                  history.push('/Protocal');
                }}
              >
                《平辅寅用户协议》
              </span>
            </span>
          </div>
          <div
            className={`sleep-login-next ${
              mobile && code && select ? '' : 'disable'
            }`}
            onClick={submit}
          >
            登录
          </div>
        </div>
      </div>
    </Page>
  );
}
