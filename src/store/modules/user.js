import storage from 'store'
import { login, getUserRoutes, getUserInfo } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'

const user = {
  state: {
    token: '',
    perms: [],
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_PERMS: (state, perms) => {
      state.perms = perms
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        // 登录
        login(userInfo).then(response => {
          const result = response.data
          storage.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
          commit('SET_TOKEN', result.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户名，按钮权限
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          const result = response.data;
          storage.set('username',result.username)
          commit('SET_PERMS', result.perms)
        })
      })
    },

    // 获取用户路由信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserRoutes().then(response => {
          const result = response.data
          if (result.length > 0) {
            commit('SET_ROLES', result)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout({ commit }) {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        storage.remove(ACCESS_TOKEN)
        storage.remove('username')
    }

  }
}

export default user
