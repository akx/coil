// tslint:disable prefer-for-of
import Module from '../modules/Module';
import registry from '../modules/registry';
import { NodeConfig } from '../types';
import Context from './Context';

export function renderNode(context: Context, nodeConfig: NodeConfig) {
  const module: Module = registry[nodeConfig.module];
  if (!module) {
    throw new Error(`not registered ${nodeConfig.module}`);
  }
  try {
    context.status.addVariables(nodeConfig.id, context.variables);
    return module.render(context.subcontext(nodeConfig, {}, nodeConfig.id));
  } catch (e) {
    console.error(e);
    return [];
  }
}

export function renderNodesInto(targetArray: any[], nodes: NodeConfig[], context: Context) {
  for (let i = 0; i < nodes.length; i++) {
    const renderedElts = renderNode(context, nodes[i]);
    for (let j = 0; j < renderedElts.length; j++) {
      targetArray.push(renderedElts[j]);
    }
  }
}
