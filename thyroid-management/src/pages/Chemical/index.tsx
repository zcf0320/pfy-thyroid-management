import React, { useState, useEffect } from 'react';
import Page from '@/components/Page';
import './index.less';
import upward from '@/assets/images/icon-upward.png';
import upDown from '@/assets/images/icon-upDown.png';
import { history, useLocation } from 'umi';
import DiseaseGuideLines from '@/components/DiseaseGuidelines';
import DiseaseTools from '@/components/DiseaseTools';
import { USER_INFO } from '@/utils/CONSTANT';
import gland from '@/api/gland';
import averAge from '@/assets/images/average.png';
const Chemical = () => {
  const location = useLocation();
  const [unusualNum, setUnusualNum]: any = useState();
  const [numFlag, setNumFlag]: any = useState();
  const [data, setData] = useState([]);
  const objData: any = {
    serumThyroxineResult: '血清甲状腺素',
    serumFreeThyroxineResult: '血清游离甲状腺素',
    stimulatingHormoneResult: '促甲状腺激素',
    receptorAntibodyResult: '促甲状腺受体抗体',
    serumTriiodothyronineResult: '血清三碘甲状腺原氨酸',
    globulinAntibodyResult: '抗甲状腺球蛋白抗体',
    stimulatingAntibodyResult: '甲状腺刺激抗体',
    totalCholesterolResult: '总胆固醇',
    triglycerideResult: '甘油三酯',
    highLipCholesterolResult: '高密度脂蛋白胆固醇',
    lowLipCholesterolResult: '低密度脂蛋白胆固醇',
    noduleGrade: '甲状腺结节等级',
    unusualNum: '',
    urls: '',
  };
  // 报告记录详情
  useEffect(() => {
    if (location.query.TakeId) {
      gland.gainDetail(location.query.TakeId).then((res: any) => {
        const obj = res.data;
        setUnusualNum(obj.unusualNum);
        if (obj.unusualNum > 0) {
          setNumFlag(true);
        } else {
          setNumFlag(false);
        }

        function f(obj: any) {
          let arr = [];
          for (let i in obj) {
            let newObj = {} as any;
            newObj[i] = obj[i];
            for (let ind in objData) {
              if (i == ind) {
                newObj.title = objData[ind];
                newObj.flag = false;
                // newObj.flagNum = obj[i];
                // newObj.id = objData[ind]
                if (newObj.title == '血清甲状腺素') {
                  newObj.flagNum = obj[i];
                  // 偏高
                  newObj.HeightContent = {
                    // 可能原因：
                    one: '甲状腺功能亢进症、亚急性甲状腺炎早期',
                    // 疾病风险：
                    two: '甲亢危象',
                    three:
                      '挂号科室-内分泌科复查时间-停药后半年左右，如有心跳加快、手震等症状出现，需及时复查。',
                    four: '生活方式-充足的休息、调节情绪；饮食建议-（宜）优质蛋白、增加餐次；（忌）富含碘的食物、刺激性食物、部分中药；',
                    five: '硫脲类药物、碘131放射治疗、外科手术治疗',
                  };
                  // 偏低
                  newObj.DownContent = {
                    // 可能原因：
                    one: '甲状腺功能减退',
                    // 疾病风险：
                    two: '/',
                    three: '挂号科室-内分泌科复查时间-半年复查一次',
                    four: '生活方式-充足休息、提供身体合适能量、调节情绪',
                    five: '左甲状腺素钠、合理用药',
                  };
                } else if (newObj.title == '血清游离甲状腺素') {
                  newObj.flagNum = obj[i];
                  // 偏高
                  newObj.HeightContent = {
                    // 可能原因：
                    one: '甲状腺疾病、精神病、妊娠期、遗传因素、情绪、环境因素',
                    // 疾病风险：
                    two: '甲亢危象',
                    three:
                      '挂号科室-内分泌科复查时间-每3-6月复查一次，病情变化及时就诊。',
                    four: '生活方式-治疗需遵医嘱、合理饮食、适量运动、调节情绪；饮食建议-（宜）具有抑制甲状腺素合成的食物、多吃含钾、钙、磷食物（忌）含碘高的食物、温热辛辣食物、食物纤维',
                    five: '专科指导、结合其他指标进行分析、控制诱因',
                  };
                  // 偏低
                  newObj.DownContent = {
                    // 可能原因：
                    one: '甲状腺功能减退、垂体性或无痛性亚急性甲状腺炎、低白蛋白血症、老年人、肝脏疾患',
                    // 疾病风险：
                    two: '/',
                    three:
                      '挂号科室-内分泌科复查时间-每3-6月复查一次，病情变化及时就诊。',
                    four: '生活方式-合理饮食、适量运动、调节情绪；',
                    five: '孕期用药小剂量、接受合理治疗、定期筛查',
                  };
                } else if (newObj.title == '促甲状腺激素') {
                  newObj.flagNum = obj[i];
                  // 偏高
                  newObj.HeightContent = {
                    // 可能原因：
                    one: '摄入微量元素、原发性甲状腺功能减退、促甲状腺激素分泌型垂体瘤、腺垂体功能减退、亚急性甲状腺炎恢复期',
                    // 疾病风险：
                    two: '/',
                    three:
                      '挂号科室-内分泌科复查时间-每3-6月复查一次，病情变化及时就诊。',
                    four: '生活方式生活方式--合理饮食合理饮食、适当运动适当运动、饮食建议-（宜）高热量食物、适量摄入碘、多补充蛋白质、多补充维生素；（忌）刺激性食物、会使甲状腺肿大的食物',
                    five: '专业指导、接受正规治疗、定期筛查',
                  };
                  // 偏低
                  newObj.DownContent = {
                    // 可能原因：
                    one: '甲状腺相关疾病、药物影响、遗传及环境因素、肝脏疾患、年长者',
                    // 疾病风险：
                    two: '/',
                    three:
                      '挂号科室-内分泌科复查时间-每3-6月复查一次，病情变化及时就诊。',
                    four: '调节情绪、生活方式-合理饮食、适量运动、接受正规治疗',
                    five: '专业指导',
                  };
                } else if (newObj.title == '促甲状腺受体抗体') {
                  newObj.flagNum = obj[i];
                  // 偏高
                  newObj.HeightContent = {
                    // 可能原因：
                    one: '/',
                    // 疾病风险：
                    two: '内分泌功能减退',
                    three: '/',
                    four: '/',
                    five: '/',
                  };
                  // 偏低
                  newObj.DownContent = {
                    // 可能原因：
                    one: '/',
                    // 疾病风险：
                    two: '/',
                    three: '/',
                    four: '/',
                    five: '/',
                  };
                } else if (newObj.title == '血清三碘甲状腺原氨酸') {
                  newObj.flagNum = obj[i];
                  // 偏高
                  newObj.HeightContent = {
                    // 可能原因：
                    one: '甲状腺功能亢进症',
                    // 疾病风险：
                    two: '/',
                    three:
                      '挂号科室-内分泌科复查时间-停药后半年左右，如有心跳加快、手震等症状出现，需及时复查。',
                    four: '生活方式-充足的休息、调节情绪；饮食建议-（宜）高热量、优质蛋白、增加餐次、富含维生素、矿物质食物；（忌）富含碘的食物、刺激性食物、牡蛎、昆布、海藻等中药 ',
                    five: '硫脲类药物、碘131放射治疗、外科手术治疗',
                  };
                  // 偏低
                  newObj.DownContent = {
                    // 可能原因：
                    one: '甲状腺功能减退',
                    // 疾病风险：
                    two: '/',
                    three: '挂号科室-内分泌科复查时间-半年复查一次',
                    four: '/',
                    five: '左甲状腺素钠、合理用药',
                  };
                } else if (newObj.title == '抗甲状腺球蛋白抗体') {
                  newObj.flagStatus = obj[i];
                  // 偏高
                  newObj.HeightContent = {
                    // 可能原因：
                    one: '正常人-特别是女性和老年人，TGAb约有2%~10%',
                    // 疾病风险：
                    two: '慢性淋巴细胞性甲状腺炎、Graves病、甲状腺功能减退的患者、甲状腺功能亢进症患者、某些非甲状腺疾病',
                    three: '/',
                    four: '/',
                    five: '/',
                  };
                  // 偏低
                  newObj.DownContent = {
                    // 可能原因：
                    one: '/',
                    // 疾病风险：
                    two: '/',
                    three: '/',
                    four: '/',
                    five: '/',
                  };
                } else if (newObj.title == '甲状腺刺激抗体') {
                  newObj.flagStatus = obj[i];
                  // 偏高
                  newObj.HeightContent = {
                    // 可能原因：
                    one: '/',
                    // 疾病风险：
                    two: '/',
                    three: '/',
                    four: '/',
                    five: '/',
                  };
                  // 偏低
                  newObj.DownContent = {
                    // 可能原因：
                    one: '/',
                    // 疾病风险：
                    two: '/',
                    three: '/',
                    four: '/',
                    five: '/',
                  };
                } else if (newObj.title == '总胆固醇') {
                  newObj.flagNum = obj[i];
                  // 偏高
                  newObj.HeightContent = {
                    // 可能原因：
                    one: '检查前有剧烈运动、进食过多高胆固醇的食物、干细胞受损、维生素及激素类药物反应、家族性高胆固醇血症、40岁以上男性或绝经期后女性、有家族病史者、有高血压、糖尿病、肥胖、吸烟者、肝胆疾病高发、急性失血、多发性骨髓瘤、老年性白内障、已患冠心病者',
                    // 疾病风险：
                    two: '引发心脑血管疾病、引发高胆固醇血症',
                    three: '挂号科室-心内科、复查时间-3个月',
                    four: '饮食建议-（宜）增加粗粮和薯类、新鲜蔬菜、水果、豆制品、瘦肉、低盐饮食、奶制品、植物油、降低胆固醇的食物;饮食建议-（忌）过多热量、饱和脂肪、甜食、胆固醇含量高的食物、腌熏制品、油炸食品、酒;运动建议-（宜）慢跑（忌）剧烈运动',
                    five: '/',
                  };
                  // 偏低
                  newObj.DownContent = {
                    // 可能原因：
                    one: '继发性低胆固醇血症、原发性低胆固醇血症',
                    // 疾病风险：
                    two: '导致免疫功能下降引发乙肝见于恶性肿瘤',
                    three: '挂号科室-消化内科、内分泌科复查时间-3个月',
                    four: '生活方式生活方式--加强营养加强营养、注意减肥注意减肥节食节食',
                    five: '/',
                  };
                } else if (newObj.title == '甘油三酯') {
                  newObj.flagNum = obj[i];
                  // 偏高
                  newObj.HeightContent = {
                    // 可能原因：
                    one: '酗酒、肥胖、糖尿病、药物、甲状腺功能减退、过多食入高油脂食物、肾上腺皮质功能亢进、饮食及检查时间、检查前有剧烈运动、40岁以上男性或绝经女性、有冠心病或动脉粥样硬化病家族史、高血压、糖尿病、肥胖、吸烟者、已患冠心病者',
                    // 疾病风险：
                    two: '肥胖、代谢综合征、心血管病、致动脉粥样硬化、2型糖尿病及并发症、视网膜病变及黄斑病变',
                    three: '挂号科室-心内科、复查时间-3个月',
                    four: '生活方式-控制体重、合理饮食、限制饮酒、适量运动、戒烟;饮食建议-（宜）富含膳食纤维的食物、富含维生素C的食物、菌藻类食物、绿茶、优质蛋白质的食物;饮食建议-（忌）高脂肪的食物、高胆固醇食物、饮食过咸、暴饮暴食、过多的碳水化合物、酒精;运动建议-（宜）快走、慢跑；（忌）剧烈运动',
                    five: '/',
                  };
                  // 偏低
                  newObj.DownContent = {
                    // 可能原因：
                    one: '饮食因素检查时处于饥饿状态、胆道疾病、肝功能严重障碍、肾上腺皮质功能减退、甲状腺功能亢进',
                    // 疾病风险：
                    two: '/',
                    three: '挂号科室-消化内科、肾内科复查时间-3个月',
                    four: '生活方式-合理饮食、适量运动、防止便秘',
                    five: '/',
                  };
                } else if (newObj.title == '高密度脂蛋白胆固醇') {
                  newObj.flagNum = obj[i];
                  // 偏高
                  newObj.HeightContent = {
                    // 可能原因：
                    one: '少至中量饮酒、药物因素、体力活动、家族性高a-脂蛋白血症、病毒性肝炎、慢性酒精中毒',
                    // 疾病风险：
                    two: '/',
                    three: '挂号科室-心内科、复查时间-3个月',
                    four: '生活方式-控制体重、合理饮食、限制饮酒、戒烟、适量运动;饮食建议-（宜）易消化的食物、优质蛋白食物、鲜嫩蔬菜、新鲜水果;饮食建议-（忌）酒精、难消化的食物、高脂肪、刺激性食物;运动建议-充足的体育活动、热身与放松活动、剧烈运动',
                    five: '/',
                  };
                  // 偏低
                  newObj.DownContent = {
                    // 可能原因：
                    one: '遗传因素、严重营养不良者、肥胖者、吸烟、高甘油三酯血症患者、糖尿病、肝炎和肝硬化等疾病状态、载脂蛋白AI缺乏症、家族性低a脂蛋白血症、鱼眼病',
                    // 疾病风险：
                    two: '心脑血管疾病',
                    three: '挂号科室-心内科、复查时间-3个月',
                    four: '生活方式-减少饱和脂肪酸摄入、减轻体重、增加有规律的体力活动、戒烟',
                    five: '/',
                  };
                } else if (newObj.title == '低密度脂蛋白胆固醇') {
                  newObj.flagNum = obj[i];
                  // 偏高
                  newObj.HeightContent = {
                    // 可能原因：
                    one: '运动不足及肥胖、精神压力过大、饮食不合理、遗传因素、40岁以上男性或绝经女性、有冠心病或动脉粥样硬化病家族史、高血压、糖尿病、吸烟者、动脉硬化、已患冠心病者',
                    // 疾病风险：
                    two: '心脑血管疾病、引起肝功能转氨酶增高',
                    three: '挂号科室-心内科、复查时间-3个月',
                    four: '生活方式-减少饱和脂肪酸摄入、减轻体重、选择降低低密度脂蛋白胆固醇的食物、增加有规律的提体力活动、戒烟饮食建议-（宜）新鲜蔬菜、新鲜水果、豆制品、适量的植物油、适当补锌、w-3系脂肪酸;饮食建议-（忌）过多的不饱和脂肪酸、动物内脏、动物油脂、过多的不饱和脂肪酸;运动建议-（宜）充分的体力活动、热身与放松活动；（忌）剧烈运动',
                    five: '/',
                  };
                  // 偏低
                  newObj.DownContent = {
                    // 可能原因：
                    one: '运动过量、摄入脂肪过低、肝功能异常',
                    // 疾病风险：
                    two: '严重肝病、营养不良、骨髓瘤、急性心肌梗、甲状腺功能亢进、吸收不良综合征、严重贫血',
                    three: '挂号科室-消化内科、内分泌科、复查时间-3个月',
                    four: '/',
                    five: '/',
                  };
                } else if (newObj.title == '甲状腺结节等级') {
                  newObj.flagGrade = obj[i];
                  // 偏高
                  newObj.HeightContent = {
                    // 可能原因：
                    one: '/',
                    // 疾病风险：
                    two: '/',
                    three: '/',
                    four: '/',
                    five: '/',
                  };
                  // 偏低
                  newObj.DownContent = {
                    // 可能原因：
                    one: '/',
                    // 疾病风险：
                    two: '/',
                    three: '/',
                    four: '/',
                    five: '/',
                  };
                }
              }
            }
            arr.push(newObj);
          }
          return arr;
        }
        const arr = f(obj) as any;
        arr.filter((v: any) => v.title !== '');
        setData(arr);
      });
    }
  }, [location.query.TakeId]);

  const userInfo: any =
    localStorage.getItem(USER_INFO) &&
    JSON.parse(localStorage.getItem(USER_INFO)!);

  const handInd = (v: any, ind: number) => {
    const newList = data.map((item: any, i) => {
      if (i === ind) {
        item.flag = !v.flag;
      }
      return item;
    });
    setData(newList as any);
  };
  // 向上
  const setUpward = (v: any, i: number) => {
    handInd(v, i);
  };

  // 向下
  const setUpDown = (v: any, i: number) => {
    handInd(v, i);
  };
  // 去报告
  const handChemicalTake = () => {
    history.push(`/thyroid-gland/ChemicalTake?id=${'chemical'}`);
  };

  return (
    <Page title="甲状腺管理" showNav showBack>
      <div className="chemical">
        <div className="chemical-top">
          <div className="chemical-top-title">
            <span>您好!{userInfo.userCenterName}</span>
          </div>
          <div
            className="chemical-top-right"
            onClick={() => handChemicalTake()}
          >
            我的化验单
          </div>
        </div>
        {numFlag ? (
          <div className="chemical-content">
            <div className="chemical-content-top">
              <div className="chemical-content-top-title">
                您的甲状腺异常数量为：<span>{unusualNum}</span>项
              </div>
              <div className="pie-img">
                <div className="pie-text">
                  <div>异常数量</div>
                  <div className="fs-28">{unusualNum}</div>
                </div>
                <div className="pie-coning"></div>
                <div className="pie-content">
                  {data.length > 0 &&
                    data.map((v: any, i) => {
                      return (
                        <div key={i}>
                          {(v.flagNum &&
                            v.title !== '' &&
                            v.flagGrade !== '') ||
                          v.flagStatus === 2 ? (
                            <span>
                              <p>{v.title}</p>
                            </span>
                          ) : (
                            ''
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
              <button
                className="chemical-btn"
                onClick={() => history.push('/thyroid-gland/report')}
              >
                重新上传
              </button>
            </div>
            {data.length > 0 &&
              data.map((v: any, i: number) => {
                return v.flagNum == 0 ||
                  v.title == '' ||
                  v.flagStatus == 0 ||
                  v.flagGrade == '' ||
                  v.flagStatus == 1 ? (
                  ''
                ) : (
                  <div className="chemical-content-main" key={i}>
                    <div className="chemical-content-main-top">
                      <div className="chemical-content-main-top-title">
                        <span>{v.title}</span>
                        <span
                          className={
                            v.flagNum === 1
                              ? 'high-side'
                              : v.flagNum === 2
                              ? 'high-flat'
                              : v.flagStatus === 1
                              ? 'high-flat'
                              : v.flagStatus === 2
                              ? 'high-side'
                              : ''
                          }
                        >
                          {v.flagNum === 1
                            ? '偏高'
                            : v.flagNum === 2
                            ? '偏低'
                            : v.flagStatus === 1
                            ? '阴性'
                            : v.flagStatus === 2
                            ? '阳性'
                            : v.flagGrade == ''
                            ? ''
                            : v.flagGrade}
                        </span>
                      </div>
                      {v.flag ? (
                        <img
                          src={upward}
                          alt=""
                          onClick={() => setUpward(v, i)}
                        />
                      ) : (
                        ''
                      )}
                    </div>
                    {!v.flag ? (
                      <div className="chemical-content-main-content">
                        <div className="chemical-content-main-content-title">
                          展开
                        </div>
                        <img
                          src={upDown}
                          alt=""
                          onClick={() => setUpDown(v, i)}
                        />
                      </div>
                    ) : (
                      ''
                    )}
                    {v.flag ? (
                      <div className="chemical-content-main-content-text">
                        <div className="chemical-content-main-content-text-value">
                          <span>疾病风险：</span>
                          <span>
                            {v.flagNum === 1
                              ? v.HeightContent.two
                              : v.flagNum == 2
                              ? v.DownContent.two
                              : v.flagStatus === 1
                              ? '/'
                              : v.flagStatus === 2
                              ? '/'
                              : ''}
                          </span>
                        </div>
                        <div className="chemical-content-main-content-text-value">
                          <span>可能原因：</span>
                          <span>
                            {v.flagNum === 1
                              ? v.HeightContent.one
                              : v.flagNum == 2
                              ? v.DownContent.one
                              : v.flagStatus === 1
                              ? '/'
                              : v.flagStatus === 2
                              ? '/'
                              : ''}
                          </span>
                        </div>
                        <div className="chemical-content-main-content-text-value">
                          <span>复查建议：</span>
                          <span>
                            {v.flagNum === 1
                              ? v.HeightContent.three
                              : v.flagNum == 2
                              ? v.DownContent.three
                              : v.flagStatus === 1
                              ? '/'
                              : v.flagStatus === 2
                              ? '/'
                              : ''}
                          </span>
                        </div>
                        <div className="chemical-content-main-content-text-value">
                          <span>生活饮食：</span>
                          <span>
                            {v.flagNum === 1
                              ? v.HeightContent.four
                              : v.flagNum == 2
                              ? v.DownContent.four
                              : v.flagStatus === 1
                              ? '/'
                              : v.flagStatus === 2
                              ? '/'
                              : ''}
                          </span>
                        </div>
                        <div className="chemical-content-main-content-text-value">
                          <span>医疗保健：</span>
                          <span>
                            {v.flagNum === 1
                              ? v.HeightContent.five
                              : v.flagNum == 2
                              ? v.DownContent.five
                              : v.flagStatus === 1
                              ? '/'
                              : v.flagStatus === 2
                              ? '/'
                              : ''}
                          </span>
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="chemical-normal">
            <div className="chemical-normal-title">
              <span>恭喜您！</span>
              <span>您的各项化验指标正常</span>
            </div>
            {/* <div className="chemical-normal-img"> */}
            <img src={averAge} alt="" />
            {/* </div> */}

            <div className="chemical-normal-text">
              健康饮食、良好作息，定期体检保持健康体魄哦~
            </div>
            <div
              className="chemical-normal-btn"
              onClick={() => history.push('/thyroid-gland/report')}
            >
              重新上传
            </div>
          </div>
        )}
        <DiseaseGuideLines></DiseaseGuideLines>
        <DiseaseTools></DiseaseTools>
      </div>
    </Page>
  );
};

export default Chemical;
