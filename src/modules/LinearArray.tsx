import * as React from 'react';
import Module from './Module';
import Context from "../Context";
import NodeConfig from "../NodeConfig";
import render from "../render";

export default class LinearArray extends Module {
  static acceptsChildren = true;
  static variables = [
    {name: 'number', default: '5'},
    {name: 'variable', default: 'i'},
  ];

  render(context: Context, node: NodeConfig) {
    const {number, variable} = context.evaluateAll(node.config);
    const nodes: Array<Element> = [];

    const nNumber = parseInt(number);
    for (var i = 0; i < nNumber; i++) {
      const subcontext = context.subcontext({[variable]: i / (nNumber - 1)});
      node.children.forEach((child: NodeConfig) => {
        render(subcontext, child).forEach((node) => nodes.push(node));
      });
    }
    return nodes;
  }
}
