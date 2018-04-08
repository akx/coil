import registry from './registry';
import NodeConfig from "../NodeConfig";
import Module, {getVariableDefaults} from "./Module";

export default function configure(moduleName: string, variables: any, children: Array<NodeConfig> = []): NodeConfig {
  const module: Module = registry[moduleName];
  const defaults = getVariableDefaults(module);
  return {
    id: `${Math.floor(Math.random() * 0xFFFFFFFF).toString(30)}`,
    module: moduleName,
    config: Object.assign({}, defaults, variables),
    children,
  };
}
