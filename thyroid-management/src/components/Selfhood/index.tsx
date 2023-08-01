import React, { useState } from 'react';
import {
  HYPERTHYROIDISM,
  HYPOTHYROIDISM,
  THYROID,
  USER_INFO,
} from '@/utils/CONSTANT';
import { history } from 'umi';
import './index.less';
const Selfhood = () => {
  const handAssess = () => {
    history.push(`/thyroid-gland/ChemicalTake?id=${'selfhood'}`);
  };
  const userInfo: any =
    localStorage.getItem(USER_INFO) &&
    JSON.parse(localStorage.getItem(USER_INFO)!);
  const goQuestionnaire = (code: string) => {
    history.push(`/questionnaire-answer?questionnaireCode=${code}`);
  };
  return (
    <div className="selfhood">
      <div className="selfHome-top">
        <div className="selfHome-top-title">您好!{userInfo.userCenterName}</div>
        <div
          className="selfHome-top-target"
          onClick={() => {
            history.push('/thyroid-gland/report');
          }}
        >
          指标管理
        </div>
      </div>
      <div className="selfHome-top-content">
        <div className="selfHome-top-content-top">
          <div className="selfHome-top-content-top-title-left">甲状腺自测</div>
          <div
            className="selfHome-top-content-top-title-right"
            onClick={() => handAssess()}
          >
            我的测评
          </div>
        </div>
        <div
          className="selfHome-top-img"
          onClick={() => {
            goQuestionnaire(THYROID);
          }}
        >
          甲状腺测试
        </div>
        <div
          className="selfHome-main-img"
          onClick={() => {
            goQuestionnaire(HYPERTHYROIDISM);
          }}
        >
          甲亢测试
        </div>
        <div
          className="selfHome-foot-img"
          onClick={() => {
            goQuestionnaire(HYPOTHYROIDISM);
          }}
        >
          甲减测试
        </div>
      </div>
    </div>
  );
};
export default Selfhood;
