
// layout 布局入口,如有需要请手动切换
import layoutIntrance from '@/layout/topBottom'
/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutIntrance,
    children: [
      {
        path: 'index',
        name: 'index',
        meta: {
          title: 'index',
          name: '主页',
          icon: 'home',
          requiresAuth: true
        },
        component: () => import('@/pages/main/Home.vue')
      },
      {
        path: 'warning',
        name: 'warning',
        meta: {
          title: 'warning',
          name: '预警',
          icon: 'dashboard',
          requiresAuth: true
        },
        component: () => import('@/pages/main/warning/List.vue')
      },
      {
        path: 'people',
        name: 'people',
        meta: {
          title: 'people',
          name: '人员信息',
          icon: 'dashboard',
          requiresAuth: true
        },
        component: () => import('@/pages/main/people/List.vue')
      },
      {
        path: 'statistics',
        name: 'statistics',
        meta: {
          title: 'statistics',
          name: '数据统计',
          icon: 'dashboard',
          requiresAuth: true
        },
        component: () => import('@/pages/main/statistics/List.vue')
      },
      {
        path: 'imports',
        name: 'imports',
        meta: {
          title: 'imports',
          name: '导入文件',
          icon: 'dashboard',
          requiresAuth: true
        },
        component: () => import('@/pages/main/imports/List.vue')
      },
      {
        path: 'setting',
        name: 'setting',
        meta: {
          title: 'setting',
          name: '配置',
          icon: 'dashboard',
          requiresAuth: true
        },
        component: () => import('@/pages/main/setting/List.vue')
      },
      {
        path: 'ua',
        name: 'ua',
        component: () => import('@/pages/main/Ua.vue'),
        meta: {
          title: '浏览器信息',
          name: '浏览器代理',
          icon: 'dashboard',
          requiresAuth: false
        }
      }
    ]
  }]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登陆
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'login',
      name: '登陆',
      icon: 'home',
      requiresAuth: false
    },
    component: () => import('@/pages/login/Login.vue')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  // 404
  {
    path: '*',
    name: '404',
    meta: {
      title: '404',
      name: '404',
      icon: 'error',
      requiresAuth: false
    },
    component: () => import('@/pages/error/404.vue')
  }
]

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
