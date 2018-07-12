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
