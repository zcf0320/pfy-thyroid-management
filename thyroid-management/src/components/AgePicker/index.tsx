import React, { useEffect, useState } from 'react';
import { PickerView } from 'antd-mobile';
import './index.less';

interface IProps {
  value: number;
  onChange: (val: number) => any;
}
export default function AgePicker(props: IProps) {
  const [value, setValue] = useState([] as any);
  const age = [];
  for (let i = 0; i < 100; i++) {
    age.push({ label: i + '岁', value: i });
  }
  const onChange = (value: any) => {
    console.log('change', value);
    setValue(value);
    props.onChange(value[0]);
  };
  useEffect(() => {
    if (props.value) {
      setValue([props.value]);
    }
  }, [props.value]);
  return (
    <div className="age-picker">
      <PickerView
        // indicatorStyle={{background: '#ccc',color: "#fff"}}
        value={value}
        data={age}
        itemStyle={{ color: '#666666' }}
        cascade={false}
        onChange={(val: any) => {
          onChange(val);
        }}
      />
    </div>
  );
}
