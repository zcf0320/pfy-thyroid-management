import request from '@/utils/request';

export default {
  /**
   * 获取问卷
   * @param code
   * @returns
   */
  getQuestionnaireByCode(code: string) {
    return request({
      url: '/questionnaire/getByCode',
      method: 'get',
      params: { code },
    });
  },
  /**
   * 获取结果
   * @param resultId
   * @returns
   */
  getResult(resultId: string) {
    return request({
      url: '/questionnaire/getQuestionnaireResult',
      method: 'get',
      params: { resultId },
    });
  },
  /**
   * 提交问卷
   * @param data
   * @returns
   */
  commitQuestionnaire(data: any) {
    return request({
      url: '/questionnaire/commit',
      method: 'POST',
      data,
    });
  },
};
