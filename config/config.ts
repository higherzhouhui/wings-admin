// https://umijs.org/config/
import { join } from 'path';
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      redirect: '/wings/list',
    },
    {
      path: '/user',
      layout: true,
      routes: [
        {
          path: '/user/login',
          layout: false,
          name: 'login',
          component: './user/Login',
        },
        {
          path: '/user',
          redirect: '/user/login',
        },
        {
          name: 'register-result',
          icon: 'smile',
          path: '/user/register-result',
          component: './user/register-result',
        },
        {
          name: 'register',
          icon: 'smile',
          path: '/user/register',
          component: './user/register',
        },
        {
          component: '404',
        },
      ],
    },
    {
      path: '/wings',
      icon: 'table',
      name: 'wings',
      routes: [
        {
          path: '/wings',
          redirect: '/wings/list',
        },
        {
          name: 'wings-list',
          path: '/wings/list',
          component: './wings/list',
        },
        {
          name: 'wings-upload',
          path: '/wings/upload',
          component: './wings/upload',
        },
        {
          name: 'wings-open',
          path: '/wings/open',
          component: './wings/open',
        },
        {
          component: '404',
        },
      ],
    },
    // {
    //   path: '/compose',
    //   icon: 'send',
    //   name: 'compose',
    //   routes: [
    //     {
    //       path: '/compose',
    //       redirect: '/compose/list',
    //     },
    //     {
    //       name: 'compose-list',
    //       path: '/compose/list',
    //       component: './compose/list',
    //     },
    //   ],
    // },
    {
      path: '/progress',
      icon: 'pullRequest',
      name: 'progress',
      routes: [
        {
          path: '/progress',
          redirect: '/progress/list',
        },
        {
          name: 'progress-list',
          path: '/progress/list',
          component: './progress/list',
        },
        {
          component: '404',
        },
      ],
    },
    {
      path: '/accounts',
      icon: 'UserAdd',
      name: 'account',
      routes: [
        {
          path: '/accounts',
          redirect: '/accounts/list',
        },
        {
          path: '/accounts/list',
          name: 'list',
          component: './accounts/list',
        },
        {
          path: '/accounts/add',
          name: 'add',
          component: './accounts/add',
        },
        {
          path: '/accounts/center',
          name: 'center',
          component: './accounts/percenter',
          hideInMenu: true,
        },
        {
          path: '/accounts/changepwd',
          name: 'changepwd',
          component: './accounts/changepwd',
          hideInMenu: true,
        },
        {
          path: '/accounts/changepwd-result',
          name: 'changepwd-result',
          component: './accounts/changepwd-result',
          hideInMenu: true,
        },
        {
          path: '/accounts/addaccount-result',
          name: 'addaccount-result',
          component: './accounts/changepwd-result',
          hideInMenu: true,
        },
        {
          component: '404',
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // Fast Refresh ?????????
  fastRefresh: {},
  openAPI: [
    {
      requestLibPath: "import { request } from 'umi'",
      // ???????????????????????????
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from 'umi'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
  nodeModulesTransform: {
    type: 'none',
  },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
});
