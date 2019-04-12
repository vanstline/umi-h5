
import React from 'react';

const BizIcon = props => {
  const { type, style } = props;
  return <i style={style} className={`iconfont icon-${type}`} />;
};
export default BizIcon;
