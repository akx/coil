import * as React from 'react';
import Module from '../Module';
import Context from '../../universe/Context';
import {renderNodesInto} from '../../universe/render';

const THREE_OVER_TWO = (3 / 2);
const SQRT_THREE = Math.sqrt(3);
const SQRT_THREE_OVER_TWO = SQRT_THREE / 2;

export default {
  acceptsChildren: true,
  variables: [
    {name: 'numberX', default: '5'},
    {name: 'numberY', default: '5'},
    {name: 'variableX', default: 'vx'},
    {name: 'variableY', default: 'vy'},
    {
      name: 'hex',
      default: 'none',
      choices: [
        'none',
        'flat',
        'pointy',
      ],
    }
  ],

  render(context: Context) {
    const {node} = context;
    // tslint:disable-next-line:prefer-const
    let {numberX, numberY, variableX, variableY, hex} = context.evaluateNodeConfig(node);
    const nodes = [];

    numberX = Math.round(parseFloat(numberX));
    numberY = Math.round(parseFloat(numberY));
    for (let y = 0; y < numberY; y++) {
      for (let x = 0; x < numberX; x++) {
        const newVariables = {
          [variableX]: x,
          [variableY]: y,
          [`${variableX}F`]: x / (numberX - 1),
          [`${variableY}F`]: y / (numberY - 1),
        };
        if (hex === 'flat') {
          newVariables[`${variableX}Hex`] = THREE_OVER_TWO * x;
          newVariables[`${variableY}Hex`] = SQRT_THREE_OVER_TWO * x + SQRT_THREE * y;
        } else if (hex === 'pointy') {
          newVariables[`${variableX}Hex`] = SQRT_THREE * x + SQRT_THREE_OVER_TWO * y;
          newVariables[`${variableY}Hex`] = THREE_OVER_TWO * y;
        }
        const subcontext = context.subcontext(node, newVariables, `${x}x${y}`);
        renderNodesInto(nodes, node.children, subcontext);
      }
    }
    return nodes;
  },
} as Module;
