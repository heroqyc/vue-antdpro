// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '主页' },
    redirect: '/dashboard/workplace',
    children: [
      
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: { title: '设备管理', keepAlive: true, icon: bxAnaalyse, permission: [ 'dashboard' ] },  //equipment  设备
        children: [
          {
            path: '/dashboard/analysis',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: '基础信息管理', keepAlive: false, permission: [ 'dashboard' ] }   //basicInfoMgt 基础
          }, 
          {
            path: '/dashboard/templateInfoMgt',
            name: 'templateInfoMgt',
            component: () => import('@/views/dashboard/TemplateInfoMgt'),
            meta: { title: '模板信息管理', keepAlive: false, permission: [ 'dashboard' ] }   // templateInfoMgt 模板
          },  
          {
            path: '/dashboard/stopMgt',
            name: 'stopMgt',
            component: () => import('@/views/dashboard/StopMgt'),
            meta: { title: '停机复机管理', keepAlive: false, permission: [ 'dashboard' ] }   //stopMgt
          }, 
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: '绑定解绑管理', keepAlive: true, permission: [ 'dashboard' ] }   //bindingMgt
          }
        ]
      },

      // forms
      {
        path: '/form',
        redirect: '/form/base-form',
        component: RouteView, 
        meta: { title: '套餐设置', icon: 'form', permission: [ 'form' ] },  //packageSet
        children: [
          {
            path: '/form/base-form',
            name: 'BaseForm',
            component: () => import('@/views/form/basicForm'),
            meta: { title: '折扣设置', keepAlive: true, permission: [ 'form' ] } //discountSet
          },
          {
            path: '/form/step-form',
            name: 'StepForm',
            component: () => import('@/views/form/stepForm/StepForm'),
            meta: { title: '优惠码管理', keepAlive: true, permission: [ 'form' ] } //discountSet
          },
          {
            path: '/form/advanced-form',
            name: 'AdvanceForm',
            component: () => import('@/views/form/advancedForm/AdvancedForm'),
            meta: { title: '短信语音套餐设置', keepAlive: true, permission: [ 'form' ] } //messageSet
          }
        ]
      },

      // profile
      {
        path: '/profile',
        name: 'profile',
        component: RouteView,
        redirect: '/profile/basic',
        meta: { title: '流水查询', icon: 'profile', permission: [ 'profile' ] },//flowQuery
        children: [
          {
            path: '/profile/basic',
            name: 'ProfileBasic',
            component: () => import('@/views/profile/basic'),
            meta: { title: '充值流水查询', permission: [ 'profile' ] } //rechargeQuery
          },
          {
            path: '/profile/advanced',
            name: 'ProfileAdvanced',
            component: () => import('@/views/profile/advanced/Advanced'),
            meta: { title: '消费流水查询', permission: [ 'profile' ] } //consumptionQuery
          }
        ]
      },

      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: { title: '个人页', icon: 'user', keepAlive: true, permission: [ 'user' ] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center'),
            meta: { title: '个人中心', keepAlive: true, permission: [ 'user' ] }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true, permission: [ 'user' ] },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: '基本设置', hidden: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: { title: '安全设置', hidden: true, keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: '个性化设置', hidden: true, keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: '账户绑定', hidden: true, keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: { title: '新消息通知', hidden: true, keepAlive: true, permission: [ 'user' ] }
              }
            ]
          }
        ]
      },
      
      {
        path: '/feedback',
        component: RouteView,
        component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
        name: 'account1',
        meta: { title: '意见反馈管理', icon: 'user', permission: [ 'user' ] },
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
