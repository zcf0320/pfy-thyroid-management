import React, { useState, useEffect } from 'react';
import Page from '@/components/Page';
import './index.less';
// import { Input } from 'antd';
import { InputItem, Picker, List, WhiteSpace, Toast } from 'antd-mobile';
import writeRight from '@/assets/images/write-right.png';
import { history } from 'umi';
import gland from '@/api/gland';
import { USER_INFO } from '@/utils/CONSTANT';

const seasons = [
  [
    {
      label: '0',
      value: '0',
    },
    {
      label: '1',
      value: '1',
    },
    {
      label: '2',
      value: '2',
    },
    {
      label: '3',
      value: '3',
    },
    {
      label: '4A',
      value: '4A',
    },
    {
      label: '4B',
      value: '4B',
    },
    {
      label: '4C',
      value: '4C',
    },
    {
      label: '5',
      value: '5',
    },
    {
      label: '6',
      value: '6',
    },
  ],
];
const TgaData = [
  [
    {
      label: '阴',
      value: '阴',
    },
    {
      label: '阳',
      value: '阳',
    },
  ],
];
const ThyData = [
  [
    {
      label: '阴',
      value: '阴',
    },
    {
      label: '阳',
      value: '阳',
    },
  ],
];
const Write = () => {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem('data') as any) || [],
  );
  // 血清甲状腺素
  const [serum, setSerum] = useState(
    data.serumThyroxine ? data.serumThyroxine : '',
  );
  // 血清游离甲状腺素
  const [dissociate, setDissociate] = useState(
    data.serumFreeThyroxine ? data.serumFreeThyroxine : '',
  );
  // 促甲状腺激素
  const [thyratron, setThyratron] = useState(
    data.stimulatingHormone ? data.stimulatingHormone : '',
  );
  // 促甲状腺受体抗体
  const [trad, setTrad] = useState(
    data.receptorAntibody ? data.receptorAntibody : '',
  );
  // 血清三碘甲状腺原氨酸
  const [troThy, setTroThy] = useState(
    data.serumTriiodothyronine ? data.serumTriiodothyronine : '',
  );
  // 抗甲状腺球蛋白抗体
  const [tga, setTga]: any = useState(
    data.globulinAntibody == 1
      ? '阴性'
      : data.globulinAntibody == 2
      ? '阳性'
      : '',
  );
  // 甲状腺刺激抗体
  const [thyroid, setThyroid]: any = useState(
    data.stimulatingAntibody == 1
      ? '阴性'
      : data.stimulatingAntibody == 2
      ? '阳性'
      : '',
  );
  // 总胆固醇
  const [total, setTotal] = useState(
    data.totalCholesterol ? data.totalCholesterol : '',
  );
  // 甘油三酯
  const [triglyceride, setTriglyceride] = useState(
    data.triglyceride ? data.triglyceride : '',
  );
  // 高密度脂蛋白胆固醇
  const [HDLcholesterol, setHDLCholesterol] = useState(
    data.highLipCholesterol ? data.highLipCholesterol : '',
  );
  // 低密度脂蛋白胆固醇
  const [LDLcholesterol, setLDLcholesterol] = useState(
    data.lowLipCholesterol ? data.lowLipCholesterol : '',
  );
  // 甲状腺刺激抗体
  const [antibody, setAntibody] = useState(
    data.noduleGrade ? data.noduleGrade : '',
  );
  const userInfo: any =
    localStorage.getItem(USER_INFO) &&
    JSON.parse(localStorage.getItem(USER_INFO)!);
  useEffect(() => {}, [data]);
  // 血清甲状腺素
  const changeSerum = (val: any) => {
    setSerum(val);
  };
  // 血清游离甲状腺素
  const changeDissociate = (val: any) => {
    setDissociate(val);
  };
  // 促甲状腺激素
  const changeThyratron = (val: any) => {
    setThyratron(val);
  };
  // 促甲状腺受体抗体
  const changeTarde = (val: any) => {
    setTrad(val);
  };
  // 血清三碘甲状腺原氨酸
  const changeTroths = (val: any) => {
    setTroThy(val);
  };
  // 抗甲状腺球蛋白抗体
  // 甲状腺刺激抗体
  // 总胆固醇
  const changeTotal = (val: any) => {
    setTotal(val);
  };
  // 甘油三酯
  const changeTriglyceride = (val: any) => {
    setTriglyceride(val);
  };
  // 高密度脂蛋白胆固醇
  const changeHDLcholesterol = (val: any) => {
    setHDLCholesterol(val);
  };
  // 低密度脂蛋白胆固醇
  const changeLDLcholesterol = (val: any) => {
    setLDLcholesterol(val);
  };
  // 甲状腺刺激抗体
  const handChemical = () => {
    let thyroidInfoReq: any = {
      // 抗甲状腺球蛋白抗体 1- 阴性 2 阳性
      globulinAntibody: tga == '阴' ? 1 : tga == '阳' ? 2 : '',
      // 高密度脂蛋白胆固醇
      highLipCholesterol: HDLcholesterol,
      // 低密度脂蛋白胆固醇
      lowLipCholesterol: LDLcholesterol,
      // 结节等级
      noduleGrade: antibody.toString(),
      // 促甲状腺受体抗体
      receptorAntibody: trad,
      // 血清游离甲状腺素
      serumFreeThyroxine: dissociate,
      // 血清甲状腺素
      serumThyroxine: serum,
      // 血清三碘甲状腺原氨酸
      serumTriiodothyronine: troThy,
      // 甲状腺刺激抗体 1- 阴性 2 阳性
      stimulatingAntibody: thyroid == '阴' ? 1 : thyroid == '阳' ? 2 : '',
      // 促甲状腺激素
      stimulatingHormone: thyratron,
      // 总胆固醇
      totalCholesterol: total,
      // 甘油三酯
      triglyceride: triglyceride,
      url: JSON.parse(localStorage.getItem('url') as any),
    };
    const obj = { ...thyroidInfoReq };
    delete obj.url;
    function f(obj: any) {
      let arr = [];
      for (let i in obj) {
        let newObj = {} as any;
        newObj[i] = obj[i];
        newObj.title = obj[i];
        arr.push(newObj);
      }
      return arr;
    }
    const arr = f(obj).every((v) => v.title === '');
    if (arr) {
      Toast.info('请填写信息');
    } else {
      localStorage.removeItem('data');
      gland.reportVing(thyroidInfoReq).then((res: any) => {
        // 异常数量
        if (res.data) {
          history.push(`/thyroid-gland/Chemical?TakeId=${res.data}`);
          localStorage.removeItem('url');
        }
      });
    }
  };

  return (
    <Page title="甲状腺管理" showNav showBack>
      <div className="write">
        <div className="write-top">
          <div className="write-top-title">
            <span>您好!</span>
            <span>{userInfo.userCenterName}</span>
          </div>
        </div>
        <div className="write-content-top">
          <div id="title-to" className="write-content-top-title">
            甲状腺功能
          </div>
          <div className="write-content-top-content">
            <div className="write-content-top-content-left">血清甲状腺素</div>
            <div className="write-content-top-content-right">
              {/* <Input
                bordered={false}
                placeholder="请输入"
                value={serum}
                onChange={(e) => changeSerum(e)}
              /> */}

              <InputItem
                //  bordered={false}
                placeholder="请输入"
                value={serum}
                onChange={(val) => changeSerum(val)}
              />
              <span>nmol/L</span>
            </div>
          </div>
          <div className="write-content-top-content">
            <div className="write-content-top-content-left">
              血清游离甲状腺素
            </div>
            <div className="write-content-top-content-right">
              {/* <Input
                bordered={false}
                placeholder="请输入"
                value={dissociate}
                onChange={(e) => changeDissociate(e)}
              /> */}
              <InputItem
                //  bordered={false}
                placeholder="请输入"
                value={dissociate}
                onChange={(val) => changeDissociate(val)}
              />
              <span>nmol/L</span>
            </div>
          </div>
          <div className="write-content-top-content">
            <div className="write-content-top-content-left">促甲状腺激素</div>
            <div className="write-content-top-content-right">
              {/* <Input
                bordered={false}
                placeholder="请输入"
                onChange={(e) => changeThyratron(e)}
                value={thyratron}
              /> */}
              <InputItem
                //  bordered={false}
                placeholder="请输入"
                value={thyratron}
                onChange={(val) => changeThyratron(val)}
              />
              <span>mU/L</span>
            </div>
          </div>
          <div className="write-content-top-content">
            <div className="write-content-top-content-left">
              促甲状腺受体抗体
            </div>
            <div className="write-content-top-content-right">
              {/* <Input
                bordered={false}
                placeholder="请输入"
                onChange={(e) => changeTarde(e)}
                value={trad}
              /> */}
              <InputItem
                //  bordered={false}
                placeholder="请输入"
                value={trad}
                onChange={(val) => changeTarde(val)}
              />
              <span>U/L</span>
            </div>
          </div>
          <div className="write-content-top-content">
            <div className="write-content-top-content-left">
              血清三碘甲状腺原氨酸
            </div>
            <div className="write-content-top-content-right">
              {/* <Input
                bordered={false}
                placeholder="请输入"
                onChange={(e) => changeTroths(e)}
                value={troThy}
              /> */}
              <InputItem
                //  bordered={false}
                placeholder="请输入"
                value={troThy}
                onChange={(val) => changeTroths(val)}
              />
              <span>nmol/L</span>
            </div>
          </div>
          {/* <div className="write-content-top-content">
            <div className="write-content-top-content-left">
              抗甲状腺球蛋白抗体
            </div>
            <div className="write-content-top-content-right">
              <div className="write-content-top-content-right-value">
                <span>{tga}</span>
                <img src={writeRight} alt="" />
              </div>
            </div>
          </div> */}
          <Picker
            className="prick"
            data={TgaData}
            title="抗甲状腺球蛋白抗体"
            cascade={false}
            value={tga}
            onChange={(v) => setTga(v)}
            onOk={(v) => setTga(v)}
          >
            <List.Item arrow="horizontal">抗甲状腺球蛋白抗体</List.Item>
          </Picker>
          <div className="write-content-top-content-to" />
          {/* <div className="write-content-top-content">
            <div className="write-content-top-content-left">甲状腺刺激抗体</div>
            <div className="write-content-top-content-right">
              <div className="write-content-top-content-right-value">
                <span>{thyroid}</span>
                <img src={writeRight} alt="" />
              </div>
            </div>
          </div> */}
          <Picker
            className="prick"
            data={ThyData}
            title="甲状腺刺激抗体"
            cascade={false}
            value={thyroid}
            onChange={(v) => setThyroid(v)}
            onOk={(v) => setThyroid(v)}
          >
            <List.Item arrow="horizontal">甲状腺刺激抗体</List.Item>
          </Picker>
        </div>
        <div className="write-content-top">
          <div className="write-content-top-title">血脂</div>
          <div className="write-content-top-content">
            <div className="write-content-top-content-left">总胆固醇</div>
            <div className="write-content-top-content-right">
              {/* <Input
                bordered={false}
                placeholder="请输入"
                onChange={(e) => changeTotal(e)}
                value={total}
              /> */}
              <InputItem
                //  bordered={false}
                placeholder="请输入"
                value={total}
                onChange={(val) => changeTotal(val)}
              />
              <span>nmol/L</span>
            </div>
          </div>
          <div className="write-content-top-content">
            <div className="write-content-top-content-left">甘油三酯</div>
            <div className="write-content-top-content-right">
              {/* <Input
                bordered={false}
                placeholder="请输入"
                onChange={(e) => changeTriglyceride(e)}
                value={triglyceride}
              /> */}
              <InputItem
                //  bordered={false}
                placeholder="请输入"
                value={triglyceride}
                onChange={(val) => changeTriglyceride(val)}
              />
              <span>nmol/L</span>
            </div>
          </div>
          <div className="write-content-top-content">
            <div className="write-content-top-content-left">
              高密度脂蛋白胆固醇
            </div>
            <div className="write-content-top-content-right">
              {/* <Input
                bordered={false}
                placeholder="请输入"
                onChange={(e) => changeHDLcholesterol(e)}
                value={HDLcholesterol}
              /> */}
              <InputItem
                //  bordered={false}
                placeholder="请输入"
                value={HDLcholesterol}
                onChange={(val) => changeHDLcholesterol(val)}
              />
              <span>U/L</span>
            </div>
          </div>
          <div className="write-content-top-content">
            <div className="write-content-top-content-left">
              低密度脂蛋白胆固醇
            </div>
            <div className="write-content-top-content-right">
              {/* <Input
                bordered={false}
                placeholder="请输入"
                onChange={(e) => changeLDLcholesterol(e)}
                value={LDLcholesterol}
              /> */}
              <InputItem
                //  bordered={false}
                placeholder="请输入"
                value={LDLcholesterol}
                onChange={(val) => changeLDLcholesterol(val)}
              />
              <span>/L</span>
            </div>
          </div>
        </div>
        <div className="write-content-top">
          <div className="write-content-top-title">甲状腺结节</div>
          {/* <div className="write-content-top-content"> */}
          {/* <div className="write-content-top-content-left">甲状腺刺激抗体</div>
            <div className="write-content-top-content-right">
              <div className="write-content-top-content-right-value">
                <span>{antibody}</span>
                <img src={writeRight} alt="" />
              </div>
            </div> */}
          <Picker
            className="prick"
            data={seasons}
            title="甲状腺结节等级"
            cascade={false}
            value={antibody}
            onChange={(v) => setAntibody(v)}
            onOk={(v) => setAntibody(v)}
          >
            <List.Item arrow="horizontal">甲状腺刺激抗体</List.Item>
          </Picker>
          {/* </div> */}
        </div>
        <div className="write-footer">
          <button
            onClick={() => {
              history.goBack();
            }}
          >
            返回
          </button>
          <button onClick={() => handChemical()}>查看化验解析</button>
        </div>
      </div>
    </Page>
  );
};

export default Write;
