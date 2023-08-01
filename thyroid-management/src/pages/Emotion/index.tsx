import React from 'react';
import Page from '@/components/Page';
import './index.less';
import iconMusic from '@/assets/images/icon-music.png';
import iconSleep from '@/assets/images/sleep.png';
import questionnaireRight from '@/assets/images/questionnaire-right.png';
import { history } from 'umi';
import { CHANNEL_CODE } from '@/utils/CONSTANT';
const Emotion = () => {
  // 去冥想音乐
  const handMuse = () => {
    history.push('/thyroid-gland/Muse');
  };
  // 去冥想体验
  const handLearn = () => {
    history.push('/thyroid-gland/Learn');
  };
  const jumpQuestionnaire = (type: number) => {
    if (type === 1) {
      window.location.href =
        QUESTIONNAIRE_URL +
        'questionnaire/depressed/start/?channelCode=' +
        localStorage.getItem(CHANNEL_CODE);
      return;
    }
    if (type === 2) {
      window.location.href =
        QUESTIONNAIRE_URL +
        'questionnaire/anxious/start/?channelCode=' +
        localStorage.getItem(CHANNEL_CODE);
      return;
    }
    if (type === 3) {
      window.location.href = MINAPP_URL;
      return;
    }
  };
  return (
    <Page title="情绪管理" showNav showBack>
      <div className="Emotion">
        <div className="Emotion-top">
          <div className="Emotion-top-left" onClick={() => handMuse()}>
            <img src={iconMusic} alt="" />
            <span>冥想音乐</span>
          </div>
          <div className="Emotion-top-right" onClick={() => handLearn()}>
            <img src={iconSleep} alt="" />
            <span>冥想体验</span>
          </div>
        </div>

        <div className="Emotion-content">
          <div className="Emotion-content-title">测试问卷</div>
          <div className="Emotion-content-titleChildren">
            健康的一半是心理健康，疾病的一半是心理疾病
          </div>
          <dl
            className="Emotion-content-questionnaire"
            onClick={() => {
              jumpQuestionnaire(1);
            }}
          >
            <dt>
              <p>抑郁情绪自评问卷</p>
              <p>抑郁的情绪会导致心情低落，睡眠质量也随之下降哦</p>
            </dt>
            <dd>
              <img src={questionnaireRight} alt="" />
            </dd>
          </dl>
          <dl
            className="Emotion-content-questionnaire"
            onClick={() => {
              jumpQuestionnaire(2);
            }}
          >
            <dt>
              <p>焦虑情绪自评问卷</p>
              <p>焦虑会引起身心紧张，难以入睡，来测试您是否焦虑吧</p>
            </dt>
            <dd>
              <img src={questionnaireRight} alt="" />
            </dd>
          </dl>
          <dl
            className="Emotion-content-questionnaire"
            onClick={() => {
              jumpQuestionnaire(3);
            }}
          >
            <dt>
              <p>产后抑郁自评问卷</p>
              <p>如果您近期刚生产完成，请关注自己的感受</p>
            </dt>
            <dd>
              <img src={questionnaireRight} alt="" />
            </dd>
          </dl>
        </div>
      </div>
    </Page>
  );
};

export default Emotion;
