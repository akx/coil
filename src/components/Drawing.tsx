import * as React from 'react';
import {renderNodesInto} from "../render";
import Context from "../Context";

export default ({nodeConfigs, width = 1000, height = 1000}) => {
  let nodes: Array<any> = [];
  const context = new Context();
  renderNodesInto(nodes, nodeConfigs, context);
  return (
    <svg width={width} height={height}>
      {nodes}
    </svg>
  );
};
