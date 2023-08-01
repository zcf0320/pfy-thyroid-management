import React, { useState } from 'react';
import styles from './index.less';
import help from '@/assets/images/home-why.png';
import { history } from 'umi';
import Page from '@/components/Page';
import { getToken } from '../../utils/tools';
import { USER_INFO } from '@/utils/CONSTANT';
export default function IndexPage() {
  const [show, setShow] = useState(false);
  const handleUse = () => {
    const token = getToken();
    if (!token) {
      history.push('/login');
    } else {
      const userInfo: any =
        localStorage.getItem(USER_INFO) &&
        JSON.parse(localStorage.getItem(USER_INFO)!);
      if (userInfo.thyroidEntryFlag === -1) {
        history.push('/thyroid-gland/custom');
      } else {
        history.push(
          `/thyroid-gland/SufferConnection?id=${userInfo.thyroidEntryFlag}`,
        );
      }
    }
  };
  return (
    <Page title="甲状腺管理" showNav showBack={false}>
      <div className={styles.home}>
        <img
          className={styles.help}
          src={help}
          alt=""
          onClick={() => setShow(!show)}
        />
        {show && (
          <div className={styles.show}>
            <div className={styles.showTitle}>
              临床最常见的是结节性甲状腺肿和甲状腺腺瘤，其中5%-15%为恶性，约占全身恶性肿瘤的1%。
              一般人群经触诊检出甲状腺结节比率3%-7%，超声检出率达20%-76%。
              大多数甲状腺结节是良性，女性发病率明显高于男性。
            </div>
          </div>
        )}
        <button
          className={styles.homeBtn}
          onClick={() => {
            handleUse();
          }}
        >
          立即使用
        </button>
      </div>
    </Page>
  );
}
