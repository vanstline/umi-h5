
import React, { PureComponent } from 'react';

class Exception extends PureComponent {
  render() {
    const { children } = this.props;

    return (
      <div>
        异常页面通用结构
        {children}
      </div>
    );
  }
}

export default Exception;
