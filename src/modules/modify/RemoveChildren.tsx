import Module from '../Module';
import Context from '../../universe/Context';
import { renderNodesInto } from '../../universe/render';

export default {
  acceptsChildren: true,
  variables: [
    { name: 'keep', default: '=rand() < .5' },
    { name: 'indexVariable', default: 'i' },
  ],

  render(context: Context) {
    const node = context.node;
    const indexVariable = context.evaluateFromNodeConfig('indexVariable');
    const nodes = [];
    renderNodesInto(nodes, node.children, context);
    const filterContext = context.subcontext(node);
    const keepExpression = node.config.keep || '';
    return nodes.filter((child, index) =>
      filterContext.evaluate(`keep ${index}`, keepExpression, {
        [indexVariable]: index,
      }),
    );
  },
} as Module;
