import React, { useState, useEffect } from 'react';
import './index.less';
import Page from '@/components/Page';
// import { Input } from 'antd';
import { InputItem } from 'antd-mobile';
import { history, useLocation } from 'umi';
import search from '@/assets/images/search.png';
import drinks from '@/assets/images/drinks.png';
import cereals from '@/assets/images/cereals.png';
import dessert from '@/assets/images/dessert.png';
import flesh from '@/assets/images/flesh.png';
import greens from '@/assets/images/greens.png';
import products from '@/assets/images/products.png';
import saccharides from '@/assets/images/saccharides.png';
import slump from '@/assets/images/slump.png';
const searchList = [
  {
    name: '水果类',
    url: slump,
    children: [
      {
        name: '1',
        num: '456',
      },
    ],
  },
  {
    name: '蔬菜类',
    url: greens,
    children: [
      {
        name: '2',
        num: '456',
      },
    ],
  },
  {
    name: '五谷根茎类',
    url: cereals,
    children: [
      {
        name: '3',
        num: '456',
      },
    ],
  },
  {
    name: '蛋豆鱼肉类',
    url: flesh,
    children: [
      {
        name: '4',
        num: '456',
      },
    ],
  },
  {
    name: '乳类',
    url: products,
    children: [
      {
        name: '5',
        num: '456',
      },
    ],
  },
  {
    name: '零食点心类',
    url: dessert,
    children: [
      {
        name: '6',
        num: '456',
      },
      {
        name: '6.1',
        num: '456',
      },
    ],
  },
  {
    name: '糖类',
    url: saccharides,
    children: [
      {
        name: '7',
        num: '456',
      },
    ],
  },
  {
    name: '饮料类',
    url: drinks,
    children: [
      {
        name: '8',
        num: '456',
      },
    ],
  },
];
const Food = () => {
  const location = useLocation();
  const [val, setVal] = useState('');
  const searchChange = (e: any) => {
    setVal(e.target.value);
  };
  // 点击搜索
  const searchBtn = () => {};
  // 去搜索页
  const handSearch = () => {
    history.push('/food-library/Search');
  };
  // 回车
  const searchEnter = (e: any) => {};
  // 切换
  const hanDetail = (v: string, i: number) => {
    history.push(`/food-library/FoodDetail?cid=${i}`);
  };
  return (
    <Page title="食物含碘量" showNav showBack>
      <div className="Food">
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
            onChange={(e) => searchChange(e)}
            value={val}
            onVirtualKeyboardConfirm={(e) => searchEnter(e)}
            //  bordered={false}
            placeholder="请输入食物名称"
          />
          <div className="search" onClick={() => searchBtn()}>
            搜索
          </div>
        </div>
        <div className="food-content">
          <div className="food-content-label">
            {searchList.length > 0 &&
              searchList.map((v, i) => {
                return (
                  <div
                    className="food-content-list"
                    key={v.name}
                    onClick={() => hanDetail(v.name, i + 1)}
                  >
                    <img src={v.url} alt="" />
                    <span className="food-content-list-text">{v.name}</span>
                    {/* <div className={`${activeIndex == i ? 'food-content-list-border':''}`}></div> */}
                    {/* <div className={`${activeIndex == i ? 'food-content-list-data':'food-content-list-nodata'}`}>
                                    {
                                        v.children.length>0&&v.children.map((v,i)=>{
                                            return (
                                                <div key={v.name}
                                                className="food-content-list-data-content"
                                                >
                                                    <span>{v.name}</span>
                                                    <span>{v.num}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div> */}
                  </div>
                );
              })}
            {/* <div className="food-content-list">
                <img src={slump} alt="" />
                <span>水果类</span>
              </div>
              <div className="food-content-list">
                <img src={greens} alt="" />
                <span>蔬菜类</span>
              </div>
              <div className="food-content-list">
                <img src={cereals} alt="" />
                <span>五谷根茎类</span>
              </div>
              <div className="food-content-list">
                <img src={flesh} alt="" />
                <span>蛋豆鱼肉类</span>
              </div>
              <div className="food-content-list">
                <img src={products} alt="" />
                <span>乳类</span>
              </div>
              <div className="food-content-list">
                <img src={dessert} alt="" />
                <span>零食点心类</span>
              </div>
              <div className="food-content-list">
                <img src={saccharides} alt="" />
                <span>糖类</span>
              </div>
              <div className="food-content-list">
                <img src={drinks} alt="" />
                <span>饮料类</span>
              </div> */}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Food;
