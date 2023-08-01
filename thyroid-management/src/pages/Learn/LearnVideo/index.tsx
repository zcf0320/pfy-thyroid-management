import React, { useState } from 'react';
import Page from '@/components/Page';
import './index.less';
const LearnVideo = () => {
  return (
    <Page title="冥想体验" showNav showBack>
      <div className="decompression-video">
        <video
          className="video" // 控制栏样式 必需
          controls
          autoPlay
          id="video"
        >
          <source
            src={`${OSS_URL}video/mixkit-girl-meditating-under-the-wind-in-the-desert-32754.mp4`}
          />
        </video>
      </div>
    </Page>
  );
};

export default LearnVideo;
