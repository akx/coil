import Module from '../Module';
import Context from '../../universe/Context';
import { renderNodesInto } from '../../universe/render';

export default {
  acceptsChildren: true,
  variables: [
    { name: 'childIndex', default: '0' },
    { name: 'indexVariable', default: 'u' },
  ],

  render(context: Context) {
    const { node } = context;
    const { childIndex, indexVariable } = context.evaluateNodeConfig(node);
    const index = parseInt(childIndex, 10);
    const child = node.children[index % node.children.length];
    const nodes = [];
    if (child) {
      const subcontext = context.subcontext(
        node,
        {
          [indexVariable]: childIndex,
        },
        `child${childIndex}`,
      );
      renderNodesInto(nodes, [child], subcontext);
    }
    return nodes;
  },
} as Module;
