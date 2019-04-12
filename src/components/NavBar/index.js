
import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import router from 'umi/router';
import PropTypes from 'prop-types';
import './index.less';

class NavBar extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { style } = this.props;
    return (
      <div className="ism-nav-bar-header" style={style}>
        <div className="ism-nav-bar-header-left" onClick={this.props.leftClick} >
          {this.props.leftContent}
        </div>
        <div className="ism-nav-bar-header-center">{this.props.children || this.props.title}</div>
        <div className="ism-nav-bar-header-right">
          {/* {this.props.rightButton && this.props.rightButton.map(item => item)} */}
        </div>
      </div>
    );
  }
};

NavBar.defaultProps = {
  style: {},
  leftContent: <Icon type='left'/>,
  leftClick: () => router.goBack(),
};

NavBar.propTypes = {
  title: PropTypes.string,
  style: PropTypes.object,
  leftContent: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  leftClick: PropTypes.func,
};

export default NavBar;