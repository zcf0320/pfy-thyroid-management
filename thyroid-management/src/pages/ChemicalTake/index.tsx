import Page from '@/components/Page';
import React, { useState, useEffect } from 'react';
import './index.less';
import { history, useLocation } from 'umi';
import take from '@/assets/images/chemical-take.png';
import gland from '@/api/gland';
import moment from 'moment';
const pageNum = 1;
const pageSize = 1000;
const ChemicalTake = () => {
  const location = useLocation();
  const [data, setData]: any = useState([]);
  const [QuesData, setQuesData]: any = useState([]);
  // const [pageNum, setPageNum] = useState(1);
  // const [pageSize, setpageSize] = useState(1000);
  const [title, setTitle] = useState('报告记录');
  useEffect(() => {
    if (location.query.id == 'selfhood') {
      setTitle('测评记录');
      gland.getQuestionnaire(pageNum, pageSize).then((res: any) => {
        setQuesData(res.data.records);
      });
    } else if (location.query.id == 'chemical') {
      setTitle('报告记录');
      gland.queryTake(pageNum, pageSize).then((res: any) => {
        setData(res.data.records);
      });
    }
  }, [location.query.id]);
  return (
    <Page title={title} showNav showBack>
      <div className="ChemicalTake">
        {location.query.id == 'selfhood' ? (
          QuesData.length ? (
            QuesData.length > 0 &&
            QuesData.map((v: any, i: number) => {
              return (
                <div
                  className="ChemicalTake-card"
                  key={i}
                  onClick={() =>
                    history.push(
                      `/questionnaire-result?resultId=${v.resultId}&questionnaireCode=${v.code}`,
                    )
                  }
                >
                  <span>{v.questionanireName}</span>
                  <span>{moment(v.date).format('YYYY-MM-DD HH:mm:ss')}</span>
                </div>
              );
            })
          ) : (
            <div className="NoRecord">
              <div className="NoRecord-img"></div>
              <div className="NoRecord-text">暂无报告记录</div>
            </div>
          )
        ) : data.length ? (
          data.length > 0 &&
          data.map((v: any, i: number) => {
            return (
              <div className="ChemicalTake-card" key={i}>
                <span
                  onClick={() =>
                    history.push(`/thyroid-gland/Chemical?TakeId=${v.id}`)
                  }
                >
                  {moment(v.createTime).format('YYYY-MM-DD HH:mm:ss')}
                </span>
                {i == 0 ? <img src={take} alt="" /> : ''}
              </div>
            );
          })
        ) : (
          <div className="NoRecord">
            <div className="NoRecord-img"></div>
            <div className="NoRecord-text">暂无报告记录</div>
          </div>
        )}
      </div>
    </Page>
  );
};

export default ChemicalTake;
