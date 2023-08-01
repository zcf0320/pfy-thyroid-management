import React from 'react';
import Page from '@/components/Page';
import learnt from '@/assets/images/learn-two.png';
import { history } from 'umi';
import './index.less';
const Learn = () => {
  // 去视频
  const handVideo = () => {
    history.push('/thyroid-gland/LearnVideo');
  };
  return (
    <Page title="冥想体验" showNav showBack>
      <div className="learn">
        <div className="learn-content">
          <div className="learn-content-title">
            冥想可以帮助你到达身心平衡的境界
          </div>
          <img src={learnt} alt="" />
          <div className="start-learn" onClick={() => handVideo()}>
            开始冥想
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Learn;
