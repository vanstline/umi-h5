
import React, { PureComponent } from 'react';

import './index.less';

export default class Footer extends PureComponent {
  render() {
    return <div className="ism-fixed-footer-container">{this.props.children}</div>;
  }
}
