import { stringify } from 'qs';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import { oauthToken, smsOauthToken, wechatOauthToken, wechatJoint, logout } from '@/services/index';
import { setAuthority } from '@/utils/authority.js';
// import { reloadAuthorized } from '@utils/Authorized';

export default {
  namespace: 'user',

  state: {
    userInfo: {},
    fetching: false,
  },

  effects: {
    *fetchOauthToken({ payload, callback, ticket }, { call, put }) {
      const response = yield call(oauthToken, payload);
      if (response.access_token) {
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
        if (ticket) {
          yield call(wechatJoint, { ticket });
        }
        window.location.href = '/';
      } else {
        // 更新token时 失败不弹窗
        if (!payload.refresh_token) {
          Toast.fail(response.error_description || response.returnMsg || '登录失败');
        } else {
          window.location.href = '/login';
        }
      }
    },
    *fetchSmsOauthToken({ payload, callback, ticket }, { call, put }) {
      const response = yield call(smsOauthToken, payload);
      // Login successfully
      if (response.access_token) {
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
        if (ticket) {
          yield call(wechatJoint, { ticket });
        }
        window.location.href = '/';
      } else {
        Toast.fail(response.error_description || response.returnMsg || '登录失败');
      }
    },
    *fetchWechatOauthToken({ payload, callback }, { call, put }) {
      const response = yield call(wechatOauthToken, payload);
      // Login successfully
      if (response.access_token) {
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
        window.location.href = '/';
      }
      callback(response);
    },
    *fakeWechatJoint({ payload, callback }, { call, put }) {
      const response = yield call(wechatJoint, payload);
      if (response && response.returnCode === 0) {
        console.log('微信绑定成功');
      } else {
        console.log('微信绑定失败');
      }
    
    },
    *fakeLogout({ payload, callback }, { call, put }) {
      const response = yield call(logout, payload);

      if (response && response.code === 0) {
        console.log('退出登录成功');
      } else {
        console.log('退出登录失败');
      }
      yield put({
        type: 'changeLoginStatus',
        payload: {},
      });
      // reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      payload.access_token && setAuthority(payload);

      state.data = {
        status: payload.access_token ? 0 : 1,
        msg: payload.error ? '账号和密码错误' : '登录成功',
      };
      return state;
      //   state.type = payload.type;
    },
    fetching(state) {
      return state;
    },
  },
};
