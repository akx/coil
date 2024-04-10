import { Document, NodeConfig, SerializedDocument } from '../types';

const version = '0.1';

const documentDefaults: Partial<Document> = {
  width: 800,
  height: 800,
  background: '',
  gvars: [],
};

export function serialize(document: Document, nodes: ReadonlyArray<NodeConfig>): SerializedDocument {
  const docWithNodes: Document = { ...document, nodes: nodes as NodeConfig[] };
  return { version, ...docWithNodes };
}

export function deserialize(obj: any): Document {
  if (Array.isArray(obj)) {
    return {
      ...documentDefaults,
      nodes: Array.from(obj),
    } as Document;
  }
  if (typeof obj !== 'object') {
    throw new Error('Not an object');
  }
  if (obj.version === version) {
    const doc: Document = { ...documentDefaults, ...obj };
    delete (doc as any).version;
    return doc;
  }
  throw new Error(`Object version ${obj.version} not understood`);
}
