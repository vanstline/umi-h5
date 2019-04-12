
import { apiDomain, request } from '../config';

export async function queryStoreHomePageInfo(params) {
  return request(`${apiDomain}/ismc/store/queryStoreHomePageInfo`, params);
}
// 修改门店个人信息接口
export async function updateStoreUserInfo(params) {
  return request(`${apiDomain}/upc/storeUser/updateStoreUserInfo`, params);
}
