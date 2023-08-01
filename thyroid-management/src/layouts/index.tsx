import React from 'react';
import Store from '@/store';
import { Provider } from 'mobx-react';
import './index.less';

export default (props: any) => {
  return (
    <Provider {...Store}>
      <div className="page">{props.children}</div>
    </Provider>
  );
};
