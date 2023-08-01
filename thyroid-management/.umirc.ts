import { defineConfig } from 'umi';
export default defineConfig({
  title: '甲状腺管理',
  nodeModulesTransform: {
    type: 'none',
  },
  theme: {
    '@primary-color': '#007D74',
  },
  define: {
    OSS_URL: 'https://senro-tree-sleep-1301127519.cos.ap-nanjing.myqcloud.com/',
    QUESTIONNAIRE_URL: 'http://questionnaire-fe-dev.huanyu.g-hcare.com/',
    MINAPP_URL:
      'https://service.g-hcare.com/questionnaire/#/questionnaire/custom/start?id=156&channelId=CH000021',
  },
  routes: [
    { path: '/', component: '@/pages/Home/index' },
    {
      path: '/',
      component: '@/layouts/index',
      exact: false,
      routes: [
        {
          path: '/login',
          component: '@/pages/Login/index',
        },
        {
          path: '/thyroid-gland/selectInfo',
          component: '@/pages/SelectInfo/index',
        },
        {
          path: '/thyroid-gland/custom',
          component: '@/pages/Custom/index',
        },
        {
          path: '/thyroid-gland/report',
          component: '@/pages/Report/index',
        },
        {
          path: '/thyroid-gland/SufferConnection',
          component: '@/pages/SufferConnection/index',
        },
        {
          path: '/food-library/Food',
          component: '@/pages/FoodLibrary/Food/index',
        },
        {
          path: '/food-library/Search',
          component: '@/pages/FoodLibrary/Search/index',
        },
        {
          path: '/food-library/FoodDetail',
          component: '@/pages/FoodLibrary/FoodDetail/index',
        },
        {
          path: '/thyroid-gland/Emotion',
          component: '@/pages/Emotion/index',
        },
        {
          path: '/thyroid-gland/Muse',
          component: '@/pages/Muse/index',
        },
        {
          path: '/thyroid-gland/Learn',
          component: '@/pages/Learn/index',
        },
        {
          path: '/thyroid-gland/LearnVideo',
          component: '@/pages/Learn/LearnVideo/index',
        },
        {
          path: '/thyroid-gland/Write',
          component: '@/pages/Write/index',
        },
        {
          path: '/thyroid-gland/Chemical',
          component: '@/pages/Chemical/index',
        },
        {
          path: '/thyroid-gland/ChemicalTake',
          component: '@/pages/ChemicalTake/index',
        },
        {
          path: '/Article',
          component: '@/pages/Article/index',
        },
        {
          path: '/questionnaire-answer',
          component: '@/pages/Questionnaire/answer',
        },
        {
          path: '/questionnaire-result',
          component: '@/pages/Questionnaire/result',
        },
        {
          path: '/Protocal',
          component: '@/pages/Protocal/index',
        },
      ],
    },
  ],
  fastRefresh: {},
  antd: {
    mobile: true,
  },
  exportStatic: {},
  extraPostCSSPlugins: [
    require('postcss-pxtorem')({
      rootValue: 32,
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0,
      exclude: /node_modules/i,
    }),
  ],
  proxy: {
    '/health-management': {
      target: 'http://172.16.1.18:8066/',
      // target: 'http://172.16.2.38:8066/',
      changeOrigin: true,
    },
  },
});
