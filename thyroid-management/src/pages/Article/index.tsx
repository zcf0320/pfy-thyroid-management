import { Tabs } from 'antd-mobile';
import { articleContent } from './articleContent';
import Page from '@/components/Page/index';
import './index.less';
import { useLocation } from 'umi';
import { useState } from 'react';

const tab = {
  1: [
    {
      id: 101,
      title: '风险和预防',
    },
    {
      id: 102,
      title: '疾病介绍',
    },
    {
      id: 103,
      title: '健康科普',
    },
    {
      id: 104,
      title: '诊断或分期',
    },
    {
      id: 105,
      title: '治疗方式',
    },
    {
      id: 106,
      title: '治疗后康复',
    },
  ],
  2: [
    {
      id: 201,
      title: '风险和预防',
    },
    {
      id: 202,
      title: '疾病介绍',
    },
    {
      id: 203,
      title: '健康科普',
    },
    {
      id: 204,
      title: '诊断或分期',
    },
    {
      id: 205,
      title: '治疗方式',
    },
  ],
  3: [
    {
      id: 301,
      title: '风险和预防',
    },
    {
      id: 302,
      title: '疾病介绍',
    },
    {
      id: 303,
      title: '健康科普',
    },
    {
      id: 304,
      title: '诊断或分期',
    },
    {
      id: 305,
      title: '治疗方式',
    },
    {
      id: 306,
      title: '治疗后康复',
    },
  ],
  4: [
    {
      id: 401,
      title: '风险和预防',
    },
    {
      id: 402,
      title: '疾病介绍',
    },
    {
      id: 403,
      title: '健康科普',
    },
    {
      id: 404,
      title: '诊断或分期',
    },
    {
      id: 405,
      title: '治疗方式',
    },
  ],
  5: [
    {
      id: 501,
      title: '风险和预防',
    },
    {
      id: 502,
      title: '疾病介绍',
    },
    {
      id: 503,
      title: '健康科普',
    },
    {
      id: 504,
      title: '诊断或分期',
    },
    {
      id: 505,
      title: '治疗方式',
    },
  ],
  6: [
    {
      id: 601,
      title: '风险和预防',
    },
    {
      id: 602,
      title: '疾病介绍',
    },
    {
      id: 603,
      title: '健康科普',
    },
    {
      id: 604,
      title: '诊断或分期',
    },
    {
      id: 605,
      title: '治疗方式',
    },
  ],
  7: [
    {
      id: 701,
      title: '风险和预防',
    },
    {
      id: 702,
      title: '疾病介绍',
    },
    {
      id: 703,
      title: '健康科普',
    },
    {
      id: 704,
      title: '诊断或分期',
    },
    {
      id: 705,
      title: '治疗方式',
    },
    {
      id: 706,
      title: '治疗后康复',
    },
  ],
  8: [
    {
      id: 801,
      title: '风险和预防',
    },
    {
      id: 802,
      title: '疾病介绍',
    },
    {
      id: 803,
      title: '健康科普',
    },
    {
      id: 804,
      title: '诊断或分期',
    },
    {
      id: 805,
      title: '治疗方式',
    },
  ],
};
const Article = () => {
  const location: any = useLocation();
  const id = location.query.id;
  const title = location.query.title || '甲状腺管理';
  const [active, setActive] = useState(0);
  const [articleId, setArticleId] = useState(tab[id][0].id);
  const tabs: Array<{ id: number; title: string }> = tab[id];

  const changeTab = (id: number, index: number) => {
    let scrollIndex = active > index ? index - 3 : index + 3;
    // 边界判定
    if (scrollIndex > tabs.length - 1) {
      scrollIndex = tabs.length - 1;
    }
    if (scrollIndex < 0) {
      scrollIndex = 0;
    }
    const element = document.getElementsByClassName('tab-item')[scrollIndex];
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });

    setActive(index);
    setArticleId(id);
  };
  return (
    <Page title={title} showNav showBack>
      <div className="article-page">
        <div className="mask"></div>

        <div className="tabs">
          {tabs.map((item: { id: number; title: string }, index) => {
            return (
              <div
                key={item.id}
                className={`tab-item ${active === index ? 'active' : ''}`}
                onClick={() => {
                  changeTab(item.id, index);
                }}
              >
                {item.title}
              </div>
            );
          })}
        </div>

        <div className="article-content">
          <div
            dangerouslySetInnerHTML={{ __html: articleContent[articleId] }}
          ></div>
        </div>
      </div>
    </Page>
  );
};
export default Article;
