
export interface VariableMap {
  [key: string]: any;
}

export interface ExpressionMap {
  [key: string]: string | null;
}

export type ChangeNodeConfigHandler = (nodeConfig: NodeConfig, variableName: string, newValue: string) => void;

export interface NodeConfig {
  id: string;
  module: string;
  config: ExpressionMap;
  children: NodeConfig[];
}