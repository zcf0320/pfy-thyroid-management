import React, { useEffect, useState } from 'react';
import './index.less';
import Page from '@/components/Page';
import { history, useLocation } from 'umi';
import { USER_INFO } from '@/utils/CONSTANT';
import gland from '@/api/gland';

const customData = ['无甲状腺症状，了解健康状况', '有甲状腺症状，进行疾病管理'];
const customList = [
  '甲状腺结节',
  '甲状腺炎',
  '甲减',
  '甲亢',
  '甲状腺癌',
  '甲状腺癌术后',
  '甲状腺肿大',
  '桥本氏病',
];
const Custom = () => {
  const location = useLocation();

  const [step, setStep] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [listData, setListData]: any = useState([]);

  const userInfo: any =
    localStorage.getItem(USER_INFO) &&
    JSON.parse(localStorage.getItem(USER_INFO)!);
  //    切换
  const handTab = (i: any) => {
    if (i === 0) {
      setListData([]);
    }
    setActiveIndex(i);
  };
  useEffect(() => {
    if (activeIndex === 0) {
      setDisabled(false);
    } else {
      if (!listData.length) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    }
  }, [activeIndex, listData]);
  useEffect(() => {
    const stepParam = location.query.step || 0;

    setStep(+stepParam);
  }, [location, step]);
  //    下一步
  const handleNext = () => {
    if (activeIndex === 0) {
      if (userInfo.sex !== 0 && userInfo.sex !== 1) {
        setStep(0);
        history.push(`/thyroid-gland/selectInfo?step=${0}&flag=${activeIndex}`);
      } else if (!userInfo.age) {
        setStep(1);
        history.push(`/thyroid-gland/selectInfo?step=${1}&flag=${activeIndex}`);
      } else if (!userInfo.height || !userInfo.weight) {
        setStep(2);
        history.push(`/thyroid-gland/selectInfo?step=${2}&flag=${activeIndex}`);
      } else {
        history.replace('/thyroid-gland/SufferConnection?id=0');
      }
    }
    if (activeIndex === 1) {
      localStorage.setItem('thyroidTag', listData.toString());
      if (userInfo.sex !== 0 && userInfo.sex !== 1) {
        setStep(0);
        history.push(`/thyroid-gland/selectInfo?step=${0}&flag=${activeIndex}`);
      } else if (!userInfo.age) {
        setStep(1);
        history.push(`/thyroid-gland/selectInfo?step=${1}&flag=${activeIndex}`);
      } else if (!userInfo.height || !userInfo.weight) {
        setStep(2);
        history.push(`/thyroid-gland/selectInfo?step=${2}&flag=${activeIndex}`);
      } else {
        let thyroidInfo = listData.toString();
        gland.getCustomInfo({ thyroidEntryFlag: 1, thyroidInfo }).then(() => {
          history.replace('/thyroid-gland/SufferConnection?id=1');
        });
      }
    }
  };

  // 点击列表
  const handList = (v: any) => {
    setListData([...listData, v]);
    if (listData.includes(v)) {
      setListData(listData.filter((val: any) => val !== v));
    } else {
      setListData([...listData, v]);
    }
  };

  return (
    <Page title="甲状腺管理" showNav showBack>
      <div className="custom">
        <div className="custom-top">
          <div className="custom-top-title">您希望得到的帮助</div>
        </div>
        <div className="custom-content">
          <ul>
            {customData.length > 0 &&
              customData.map((item, i) => {
                return (
                  <li
                    key={i}
                    onClick={() => handTab(i)}
                    className={`${activeIndex === i ? 'active' : ''}`}
                  >
                    {item}
                  </li>
                );
              })}
          </ul>
          <div>
            {activeIndex === 1 ? (
              <div className="custom-content-list">
                {customList.length > 0 &&
                  customList.map((item, i) => {
                    return (
                      <div
                        className={`custom-content-list-value ${
                          listData.includes(item) ? 'active' : ''
                        }`}
                        key={i}
                        onClick={() => handList(item)}
                      >
                        {item}
                      </div>
                    );
                  })}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="flex flex-j-center">
          <button
            className={`thyroid-gland-select-info-bottom ${
              disabled ? 'disable' : ''
            }`}
            onClick={handleNext}
            disabled={disabled}
          >
            下一步
          </button>
        </div>
      </div>
    </Page>
  );
};

export default Custom;
