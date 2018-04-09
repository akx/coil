import * as React from 'react';
import Module from '../Module';
import Context from "../../Context";
import NodeConfig from "../../NodeConfig";
import {renderNodesInto} from "../../render";

export default {
  acceptsChildren: true,
  variables: [
    {name: 'numberX', default: '5'},
    {name: 'numberY', default: '5'},
    {name: 'variableX', default: 'vx'},
    {name: 'variableY', default: 'vy'},
  ],

  render(context: Context, node: NodeConfig) {
    let {numberX, numberY, variableX, variableY} = context.evaluateNodeConfig(node);
    const nodes = [];

    numberX = Math.round(parseFloat(numberX));
    numberY = Math.round(parseFloat(numberY));
    for(var y = 0; y < numberY; y++) {
      for (var x = 0; x < numberX; x++) {
        const subcontext = context.subcontext({
          [variableX]: x,
          [variableY]: y,
          [`${variableX}F`]: x / (numberX - 1),
          [`${variableY}F`]: y / (numberY - 1),
        }, `${node.id}.${x}x${y}`);
        renderNodesInto(nodes, node.children, subcontext);
      }
    }
    return nodes;
  },
} as Module;
