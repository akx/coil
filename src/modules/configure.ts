import registry from './registry';
import NodeConfig from "../NodeConfig";
import Module from "./Module";

export default function configure(moduleName: string, variables: any, children: Array<NodeConfig> = []): NodeConfig {
  const moduleClass: { new(): Module } = registry[moduleName];
  const module: Module = new moduleClass();
  const defaults = module.getVariableDefaults();
  return {
    id: `${Math.floor(Math.random() * 0xFFFFFFFF).toString(30)}`,
    module: moduleName,
    config: Object.assign({}, defaults, variables),
    children,
  };
}
