import { makeAutoObservable } from 'mobx';
import questionnaire from '@/api/questionnaire';

interface answers {
  answerId: number;
  answerName: string;
  select?: boolean;
}
interface questions {
  answerType: number;
  answers: answers[];
  questionId: number;
  questionName: string;
  questionRemark: string;
}
interface QuestionnaireDetail {
  partId: number;
  partName: string;
  questions: questions[];
}
class QuestionnaireStore {
  constructor() {
    makeAutoObservable(this);
  }

  questionnaire: QuestionnaireDetail[] = [];
  getQuestionnaire = (code: string) => {
    return questionnaire.getQuestionnaireByCode(code);
  };

  addQuestionnaire = (params: any) => {
    return questionnaire.commitQuestionnaire(params);
  };

  setQuestionnaire = (data: QuestionnaireDetail[]) => {
    this.questionnaire = data;
  };
  getQuestionnaireResult = (resultId: string) => {
    return questionnaire.getResult(resultId);
  };
}
export default new QuestionnaireStore();
