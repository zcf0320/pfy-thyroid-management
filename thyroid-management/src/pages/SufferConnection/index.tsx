import React, { useState, useEffect } from 'react';
import Page from '@/components/Page';
import { history, useLocation } from 'umi';
import DiseaseGuideLines from '@/components/DiseaseGuidelines';
import DiseaseTools from '@/components/DiseaseTools';
import './index.less';
import Selfhood from '@/components/Selfhood';
import { USER_INFO } from '@/utils/CONSTANT';
import gland from '@/api/gland';
const SufferConnection = () => {
  const location = useLocation();
  // 去化验单
  const handReport = () => {
    history.push('/thyroid-gland/report');
  };
  const userInfo: any =
    (localStorage.getItem(USER_INFO) &&
      JSON.parse(localStorage.getItem(USER_INFO)!)) ||
    {};
  useEffect(() => {
    if (userInfo && userInfo.thyroidEntryFlag === 1) {
      gland.queryUpdate().then((res: any) => {
        if (res.data) {
          history.replace(`/thyroid-gland/Chemical?TakeId=${res.data}`);
        }
      });
    }
  }, [userInfo]);
  return (
    <Page title="甲状腺管理" showNav showBack>
      <div className="sufferConnection">
        {location.query.id && +location.query.id === 0 ? (
          <Selfhood></Selfhood>
        ) : (
          <div className="sufferConnection-top">
            <div className="sufferConnection-top-img">
              <div className="sufferConnection-top-user">
                <span>您好!</span>
                <span>{userInfo.userCenterName}</span>
              </div>
              <div
                className="sufferConnection-top-btn"
                onClick={() => handReport()}
              >
                解析我的化验单
              </div>
            </div>
          </div>
        )}
        <DiseaseGuideLines></DiseaseGuideLines>
        <DiseaseTools></DiseaseTools>
      </div>
    </Page>
  );
};

export default SufferConnection;
