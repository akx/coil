import * as React from 'react';
import Module from '../Module';
import Context from '../../universe/Context';
import { renderNodesInto } from '../../universe/render';

const THREE_OVER_TWO = 3 / 2;
const SQRT_THREE = Math.sqrt(3);
const SQRT_THREE_OVER_TWO = SQRT_THREE / 2;

function makeHex(hex: string, x: number, y: number): [number, number] {
  if (hex === 'flat' || hex === 'flatRect') {
    if (hex === 'flatRect') {
      y -= x >> 1;
    }
    return [THREE_OVER_TWO * x, SQRT_THREE_OVER_TWO * x + SQRT_THREE * y];
  } else if (hex === 'pointy' || hex === 'pointyRect') {
    if (hex === 'pointyRect') {
      x -= y >> 1;
    }
    return [SQRT_THREE * x + SQRT_THREE_OVER_TWO * y, THREE_OVER_TWO * y];
  }
  return [0, 0];
}

export default {
  acceptsChildren: true,
  variables: [
    { name: 'numberX', default: '5' },
    { name: 'numberY', default: '5' },
    { name: 'variableX', default: 'vx' },
    { name: 'variableY', default: 'vy' },
    {
      name: 'hex',
      default: 'none',
      choices: ['none', 'flat', 'flatRect', 'pointy', 'pointyRect'],
    },
  ],

  render(context: Context) {
    const { node } = context;
    // tslint:disable-next-line:prefer-const
    let { numberX, numberY, variableX, variableY, hex } = context.evaluateNodeConfig(node);
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
        if (hex !== 'none') {
          const [hexX, hexY] = makeHex(hex, x, y);
          newVariables[`${variableX}Hex`] = hexX;
          newVariables[`${variableY}Hex`] = hexY;
        }
        const subcontext = context.subcontext(node, newVariables, `${x}x${y}`);
        renderNodesInto(nodes, node.children, subcontext);
      }
    }
    return nodes;
  },
} as Module;
