import Context from "../Context";
import VariableDefinition from "./VariableDefinition";
import {ReactElement} from "react";


export default interface Module {
  acceptsChildren: boolean;
  variables: Array<VariableDefinition>;
  render(context: Context): Array<ReactElement<any>>;
}

export function getVariableDefaults(module: Module): object {
  const defaults = {};
  module.variables.forEach((v) => {
    defaults[v.name] = v.default;
  });
  return defaults;
}

export const UniversalVariables = [
  {name: 'seed', default: '', group: 'Randomness'},
] as VariableDefinition[];
