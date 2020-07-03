// eslint-disable-next-line
import * as loginService from '@/api/login'
// eslint-disable-next-line
import { BasicLayout, BlankLayout, PageView, RouteView } from '@/layouts'

// 前端路由表
const constantRouterComponents = {
  // 基础页面 layout 必须引入
  BasicLayout: BasicLayout,
  BlankLayout: BlankLayout,
  RouteView: RouteView,
  PageView: PageView,
  '403': () => import(/* webpackChunkName: "error" */ '@/views/exception/403'),
  '404': () => import(/* webpackChunkName: "error" */ '@/views/exception/404'),
  '500': () => import(/* webpackChunkName: "error" */ '@/views/exception/500'),


  // 需要动态引入的页面组件
  
  //system 系统设置
  '/system/perm': () => import('@/views/system/Perm'),
  '/system/role': () => import('@/views/system/Role'),
  '/system/user': () => import('@/views/system/User'),

  // dashboard 设备管理
  '/dashboard/workplace': () => import('@/views/dashboard/Workplace'), //绑定解绑管理
  '/dashboard/analysis': () => import('@/views/dashboard/Analysis'),  //基础信息管理
  '/dashboard/templateInfoMgt': () => import('@/views/dashboard/TemplateInfoMgt'), //模板信息管理
  '/dashboard/stopMgt': () => import('@/views/dashboard/StopMgt'),  //停机复机管理


  // form 套餐设置
  '/form/base-form': () => import('@/views/form/basicForm'),   //折扣设置
  '/form/step-form': () => import('@/views/form/stepForm/StepForm'), //优惠码管理
  '/form/advanced-form': () => import('@/views/form/advancedForm/AdvancedForm'), //短信语音套餐设置


  // 流水查询
  '/profile/basic': () => import('@/views/profile/basic'),   //充值流水查询
  '/profile/advanced': () => import('@/views/profile/advanced/Advanced'), //消费流水查询




  // result 成功失败页
  'ResultSuccess': () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
  'ResultFail': () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),


  // exception 报错页
  'Exception403': () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
  'Exception404': () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
  'Exception500': () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),


  // account 个人中心
  'AccountCenter': () => import('@/views/account/center/index'),
  'AccountSettings': () => import('@/views/account/settings/Index'),
  'BaseSettings': () => import('@/views/account/settings/BaseSetting'),
  'SecuritySettings': () => import('@/views/account/settings/Security'),
  'CustomSettings': () => import('@/views/account/settings/Custom'),
  'BindingSettings': () => import('@/views/account/settings/Binding'),
  'NotificationSettings': () => import('@/views/account/settings/Notification'),


  // 意见反馈
  'FeedBack': () => import(/* webpackChunkName: "result" */ '@/views/feedback/Feedback'),

}

// 前端未找到页面路由（固定不用改）
const notFoundRouter = {
  path: '*', redirect: '/404', hidden: true
}

// 根级菜单
const rootRouter = {
  key: '',
  name: 'index',
  uri: '/',
  component: 'BasicLayout',
  redirect: '/system/user',
  permName: '首页',
  children: []
}

/**
 * 动态生成菜单
 * @param token
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = (result) => {
  return new Promise((resolve, reject) => {
    const { roles } = result
    const menuNav = []
    rootRouter.children = roles
    menuNav.push(rootRouter)
    const routers = generator(menuNav)
    routers.unshift(notFoundRouter)
    resolve(routers)
  })
}

/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const generator = (routerMap, parent) => {
  return routerMap.map(item => {
    // const { title, show, hideChildren, hiddenHeaderContent, target, icon } = item.meta || {}
    const currentRouter = {
      // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/workplace
      // path: item.uri || `${parent && parent.uri || ''}/${item.key}`,
      path: item.uri || '/system/user',
      // 路由名称，建议唯一
      name: item.permName || '',
      // 该路由对应页面的 组件 :方案1
      // component: constantRouterComponents[item.component || item.key],
      // 该路由对应页面的 组件 :方案2 (动态加载)
      component: (constantRouterComponents[item.component || item.uri]),

      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
        title: item.permName,
        icon: item.icon || 'form',
        // hiddenHeaderContent: hiddenHeaderContent,
        // target: target,
        // permission: item.name
      }
    }
    // 是否设置了隐藏菜单
    // if (show === false) {
    // currentRouter.hidden = true
    // }
    // 是否设置了隐藏子菜单
    // if (hideChildren) {
    //   currentRouter.hideChildrenInMenu = true
    // }
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    if (!currentRouter.path.startsWith('http')) {
      currentRouter.path = currentRouter.path.replace('//', '/')
    }
    // 重定向
    item.redirect && (currentRouter.redirect = item.redirect)
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentRouter.children = generator(item.children, currentRouter)
    }
    return currentRouter
  })
}

/**
 * 数组转树形结构
 * @param list 源数组
 * @param tree 树
 * @param parentId 父ID
 */
const listToTree = (list, tree, parentId) => {
  list.forEach(item => {
    // 判断是否为父级菜单
    if (item.parentId === parentId) {
      const child = {
        ...item,
        key: item.key || item.name,
        children: []
      }
      // 迭代 list， 找到当前菜单相符合的所有子菜单
      listToTree(list, child.children, item.id)
      // 删掉不存在 children 值的属性
      if (child.children.length <= 0) {
        delete child.children
      }
      // 加入到树中
      tree.push(child)
    }
  })
}
