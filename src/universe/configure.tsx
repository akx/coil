import {cloneDeep} from 'lodash';
import Module, {getVariableDefaults} from '../modules/Module';
import registry from '../modules/registry';
import {NodeConfig} from '../types';

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
  children: NodeConfig[] = [],
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
