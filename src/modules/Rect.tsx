import * as React from 'react';
import Module from './Module';
import Context from "../Context";
import NodeConfig from "../NodeConfig";

export default class Rect extends Module {
  static variables = [
    {name: 'x', default: '0'},
    {name: 'y', default: '0'},
    {name: 'width', default: '20'},
    {name: 'height', default: '20'},
    {name: 'fill', default: '#333'},
    {name: 'opacity', default: '1'},
  ];

  render(context: Context, node: NodeConfig) {
    const {width, height, x, y, fill, opacity} = context.evaluateAll(node.config);
    return [<rect x={x} y={y} width={width} height={height} fill={fill} opacity={opacity} />];
  }
}
