import request from '@/utils/request'

const api = {
  role: '/role',
  service: '/service',
  permission: '/permission',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/org/tree',

  user: '/rest/admin/1.0/system/user',  //获取用户列表
  delUser: '/rest/admin/1.0/system/user', //删除用户
  options: '/rest/admin/1.0/system/role/options',  //角色选项列表
  updateUser: '/rest/admin/1.0/system/user',  //更新用户
  addUser: '/rest/admin/1.0/system/user',    //添加用户


  roleList: '/rest/admin/1.0/system/role',      //获取角色列表
  addRole: '/rest/admin/1.0/system/role',      //添加角色
  updateRole: '/rest/admin/1.0/system/role',  //更新角色
  delRole: `/rest/admin/1.0/system/role/`,    //删除角色


  getPermList: '/rest/admin/1.0/system/perm',      //获取权限路由列表
  addPerm: '/rest/admin/1.0/system/perm',      //添加权限路由
  updatePerm: '/rest/admin/1.0/system/perm',  //更新权限路由
  delPerm: `/rest/admin/1.0/system/perm/`,    //删除权限路由
  getPermOptionsList:'/rest/admin/1.0/system/perm/options'  //获取权限路由菜单列表
}

export default api


// 查询权限路由菜单列表
export function getPermOptionsList(parameter) {
  return request({
    url: api.getPermOptionsList,
    method: 'get',
    params: parameter
  })
}
// 查询权限路由列表
export function getPermList(parameter) {
  return request({
    url: api.getPermList,
    method: 'get',
    params: parameter
  })
}
// 删除权限路由列表
export function deletePerm(id) {
  return request({
    url: api.delPerm + id,
    method: 'delete',
  })
}
// 更新权限路由列表
export function updatePerm(parameter) {
  return request({
    url: api.updatePerm,
    method: 'patch',
    data: parameter
  })
}

// 添加权限路由列表
export function addPerm(parameter) {
  return request({
    url: api.addPerm,
    method: 'post',
    data: parameter
  })
}






// 查询用户列表
export function getUserList(parameter) {
  return request({
    url: api.user,
    method: 'get',
    params: parameter
  })
}
// 删除用户
export function deleteUser(parameter) {
  return request({
    url: api.user,
    method: 'delete',
    params: parameter
  })
}
// 更新用户
export function updateUser(parameter) {
  return request({
    url: api.updateUser,
    method: 'patch',
    data: parameter
  })
}

// 添加用户
export function addUser(parameter) {
  return request({
    url: api.addUser,
    method: 'post',
    data: parameter
  })
}

// 查询角色选项列表
export function getOptionsList(parameter) {
  return request({
    url: api.options,
    method: 'get',
    params: parameter
  })
}



// 查询角色列表
export function getRole(parameter) {
  return request({
    url: api.roleList,
    method: 'get',
    params: parameter
  })
}
// 删除角色
export function deleteRole(id) {
  return request({
    url: api.delRole + id,
    method: 'delete',
  })
}
// 更新角色
export function updateRole(parameter) {
  return request({
    url: api.updateRole,
    method: 'patch',
    data: parameter
  })
}

// 添加角色
export function addRole(parameter) {
  return request({
    url: api.addRole,
    method: 'post',
    data: parameter
  })
}



export function getRoleList(parameter) {
  return request({
    url: api.role,
    method: 'get',
    params: parameter
  })
}



export function getServiceList(parameter) {
  return request({
    url: api.service,
    method: 'get',
    params: parameter
  })
}

export function getPermissions(parameter) {
  return request({
    url: api.permissionNoPager,
    method: 'get',
    params: parameter
  })
}

export function getOrgTree(parameter) {
  return request({
    url: api.orgTree,
    method: 'get',
    params: parameter
  })
}

// id == 0 add     post
// id != 0 update  put
export function saveService(parameter) {
  return request({
    url: api.service,
    method: parameter.id === 0 ? 'post' : 'put',
    data: parameter
  })
}

export function saveSub(sub) {
  return request({
    url: '/sub',
    method: sub.id === 0 ? 'post' : 'put',
    data: sub
  })
}
