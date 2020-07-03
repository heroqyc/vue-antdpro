import Vue from 'vue'
import store from '@/store'

const action = Vue.directive('action', {
  inserted: function (el, binding, vnode) {
    // 指令名称 xxx:xxx 
    const actionName = binding.arg
    const roles = store.getters.perms
    let newRoles = roles.map(item => {
      return item.slice(item.indexOf(':') + 1, item.length)
    })

    // 没有权限 不显示按钮
    if (!newRoles.includes(actionName)) {
      el.parentNode && el.parentNode.removeChild(el) || (el.style.display = 'none')
    }
  }
})


export default action
