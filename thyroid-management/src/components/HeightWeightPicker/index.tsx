import React, { useEffect, useState } from 'react';
import { PickerView } from 'antd-mobile';
import './index.less';

interface IProps {
  heightValue: number;
  weightValue: number;
  onHeightChange: (val: number) => void;
  onWeightChange: (val: number) => void;
}
export default function HeightWeightPicker(props: IProps) {
  const [height, setHeight] = useState([] as any);
  const [weight, setWeight] = useState([] as any);
  const heightData = [];
  for (let i = 100; i < 290; i++) {
    heightData.push({ label: i, value: i });
  }

  const weightData = [];
  for (let i = 20; i < 290; i++) {
    weightData.push({ label: i, value: i });
  }
  const onChange = (value: any) => {
    setHeight(value);
    props.onHeightChange(value[0]);
  };

  const onChange2 = (value: any) => {
    setWeight(value);
    props.onWeightChange(value[0]);
  };
  useEffect(() => {
    if (props.heightValue) {
      setHeight([props.heightValue]);
    }
    if (props.weightValue) {
      setWeight([props.weightValue]);
    }
  }, [props.heightValue, props.weightValue]);
  return (
    <div className="height-weight-picker">
      <div className="height-picker">
        <div className="title">您的身高(cm)</div>
        <PickerView
          itemStyle={{ color: '#000' }}
          value={height}
          data={heightData}
          cascade={false}
          onChange={(val: any) => {
            onChange(val);
          }}
        />
      </div>
      <div className="weight-picker">
        <div className="title">您的体重(kg)</div>
        <PickerView
          itemStyle={{ color: '#000' }}
          value={weight}
          data={weightData}
          cascade={false}
          onChange={(val: any) => {
            onChange2(val);
          }}
        />
      </div>
    </div>
  );
}
