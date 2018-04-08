import NodeConfig from "./NodeConfig";
import registry from "./modules/registry";
import Context from "./Context";
import Module from "./modules/Module";

export default function render(context: Context, nodeConfig: NodeConfig) {
  const moduleClass: { new(): Module } = registry[nodeConfig.module];
  if (!moduleClass) {
    throw new Error(`not registered ${nodeConfig.module}`);
  }
  const module = new moduleClass();
  try {
    return module.render(context, nodeConfig);
  } catch (e) {
    console.error(e);
    return [];
  }
}
