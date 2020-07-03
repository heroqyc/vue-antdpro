import request from '@/utils/request'

const userApi = {
  Login:'/rest/admin/1.0/auth/signin',
  ForgePassword: '/auth/forge-password',
  Register: '/auth/register',
  twoStepCode: '/auth/2step-code',
  SendSms: '/account/sms',
  SendSmsErr: '/account/sms_err',
  // get my info
  UserRoutes: '/rest/admin/1.0/system/routes',
  UserMenu: '/user/nav',
  systemUser:'/rest/admin/1.0/system/user/i'
}


export function getSmsCaptcha (parameter) {
  return request({
    url: userApi.SendSms,
    method: 'post',
    data: parameter
  })
}

export function getUserInfo () {
  return request({
    url: userApi.systemUser,
    method: 'get',
  })
}

export function getUserRoutes () {
  return request({
    url: userApi.UserRoutes,
    method: 'get',
  })
}

export function getCurrentUserNav () {
  return request({
    url: userApi.UserMenu,
    method: 'get'
  })
}

export function login (parameter) {
  return request({
    url: userApi.Login,
    method: 'post',
    data: parameter
  })
}

