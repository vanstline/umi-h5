
import React, { PureComponent } from 'react';
import { Icon, List, WhiteSpace, Badge, DatePicker, Popover } from 'antd-mobile';
import router from 'umi/router';
import { connect } from 'dva';
import { NavBar } from '@/components'
import './index.less';

@connect(({ store, loading }) => ({
  storeInfo: store.storeInfo,
  loading: loading.effects['store/homePageInfo'],
}))
class Index extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { };
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'store/fetchQueryStoreHomePageInfo',
      payload: {},
    });
  }
  render() {
    const { storeInfo } = this.props;
    const {
      storeName,
      username,
      mobile,
      headimgurl,
      messageNum,
    } = storeInfo;
    return (
      <div className="home-container">
        <NavBar leftContent={null} title='首页' />
        <List className="am-list-user">
          <div className="am-list-item user-info-item am-list-item-middle">
            <div className="am-list-thumb">
              <img src={headimgurl} />
            </div>
            <div
              className=" am-list-line-multiple"
              onClick={() => {
                router.push('/userinfo');
              }}
            >
              <div className="am-list-content">
                {username} {mobile} <WhiteSpace size="sm" />
                {storeName}{' '}
              </div>
              <Icon type="right" style={{ marginTop: '.6rem' }} />
            </div>
            <div
              className="message-bell"
              onClick={() => {
                router.push('/message');
              }}
            >
              {messageNum ? (
                <Badge dot text={messageNum}>
                  <i className="iconfont icon-tongzhi" />
                </Badge>
              ) : (
                <i className="iconfont icon-tongzhi" />
              )}
            </div>
          </div>
        </List>
      </div>
    );
  }
}

export default Index;
