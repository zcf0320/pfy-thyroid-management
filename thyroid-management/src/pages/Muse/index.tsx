import React, { useState } from 'react';
import Page from '@/components/Page';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import playIcon from '@/assets/images/play.png';
import pauseIcon from '@/assets/images/pause.png';
import nextIcon from '@/assets/images/next.png';
import previousIcon from '@/assets/images/previous.png';
import './index.less';

const musicList = [
  {
    id: 1,
    title: '秋日冥想',
    subTitle: '舒缓/自然/平静',
    coverImg: `${OSS_URL}music/%E6%A3%AE%E6%9E%97%E7%8E%AF%E5%A2%83%402x.png`,
    src: `${OSS_URL}music/autumn-sky-meditation.mp3`,
  },
  {
    id: 2,
    title: '坎西翁',
    subTitle: '灵动/舒缓',
    coverImg: `${OSS_URL}music/%E9%92%9F%E5%A3%B0%402x.png`,
    src: `${OSS_URL}music/mixkit-cancion-de-crystal.mp3`,
  },
  {
    id: 3,
    title: '抵达天堂',
    subTitle: '舒缓/助眠',
    coverImg: `${OSS_URL}music/%E6%82%A0%E6%89%AC%E6%AD%8C%E6%9B%B2%402x.png`,
    src: `${OSS_URL}music/mixkit-fhloston-paradise-arrival.mp3`,
  },
  {
    id: 4,
    title: '自然冥想',
    subTitle: '舒缓/自然/平静',
    coverImg: `${OSS_URL}music/%E4%BD%8E%E5%96%83%402x.png`,
    src: `${OSS_URL}music/mixkit-nature-meditation.mp3`,
  },
  {
    id: 5,
    title: '悬浮',
    subTitle: '空灵/舒缓',
    coverImg: `${OSS_URL}music/%E4%BD%8E%E5%A3%B0%E5%93%BC%E5%94%B1%402x.png`,
    src: `${OSS_URL}music/mixkit-nield-grohm-hanging.mp3`,
  },
  {
    id: 6,
    title: '即刻放松',
    subTitle: '轻松/舒缓',
    coverImg: `${OSS_URL}music/%E7%BA%AF%E9%9F%B3%E4%B9%90-%E6%B8%85%E4%BA%AE%402x.png`,
    src: `${OSS_URL}music/mixkit-rest-now.mp3`,
  },
  {
    id: 7,
    title: '宁静景观',
    subTitle: '平静/舒缓/柔和',
    coverImg: `${OSS_URL}music/%E7%BA%AF%E9%9F%B3%E4%B9%90-%E6%82%A0%E6%89%AC%402x.png`,
    src: `${OSS_URL}music/mixkit-serene-view.mp3`,
  },
  {
    id: 8,
    title: '栖息树下',
    subTitle: '平静/舒缓/柔和',
    coverImg: `${OSS_URL}music/%E8%88%9E%E8%B9%88%402x.png`,
    src: `${OSS_URL}music/mixkit-sitting-under-the-trees.mp3`,
  },
  {
    id: 9,
    title: '平滑冥想',
    subTitle: '舒缓/自然/平静',
    coverImg: `${OSS_URL}music/%E7%BA%AF%E9%9F%B3%E4%B9%90-%E8%88%92%E7%BC%93%402x.png`,
    src: `${OSS_URL}music/mixkit-smooth-meditation.mp3`,
  },
  {
    id: 10,
    title: '山谷日落',
    subTitle: '柔和/自然/舒缓',
    coverImg: `${OSS_URL}music/%E9%92%A2%E7%90%B4%E5%A3%B0%402x.png`,
    src: `${OSS_URL}music/mixkit-valley-sunset.mp3`,
  },
  {
    id: 11,
    title: '瑜伽时间',
    subTitle: '平静/舒缓',
    coverImg: `${OSS_URL}music/%E6%AD%8C%E8%88%9E%E5%A3%B0%402x.png`,
    src: `${OSS_URL}music/mixkit-yoga-tune.mp3`,
  },
  {
    id: 12,
    title: '软冥想',
    subTitle: '舒缓/平静',
    coverImg: `${OSS_URL}music/%E7%BA%AF%E9%9F%B3%E4%B9%90-%E8%BD%BB%E5%BF%AB%402x.png`,
    src: `${OSS_URL}music/soft-meditation.mp3`,
  },
];
const Muse = () => {
  const [currentMusic, setCurrentMusic] = useState(Object as any);
  const [currentId, setCurrentId] = useState(Number);
  const playMusic = (music: any, index: number) => {
    setCurrentId(index);
    setCurrentMusic(music);
  };
  const previousMusic = () => {
    if (currentId > 0) {
      setCurrentMusic(musicList[currentId - 1]);
      setCurrentId(currentId - 1);
    }
  };
  const nextMusic = () => {
    setCurrentMusic(musicList[currentId + 1]);
    setCurrentId(currentId + 1);
  };
  const renderHeader = () => {
    return (
      <div className="music-player-header">
        <img className="coverImg" src={currentMusic.coverImg} />
        <div>
          <div className="title">{currentMusic.title}</div>
          <div className="sub-title">{currentMusic.subTitle}</div>
        </div>
      </div>
    );
  };
  const customPlayIcon = () => {
    return <img className="play-icon" src={playIcon} />;
  };
  const customPauseIcon = () => {
    return <img className="play-icon" src={pauseIcon} />;
  };
  const customNextIcon = () => {
    return <img className="skip-icon" src={nextIcon} />;
  };
  const customPreIcon = () => {
    return <img className="skip-icon" src={previousIcon} />;
  };
  return (
    <Page title="冥想音乐" showNav showBack>
      <div className={`muse ${currentMusic && currentMusic.src ? 'pd' : ''}`}>
        <div className="muse-top">
          <span>冥想可以帮助你到达身心平衡的境界。</span>
          <span>一首好的冥想音乐，</span>
          <span>能够瞬间平息你心底深处那一场场小小的暴动，</span>
          <span>带给你听觉的愉悦和心灵的和谐。</span>
        </div>
        <div className="muse-music">
          {musicList.map((item, index) => {
            return (
              <div key={item.id} className="Emotion-content-questionnaire">
                <div className="Emotion-content-left">
                  <img src={item.coverImg} alt="" />
                  <div className="Emotion-content-left-title">
                    <p>{item.title}</p>
                    <p>{item.subTitle}</p>
                  </div>
                </div>
                <div className="Emotion-content-right">
                  <div
                    className="Emotion-content-right-content"
                    onClick={() => {
                      playMusic(item, index);
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
        {currentMusic && currentMusic.src ? (
          <div className="player">
            <AudioPlayer
              showJumpControls={false}
              showSkipControls
              autoPlay
              src={currentMusic.src}
              onPlay={(e) => console.log('onPlay')}
              onClickNext={(e) => {
                nextMusic();
              }}
              onClickPrevious={() => {
                previousMusic();
              }}
              customIcons={{
                play: customPlayIcon(),
                pause: customPauseIcon(),
                previous: customPreIcon(),
                next: customNextIcon(),
              }}
              customVolumeControls={[]}
              customAdditionalControls={[]}
              header={renderHeader()}
            />
          </div>
        ) : null}
      </div>
    </Page>
  );
};

export default Muse;
