import { Document, NodeConfig } from './types';

export type ChangeNodeConfigHandler = (nodeConfig: NodeConfig, variableName: string, newValue: string) => void;
export type ChangeDocumentConfigHandler = (variableName: keyof Document, value: string) => void;
export type SelectNodeHandler = (nodeConfig: NodeConfig | null) => void;
export type LoadDocumentHandler = (newDocument: Document) => void;
