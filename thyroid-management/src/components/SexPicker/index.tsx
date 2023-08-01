import React, { useEffect, useState } from 'react';
import './index.less';

interface IProps {
  value: string;
  onChange: (val: string) => void;
}
export default function SexPicker(props: IProps) {
  const [sex, setSex] = useState('');

  useEffect(() => {
    if (props.value) {
      setSex(props.value);
    }
  }, [props.value]);
  const handleChange = (val: string) => {
    setSex(val);
    props.onChange(val);
  };
  return (
    <div className="select-sex-page">
      <div
        className="select-sex-page-boy"
        onClick={() => {
          handleChange('男');
        }}
      >
        <div className={`boy-img ${sex === '男' ? 'active' : ''}`}></div>
        <div className="boy-text">男</div>
      </div>
      <div className="select-sex-page-girl">
        <div
          className={`girl-img ${sex === '女' ? 'active' : ''}`}
          onClick={() => {
            handleChange('女');
          }}
        ></div>
        <div className="girl-text">女</div>
      </div>
    </div>
  );
}
