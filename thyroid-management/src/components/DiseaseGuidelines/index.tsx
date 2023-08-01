import { history } from 'umi';
import rightIcon from '@/assets/images/icon-right.png';
import './index.less';

const customList = [
  {
    id: 1,
    name: '甲状腺结节',
  },
  {
    id: 2,
    name: '甲状腺炎',
  },
  {
    id: 3,
    name: '甲减',
  },
  {
    id: 4,
    name: '甲亢',
  },
  {
    id: 5,
    name: '甲状腺癌',
  },
  {
    id: 6,
    name: '甲状腺囊肿',
  },
  {
    id: 7,
    name: '甲状腺肿大',
  },
  {
    id: 8,
    name: '桥本氏病',
  },
];
export default function DiseaseGuideLines() {
  const handList = (item: { id: any; name: any }) => {
    setTimeout(() => {
      history.push(`/Article?id=${item.id}&title=${item.name}`);
    }, 300);
  };
  const goArticle = () => {
    window.location.href =
      'https://service.g-hcare.com/#/MinApp/pages/detail/index?id=2c91808b83159ee401833afefc6c0746';
  };
  return (
    <div className="disease-guide-content">
      <div className="flex flex-center flex-between">
        <div className="sufferConnection-content-title">疾病指南</div>
        <div className="right" onClick={() => goArticle()}>
          甲状腺疾病预防
          <img alt="" src={rightIcon} />
        </div>
      </div>
      <div>
        {
          <div className="custom-content-list">
            {customList.length > 0 &&
              customList.map((v, i) => {
                return (
                  <div
                    className={'custom-content-list-value'}
                    key={i}
                    onClick={() => handList(v)}
                  >
                    {v.name}
                  </div>
                );
              })}
          </div>
        }
      </div>
    </div>
  );
}
