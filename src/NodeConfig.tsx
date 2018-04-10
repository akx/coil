import Module, {getVariableDefaults} from "./modules/Module";
import registry from "./modules/registry";
import {ExpressionMap} from "./types";
import {cloneDeep} from 'lodash';

export interface NodeConfig {
  id: string;
  module: string;
  config: ExpressionMap;
  children: Array<NodeConfig>;
}

function generateId() {
  return `${Math.floor(Math.random() * 0xFFFFFFFF).toString(36)}`;
}

export function duplicate(nodeConfig: NodeConfig): NodeConfig {
  function walk(nodeConfig: NodeConfig): NodeConfig {
    return {
      id: generateId(),
      module: nodeConfig.module,
      config: cloneDeep(nodeConfig.config),
      children: nodeConfig.children.map(walk),
    };
  }

  return walk(nodeConfig);
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
