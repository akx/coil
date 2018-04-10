import Module, {getVariableDefaults} from "./modules/Module";
import registry from "./modules/registry";

export interface NodeConfig {
  id: string;
  module: string;
  config: any;
  children: Array<NodeConfig>;
}

function generateId() {
  return `${Math.floor(Math.random() * 0xFFFFFFFF).toString(36)}`;
}


export function configure(
  moduleName: string,
  variables: { [key: string]: any },
  children: Array<NodeConfig> = [],
): NodeConfig {
  const module: Module = registry[moduleName];
  const defaults = getVariableDefaults(module);
  return {
    id: generateId(),
    module: moduleName,
    config: Object.assign({}, defaults, variables),
    children,
  };
}
