
import { request, apiDomain } from '../config';

export async function oauthToken(params) {
  params = {
    client_id: 'test',
    client_secret: 'test',
    ...params,
  };

  return request(`${apiDomain}/upc/oauth/token`, params);
}
export async function smsOauthToken(params) {
  params = {
    client_id: 'test',
    client_secret: 'test',

    ...params,
  };

  return request(`${apiDomain}/upc/oauth/sms`, params);
}
export async function wechatOauthToken(params) {
  params = {
    client_id: 'test',
    client_secret: 'test',

    ...params,
  };

  return request(`${apiDomain}/upc/oauth/wechat`, params);
}
// 微信登录用户绑定openid
export async function wechatJoint(params) {
  return request(`${apiDomain}/upc/user/wechatJoint`, params);
}

export async function logout(params) {
  return request(`${apiDomain}/upc/user/logout`, params);
}

