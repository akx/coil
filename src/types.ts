export interface VariableMap {
  [key: string]: any;
}

export interface ExpressionMap {
  [key: string]: string | null;
}

export interface NodeConfig {
  id: string;
  module: string;
  config: ExpressionMap;
  children: NodeConfig[];
}

export interface GVar {
  name: string;
  type: VariableType;
  min: number;
  max: number;
  value: number | string;
}

export interface Document {
  nodes: NodeConfig[];
  width: number;
  height: number;
  background?: string;
  gvars: GVar[];
}

export interface SerializedDocument extends Document {
  version: string;
}

export type VariableType = 'number' | 'string' | 'color';

export interface VariableDefinition {
  name: string;
  description?: string;
  default?: string;
  type?: VariableType;
  group?: string;
  choices?: string[];
  static?: boolean;
}
