import React, { Component } from 'react';
import { List, InputItem, Button, Toast, WingBlank, WhiteSpace } from 'antd-mobile';
import { connect } from 'dva';
import { removeAuthority } from '@/utils/authority';
import { NavBar } from '@/components';
import './index.less';

@connect(({ store, loading, user, utils }) => ({
  storeInfo: store.storeInfo,
  utils,
  user,
  updateing: loading.effects['store/fetchUpdateStoreUserInfo'],
  sending: loading.effects['utils/fetchSendSmsCaptcha'],
}))
export default class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 60,
      btnText: '获取验证码',
      editablePassword: false,
      editableMobile: false,
      userInfo: props.storeInfo || {},
    };
  }

  componentDidMount() { }

  handleGetCode = () => {
    let { timer, discodeBtn, userInfo } = this.state;
    const phone = (userInfo.mobile || '').replace(/\s/g, '');
    var reg = /^1\d{10}$/;
    if (phone && reg.test(phone)) {
      this.props.dispatch({
        type: 'utils/fetchSendSmsCaptcha',
        payload: { mobile: phone },
      });
      this.setState({ btnText: '发送中...' });
      let siv = setInterval(() => {
        this.setState({ timer: timer--, btnText: `${timer}秒后重试`, discodeBtn: true }, () => {
          if (timer === 0) {
            clearInterval(siv);
            this.setState({ btnText: '重新发送', discodeBtn: false });
          }
        });
      }, 1000);
    } else {
      Toast.fail('请输入正确的手机号');
      return;
    }
  };
  handleUpdateUserInfo = () => {
    const { editablePassword, editableMobile, userInfo } = this.state;
    const { password, mobile, code, userId, username } = userInfo;
    const userinfoProps = this.props.storeInfo;
    const params = {
      username,
      mobile: userinfoProps.mobile,
    };
    if (editablePassword && password !== userinfoProps.password) {
      this.props.dispatch({
        type: 'store/fetchUpdateStoreUserInfo',
        payload: { ...params, password },
        callback: () => {
          this.handleEditChange();
        },
      });
    }
    if (editableMobile) {
      // if (mobile === userinfoProps.mobile) {
      //   Toast.fail('该手机号已绑定');
      //   return false;
      // }

      if (code) {
        this.props.dispatch({
          type: 'store/fetchUpdateStoreUserInfo',
          payload: { ...params, mobile, captcha: code },
          callback: () => {
            this.handleEditChange();
          },
        });
      } else {
        Toast.fail('验证码不能为空');
      }
    }
  };
  handleEditChange = param => {
    const { userInfo } = this.state;
    this.props.dispatch({
      type: 'store/fetchQueryStoreHomePageInfo',
      payload: {},
    });
    if (param) {
      this.setState({
        editablePassword: false,
        editableMobile: false,
        ...param,
      });
    } else {
      this.setState({
        editablePassword: false,
        editableMobile: false,
        userInfo: {
          ...userInfo,
          code: '',
        },
      });
    }
  };
  handleLoginOut = () => {
    this.props.dispatch({
      type: 'user/fakeLogout',
      payload: { userType: 2 },
    });

    removeAuthority();
    Toast.success('退出成功', 1, () => {
      window.location.reload();
    });
  };
  render() {
    const { userInfo, editablePassword, editableMobile, discodeBtn, btnText } = this.state;
    const { username, mobile, code } = userInfo;
    const isEdit = editablePassword || editableMobile;
    return (
      <div className="userinfo-container">
        <NavBar title="我的资料" />
        <List
          renderHeader={() => (
            <div>
              基本信息{' '}
              {isEdit && (
                <span onClick={this.handleUpdateUserInfo}>
                  <i className="iconfont icon-baocun" />
                  保存
                </span>
              )}
            </div>
          )}
        >
          <InputItem
            value={username}
            editable={false}
            placeholder="auto focus"
            ref={el => (this.autoFocusInst = el)}
          >
            账号
          </InputItem>
          <InputItem
            onChange={val => {
              this.setState({ userInfo: { ...userInfo, password: val } });
            }}
            type="password"
            placeholder="*****"
            editable={editablePassword}
            ref={el => (this.inputRef = el)}
            extra={
              !isEdit && (
                <i
                  className="iconfont icon-bianji"
                  onClick={() => {
                    this.setState({ editablePassword: true });
                  }}
                />
              )
            }
          >
            密码
          </InputItem>
          <InputItem
            onChange={val => {
              this.setState({ userInfo: { ...userInfo, mobile: val } });
            }}
            value={mobile}
            editable={editableMobile}
            placeholder="请输入手机号"
            ref={el => (this.inputRef = el)}
            extra={
              !isEdit && (
                <i
                  className="iconfont icon-bianji"
                  onClick={() => {
                    this.setState({ editableMobile: true });
                  }}
                />
              )
            }
          >
            手机号
          </InputItem>
          {mobile &&
            editableMobile && (
              <InputItem
                onChange={val => {
                  this.setState({ userInfo: { ...userInfo, code: val } });
                }}
                value={code}
                placeholder="请输入验证码"
                ref={el => (this.inputRef = el)}
                extra={
                  <Button
                    type="primary"
                    size="small"
                    onClick={this.handleGetCode}
                    disabled={discodeBtn}
                  >
                    {btnText}
                  </Button>
                }
              >
                &nbsp;
              </InputItem>
            )}
        </List>
        <WingBlank>
          <WhiteSpace />
          <WhiteSpace />
          <WhiteSpace />
          <Button onClick={this.handleLoginOut}>安全退出</Button>
        </WingBlank>
      </div>
    );
  }
}
