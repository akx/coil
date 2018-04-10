import {NodeConfig} from "./NodeConfig";
import registry from "./modules/registry";
import Context from "./Context";
import Module from "./modules/Module";

export function renderNode(context: Context, nodeConfig: NodeConfig) {
  const module: Module = registry[nodeConfig.module];
  if (!module) {
    throw new Error(`not registered ${nodeConfig.module}`);
  }
  try {
    context.status.addVariables(nodeConfig.id, context.variables);
    return module.render(context, nodeConfig);
  } catch (e) {
    console.error(e);
    return [];
  }
}

export function renderNodesInto(targetArray: Array<any>, nodes: NodeConfig[], context: Context) {
  nodes.forEach((node: NodeConfig) => {
    renderNode(context, node).forEach((node) => {
      targetArray.push(node);
    });
  });
}
