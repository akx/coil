import { cloneDeep } from 'lodash';
import Module, { getVariableDefaults } from '../modules/Module';
import registry from '../modules/registry';
import { NodeConfig } from '../types';

function generateId() {
  return `${Math.floor(Math.random() * 0xffffffff).toString(36)}`;
}

export function duplicate(nodeConfig: NodeConfig): NodeConfig {
  function walk(wConfig: NodeConfig): NodeConfig {
    return {
      id: generateId(),
      module: wConfig.module,
      config: cloneDeep(wConfig.config),
      children: wConfig.children.map(walk),
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
