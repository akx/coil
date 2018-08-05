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

export interface Document {
  nodes: NodeConfig[];
  width: number;
  height: number;
  background?: string;
}

export interface SerializedDocument extends Document {
  version: string;
}

type VariableType = 'number' | 'string' | 'color';

export interface VariableDefinition {
  name: string;
  description?: string;
  default?: string;
  type?: VariableType;
  group?: string;
  choices?: string[];
  static?: boolean;
}
