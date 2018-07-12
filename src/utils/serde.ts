import {Document, NodeConfig, SerializedDocument} from '../types';

const version = '0.1';

export function serialize(document: Document, nodes: ReadonlyArray<NodeConfig>): SerializedDocument {
  const docWithNodes: Document = {...document, nodes: nodes as NodeConfig[]};
  return {version, ...docWithNodes};
}

export function deserialize(obj: any): Document {
  if (Array.isArray(obj)) {
    return {
      width: 800,
      height: 800,
      background: '',
      nodes: Array.from(obj),
    };
  }
  if (typeof obj !== 'object') {
    throw new Error('Not an object');
  }
  if (obj.version === version) {
    const doc: SerializedDocument = {...obj};
    delete doc.version;
    return (doc as Document);
  }
  throw new Error(`Object version ${obj.version} not understood`);
}
