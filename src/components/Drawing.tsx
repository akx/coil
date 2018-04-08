import * as React from 'react';
import NodeConfig from "../NodeConfig";
import render from "../render";
import Context from "../Context";

export default ({nodeConfigs, width = 1000, height = 1000}) => {
  let nodes: Array<any> = [];
  const context = new Context();
  nodeConfigs.forEach((config: NodeConfig) => {
    nodes = nodes.concat(render(context, config));
  });
  return (
    <svg width={width} height={height}>
      {nodes}
    </svg>
  );
};
