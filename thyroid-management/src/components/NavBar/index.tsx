import React from 'react';
import { history } from 'umi';
import './index.less';
import back from '@/assets/images/back.png';

interface IProps {
  title: string;
  showBack: boolean;
}
const NavBar = (props: IProps) => {
  return (
    <div className="component-navbar">
      {props.showBack ? (
        <div
          className="left"
          onClick={() => {
            history.goBack();
          }}
        >
          <img src={back} alt="" />
        </div>
      ) : null}

      <div className="title">{props.title}</div>
    </div>
  );
};
export default NavBar;
