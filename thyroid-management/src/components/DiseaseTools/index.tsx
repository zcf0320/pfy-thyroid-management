import { history } from 'umi';
import './index.less';

export default function DiseaseTools() {
  //  食物含碘量
  const handFood = () => {
    history.push('/food-library/Food');
  };
  //    情绪管理
  const handEmotion = () => {
    history.push('/thyroid-gland/Emotion');
  };
  return (
    <div className="disease-tools">
      <div className="disease-tools-title">疾病小工具</div>
      <div className="disease-tools-img">
        <div className="food-library" onClick={() => handFood()}>
          <p>食物含碘量查询</p>
        </div>
        <div className="emotion-manage" onClick={() => handEmotion()}>
          <p>情绪管理</p>
        </div>
      </div>
    </div>
  );
}
