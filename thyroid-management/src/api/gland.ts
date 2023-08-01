import request from '@/utils/request';
export default {
  // 检验单上传
  upload(files: FormData) {
    return request.post('/thyroid/assaySheetUpload', files);
  },
  //   使用记录详情
  makeDetail(datuserIda: string) {
    return request.get('/thyroid/selectByUserIdRecord', datuserIda);
  },
  //   获取结果详情
  gainDetail(id: number) {
    return request.get(`/thyroid/selectEveryTimeResult?id=${id}`);
  },
  // 查询最后新一次使用记录
  queryUpdate() {
    return request.get('/thyroid/selectLastResult');
  },
  // 查询使用记录
  queryTake(pageNum: number, pageSize: number) {
    return request.get(
      `/thyroid/selectThyroidRecord?pageNum=${pageNum}&pageSize=${pageSize}`,
    );
  },
  // 获取用户使用记录列表
  getListing() {
    return request.get('/health-management/thyroid/selectUserChannelList');
  },
  // 化验单解析
  reportVing(data: any) {
    return request.post('/thyroid/submitThyroidInfo', data);
  },
  getFoodListByCid(classifyId: any) {
    return request.get(
      `sys-dictionary-food/get/food/by/classifyId/${classifyId}`,
    );
  },
  // 模糊查找食物
  getFoodListByName(name: string) {
    return request.get(`sys-dictionary-food/get/food/by/name/${name}`);
  },
  // 获取单个食物
  getFoodListByPid(id: any) {
    return request.get(`sys-dictionary-food/get/food/by/id/${id}`);
  },
  getQuestionnaire(pageNum: number, pageSize: number) {
    return request.get(
      `/thyroid/getThyroidQuestionResultByRecord?pageNum=${pageNum}&pageSize=${pageSize}`,
    );
  },
  // 录入用户信息
  getCustomInfo(data: any) {
    return request.post('/user-info/entryInfo', data);
  },
};
