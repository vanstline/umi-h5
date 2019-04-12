
import { apiDomain, request } from '../config';

// 短信验证码发送
export async function sendSmsCaptcha(params) {
  return request(`${apiDomain}/cmc/auth/sendSmsCaptcha`, params, {
  });
}
export async function uploadByBase64(params) {
  return request(`${apiDomain}/cmc/uploadByBase64`, params, {
  });
}
