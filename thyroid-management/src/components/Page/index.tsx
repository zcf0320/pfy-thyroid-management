import React, { ReactNode } from 'react';
import NavBar from '../NavBar';
import './index.less';

interface IProps {
  title: string;
  showNav: boolean;
  showBack?: boolean;
  children: ReactNode;
}
export default function Page(props: IProps) {
  const render = () => {
    return (
      <div className="page-component">
        {props.showNav ? (
          <NavBar
            title={props.title || '甲状腺管理'}
            showBack={props.showBack || false}
          />
        ) : null}

        <div className="page-scroll-content">{props.children}</div>
      </div>
    );
  };
  return render();
}
