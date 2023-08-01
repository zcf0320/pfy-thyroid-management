import React, { useState, useEffect } from 'react';
import Page from '@/components/Page';
import './index.less';
import { useLocation } from 'umi';
import gland from '@/api/gland';
const FoodDetail = () => {
  const [foodList, setFoodList]: any = useState([]);
  const [list, setList] = useState({});
  const location = useLocation();
  useEffect(() => {
    if (location.query.cid && location.query.cid) {
      gland
        .getFoodListByCid(location.query.cid && location.query.cid)
        .then((res: any) => {
          setFoodList(res.data);
        });
    }
    if (location.query.pid && location.query.pid) {
      gland
        .getFoodListByPid(location.query.pid && location.query.pid)
        .then((res: any) => {
          setList(res.data);
        });
    }
  }, []);

  return (
    <Page title="食物含碘量" showNav showBack>
      <div className="page-food-result flex">
        <div className="food-result-table">
          <div className="table-head">
            <div className="table-head-item">品名</div>
            <div className="table-head-item">GI值</div>
            <div className="table-head-item">热量/100g</div>
            <div className="table-head-item flex-125">含碘量/ug</div>
          </div>
          {location.query.pid ? (
            <div className="table-tr" key={list.id}>
              <div className="table-td">{list.name || '-'}</div>
              <div className="table-td">{list.gi || '-'}</div>
              <div className="table-td">{list.calories || '-'}</div>
              <div className="table-td flex-125">
                <div className="calories">
                  <div>{list.lodineContent || '-'}</div>
                  <div className="suggestion">
                    {/* {item.suggestion === 1 && <img className='img' src={`${ossHost}images/suggestion1.png`} />}
                          {item.suggestion === 2 && <img className='img' src={`${ossHost}images/suggestion2.png`} />}
                          {item.suggestion === 3 && <img className='img' src={`${ossHost}images/suggestion3.png`} />} */}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            foodList.map((item: any) => {
              return (
                <div className="table-tr" key={item.id}>
                  <div className="table-td">{item.name || '-'}</div>
                  <div className="table-td">{item.gi || '-'}</div>
                  <div className="table-td">{item.calories || '-'}</div>
                  <div className="table-td flex-125">
                    <div className="calories">
                      <div>{item.lodineContent || '-'}</div>
                      <div className="suggestion">
                        {/* {item.suggestion === 1 && <img className='img' src={`${ossHost}images/suggestion1.png`} />}
                          {item.suggestion === 2 && <img className='img' src={`${ossHost}images/suggestion2.png`} />}
                          {item.suggestion === 3 && <img className='img' src={`${ossHost}images/suggestion3.png`} />} */}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </Page>
  );
};

export default FoodDetail;
