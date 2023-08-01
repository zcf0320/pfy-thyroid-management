import React, { useState, useEffect } from 'react';
import Page from '@/components/Page';
// import { Input } from 'antd';
import { InputItem } from 'antd-mobile';
import search from '@/assets/images/search.png';
import searchNull from '@/assets/images/search-null.png';
import { history } from 'umi';
import './index.less';
import gland from '@/api/gland';
const Search = () => {
  const [val, setVal] = useState('');
  const [list, setList] = useState([]) as any;
  const searchChange = async (val: any) => {
    await setVal(val);
  };
  useEffect(() => {}, [list, val]);
  const handDetail = (v: string, i: number) => {
    history.push(`/food-library/FoodDetail?pid=${i}`);
  };
  // 点击搜索
  const searchBtn = async () => {
    await gland.getFoodListByName(val).then((res: any) => {
      setList(res.data);
    });
  };
  // 去搜索页
  const handSearch = () => {
    //   history.push('/thyroid-gland/Search')
  };
  // 回车
  const searchEnter = async (e: any) => {
    if (e.keyCode == 13) {
      await gland.getFoodListByName(val).then((res: any) => {
        setList(res.data);
      });
    }
  };
  return (
    <Page title="食物含碘量" showNav showBack>
      <div className="search">
        <div className="food-search" onClick={() => handSearch()}>
          <img src={search} alt="" />
          {/* <Input
            onChange={(e) => searchChange(e)}
            value={val}
            onPressEnter={(e) => searchEnter(e)}
            bordered={false}
            placeholder="请输入食物名称"
          /> */}
          <InputItem
            onChange={(val) => searchChange(val)}
            //  value={val as any}
            onKeyDown={(e) => searchEnter(e)}
            //  bordered={false}
            placeholder="请输入食物名称"
          />
          <div className="search" onClick={() => searchBtn()}>
            搜索
          </div>
        </div>
        {list.length ? (
          <div className="search-record">
            {list.length > 0 &&
              list.map((v: any, i: number) => {
                return (
                  <div
                    className="search-record-content"
                    key={i}
                    onClick={() => handDetail(v.name, v.id)}
                  >
                    <img src={search} alt="" />
                    <span>
                      <b>{v.name.slice(0, 2)}</b>
                      {v.name.substr(3)}
                    </span>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="searchNull">
            <div className="img-null">
              <img src={searchNull} alt="" />
              <div className="img-title">暂无相关搜索</div>
            </div>
          </div>
        )}
      </div>
    </Page>
  );
};

export default Search;
