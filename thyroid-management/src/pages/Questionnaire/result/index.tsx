/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { history, useLocation } from 'umi';
import {
  CHANNEL_CODE,
  HYPERTHYROIDISM,
  HYPOTHYROIDISM,
} from '@/utils/CONSTANT';
import { useStores } from '@/utils/useStore';
import Page from '@/components/Page';
import bg from '@/assets/images/questionnaire-result.png';
import './index.less';
import { THYROID } from '@/utils/CONSTANT';

export default function Result() {
  const questionnaireStore = useStores('QuestionnaireStore');
  const [result, setResult] = useState({
    score: 0,
    resultRemark: '',
    content: '',
  } as any);
  const location = useLocation();
  const resultId = location.query.resultId;
  const questionnaireCode = location.query.questionnaireCode;
  useEffect(() => {
    questionnaireStore.getQuestionnaireResult(resultId).then((res: any) => {
      setResult(res.data);
    });
  }, [resultId]);
  const goQuestionnaire = (code: string) => {
    history.push(`/questionnaire-answer?questionnaireCode=${code}`);
  };
  return (
    <Page title="甲状腺管理" showNav showBack>
      <div className="page-result">
        <div className="page-result-top">
          <img className="page-result-bg" src={bg} />
          <div className="page-result-score">
            <span>{result.resultRemark}</span>
          </div>
          <div className="page-result-content">{result.content}</div>
        </div>

        <div className="other-questionnaire">
          <div className="other-questionnaire-title">其他测试</div>
          {questionnaireCode && questionnaireCode !== THYROID ? (
            <div
              className="other-questionnaire-img thyroid"
              onClick={() => {
                goQuestionnaire(THYROID);
              }}
            >
              甲状腺测试
            </div>
          ) : null}
          {questionnaireCode && questionnaireCode !== HYPERTHYROIDISM ? (
            <div
              className="other-questionnaire-img hyperthyroidism"
              onClick={() => {
                goQuestionnaire(HYPERTHYROIDISM);
              }}
            >
              甲亢测试
            </div>
          ) : null}
          {questionnaireCode && questionnaireCode !== HYPOTHYROIDISM ? (
            <div
              className="other-questionnaire-img hypothyroidism"
              onClick={() => {
                goQuestionnaire(HYPOTHYROIDISM);
              }}
            >
              甲减测试
            </div>
          ) : null}
        </div>
      </div>
    </Page>
  );
}
