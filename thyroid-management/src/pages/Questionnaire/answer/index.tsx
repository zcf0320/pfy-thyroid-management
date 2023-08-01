import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '@/utils/useStore';
import Page from '@/components/Page';
import { history, useLocation } from 'umi';
import thyroid from '@/assets/images/thyroid.png';
import hyperthyroidism from '@/assets/images/hyperthyroidism.png';
import hypothyroidism from '@/assets/images/hypothyroidism.png';
import './index.less';
import { HYPERTHYROIDISM, HYPOTHYROIDISM, THYROID } from '@/utils/CONSTANT';

let timer: any = null;
const Answer = () => {
  const location = useLocation();
  const questionnaireStore = useStores('QuestionnaireStore');
  const [questionIndex, setQuestionIndex] = useState(0);
  const questionnaireCode = location.query.questionnaireCode;
  useEffect(() => {
    questionnaireStore.getQuestionnaire(questionnaireCode).then((res: any) => {
      res.data.questionnaire &&
        res.data.questionnaire[0].questions.forEach((item: any) => {
          item.answers.forEach((ele: any) => {
            ele.select = false;
          });
        });
      questionnaireStore.setQuestionnaire(res.data.questionnaire);
    });
  }, []);
  // 选择的答案
  const selectAnswer = (index: number) => {
    const { questions } = questionnaireStore.questionnaire[0];
    questions[questionIndex].userAnswer =
      questions[questionIndex].answers[index].rightAnswer;
    questions[questionIndex].selectAnswerIndex = index;
    questions[questionIndex].isSelect = true;
    questions[questionIndex].answers.forEach((item: any) => {
      item.select = false;
    });
    questions[questionIndex].answers[index].select = true;
    questionnaireStore.setQuestionnaire(questionnaireStore.questionnaire);
    // 下一题
    if (questionIndex === questions.length - 1) {
      return;
    }
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      setQuestionIndex(questionIndex + 1);
    }, 500);
  };
  // 下一题是否高亮
  const nextIsLight = (questionIndex: any) => {
    const { questions } = questionnaireStore.questionnaire[0];
    const bol = questions[questionIndex].answers.some((item: any) => {
      if (item.select) {
        return true;
      } else {
        return false;
      }
    });
    return bol;
  };
  const prev = () => {
    setQuestionIndex(questionIndex - 1);
  };
  const submit = () => {
    if (!nextIsLight(questionIndex)) {
      return;
    }
    const { questions } = questionnaireStore.questionnaire[0];
    if (questionIndex === questions.length - 1) {
      const answerReqs: any = [];
      questionnaireStore.questionnaire.forEach((qItem: any) => {
        qItem.questions.forEach((item: any) => {
          const result: any = {
            questionId: item.questionId,
            answerIds: [],
          };
          item.answers.forEach((AItem: any) => {
            AItem.select && result.answerIds.push(AItem.answerId);
          });
          answerReqs.push(result);
        });
      });
      const params = {
        answerReqs,
        code: questionnaireCode,
        serviceCode: 'thyroid',
      };
      questionnaireStore.addQuestionnaire(params).then((res: any) => {
        history.replace(
          `/questionnaire-result?resultId=${res.data.resultId}&questionnaireCode=${res.data.pageCode}`,
        );
      });
    }
  };
  return (
    <Page title="甲状腺管理" showNav showBack>
      <div className="page-answer">
        {questionnaireCode && questionnaireCode === THYROID ? (
          <img className="page-answer-title" src={thyroid} />
        ) : null}
        {questionnaireCode && questionnaireCode === HYPERTHYROIDISM ? (
          <img className="page-answer-title" src={hyperthyroidism} />
        ) : null}
        {questionnaireCode && questionnaireCode === HYPOTHYROIDISM ? (
          <img className="page-answer-title" src={hypothyroidism} />
        ) : null}

        <div className="page-answer-content">
          <div className="question-item">
            <div className="question">
              <div className="question-index">Q{questionIndex + 1}:</div>
              <div className="question-step">
                {questionIndex + 1}/
                {questionnaireStore.questionnaire[0] &&
                  questionnaireStore.questionnaire[0].questions.length}
              </div>
            </div>
            <div className="question-title">
              {questionnaireStore.questionnaire.length
                ? questionnaireStore.questionnaire[0].questions[questionIndex]
                    .questionName
                : null}
            </div>
            <div className="answer-list flex">
              {questionnaireStore.questionnaire.length
                ? questionnaireStore.questionnaire[0].questions[
                    questionIndex
                  ].answers.map((item: any, index: number) => {
                    return (
                      <div
                        className={`answer-item ${
                          item.select ? 'active' : ''
                        } flex`}
                        key={item.answerId}
                        onClick={() => {
                          selectAnswer(index);
                        }}
                      >
                        {item.answerName}
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
        {questionIndex !== 0 && (
          <div className="action-item flex">
            <div
              className={
                questionIndex ===
                questionnaireStore.questionnaire[0].questions.length - 1
                  ? 'action-pre'
                  : 'action-pre-l'
              }
              onClick={prev}
            >
              上一题
            </div>
            {questionIndex ===
              questionnaireStore.questionnaire[0].questions.length - 1 && (
              <div
                className={`action-submit ${
                  nextIsLight(questionIndex) ? '' : 'disable'
                }`}
                onClick={submit}
              >
                提交
              </div>
            )}
          </div>
        )}
      </div>
    </Page>
  );
};
export default observer(Answer);
