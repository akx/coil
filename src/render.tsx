import NodeConfig from "./NodeConfig";
import registry from "./modules/registry";
import Context from "./Context";
import Module from "./modules/Module";

export default function render(context: Context, nodeConfig: NodeConfig) {
  const module: Module = registry[nodeConfig.module];
  if (!module) {
    throw new Error(`not registered ${nodeConfig.module}`);
  }
  try {
    return module.render(context, nodeConfig);
  } catch (e) {
    console.error(e);
    return [];
  }
}
