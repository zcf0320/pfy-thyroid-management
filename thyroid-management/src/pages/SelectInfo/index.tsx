import React, { useEffect, useState } from 'react';
import Page from '@/components/Page';
import { history, useLocation } from 'umi';
import './index.less';
import HeightWeightPicker from '@/components/HeightWeightPicker';
import AgePicker from '@/components/AgePicker';
import SexPicker from '@/components/SexPicker';
import user from '@/api/user';
import { Toast } from 'antd-mobile';
import { useStores } from '@/utils/useStore';
import { USER_INFO } from '@/utils/CONSTANT';
const Bodyweight = () => {
  const userStore = useStores('UserStore');
  const infoStorage = localStorage.getItem('selectInfo')
    ? JSON.parse(localStorage.getItem('selectInfo')!)
    : null;
  const [disabled, setDisabled] = useState(true);
  const [step, setStep] = useState(0);
  const [sex, setSex] = useState(infoStorage ? infoStorage.sex : '');
  const [age, setAge] = useState(infoStorage ? infoStorage.age : Number);
  const [height, setHeight] = useState(
    infoStorage ? infoStorage.height : Number,
  );
  const [weight, setWeight] = useState(
    infoStorage ? infoStorage.weight : Number,
  );

  const location = useLocation();
  const userInfo: any =
    localStorage.getItem(USER_INFO) &&
    JSON.parse(localStorage.getItem(USER_INFO)!);
  useEffect(() => {
    const stepParam = location.query.step || 0;
    setStep(+stepParam);
  }, [location]);
  useEffect(() => {
    let disable = true;
    const info = {
      sex: '',
      age: null,
      height: null,
      weight: null,
    };
    const infoStorage = localStorage.getItem('selectInfo')
      ? JSON.parse(localStorage.getItem('selectInfo')!)
      : info;
    if (step === 0 && sex) {
      infoStorage.sex = sex;
      disable = false;
    }
    if (step === 1 && age) {
      infoStorage.age = age;
      disable = false;
    }
    if (step === 2 && height && weight) {
      infoStorage.height = height;
      infoStorage.weight = weight;
      disable = false;
    }

    if (!disable) {
      localStorage.setItem('selectInfo', JSON.stringify(infoStorage));
    }
    setDisabled(disable);
  }, [step, sex, age, height, weight]);
  // 下一步、
  const handleNext = () => {
    if (disabled) {
      return;
    }
    if (step === 2) {
      const param: any = {
        sex: sex === '男' ? 1 : 0,
        age,
        height,
        weight,
        thyroidEntryFlag: +location.query.flag,
      };
      if (+location.query.flag === 1) {
        param.thyroidInfo = localStorage.getItem('thyroidTag');
      }
      user.updateUserInfo(param).then((res: any) => {
        Toast.success(res.message);
        user.getUserInfo().then((res: any) => {
          localStorage.removeItem('thyroidTag');
          localStorage.removeItem('selectInfo');
          userStore.setUserInfo(res.data);

          history.push(
            `/thyroid-gland/SufferConnection?id=${+location.query.flag}`,
          );
        });
      });
    } else {
      setStep(step + 1);
      history.push(
        `/thyroid-gland/selectInfo?step=${step + 1}&flag=${+location.query
          .flag}`,
      );
    }
  };
  return (
    <Page title="甲状腺管理" showNav showBack>
      <div className="thyroid-gland-select-info">
        <div className="thyroid-gland-select-info-top">
          <div className="thyroid-gland-select-info-top-title">
            {step === 2 && '选择您的身高体重'}
            {step === 1 && '选择您的您的年龄'}
            {step === 0 && '选择您的您的性别'}
          </div>
        </div>
        {step === 2 ? (
          <HeightWeightPicker
            heightValue={height}
            weightValue={weight}
            onHeightChange={(val: number) => {
              setHeight(val);
            }}
            onWeightChange={(val: number) => {
              setWeight(val);
            }}
          ></HeightWeightPicker>
        ) : null}
        {step === 1 ? (
          <AgePicker
            value={age}
            onChange={(age: number) => {
              setAge(age);
            }}
          ></AgePicker>
        ) : null}
        {step === 0 ? (
          <SexPicker
            value={sex}
            onChange={(sex: string) => {
              setSex(sex);
            }}
          ></SexPicker>
        ) : null}
        <div
          className={`thyroid-gland-select-info-bottom ${
            disabled ? 'disable' : ''
          }`}
          onClick={handleNext}
        >
          下一步
        </div>
      </div>
    </Page>
  );
};
export default Bodyweight;
