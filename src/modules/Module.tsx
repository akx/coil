import { ReactElement } from 'react';
import Context from '../universe/Context';
import { VariableDefinition } from '../types';

export default interface Module {
  acceptsChildren: boolean;
  noUniversalVariables?: boolean;
  variables: VariableDefinition[];

  render(context: Context): Array<ReactElement>;
}

export function getVariableDefaults(module: Module): object {
  const defaults = {};
  module.variables.forEach((v) => {
    defaults[v.name] = v.default;
  });
  return defaults;
}

export const UniversalVariables = [{ name: 'seed', default: '', group: 'Randomness' }] as VariableDefinition[];
