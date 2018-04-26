import * as React from 'react';
import {NodeConfig} from "../NodeConfig";
import registry from "../modules/registry";

type TreeCommonProps = {
  selectedNode: NodeConfig | null,
  onSelectNode: (node: NodeConfig | null) => void,
  onRepositionNode: (sourceNodeId: string, targetNodeId: string, copy: boolean) => void,
};

type TreeNodeProps = TreeCommonProps & {
  nodeConfig: NodeConfig,
};

type TreeLevelProps = TreeCommonProps & {
  nodeConfigs: ReadonlyArray<NodeConfig>,
};

const DRAG_AND_DROP_DATA_ID = 'application/x-coil-nodeid';

const TreeNode = ({nodeConfig, selectedNode, onSelectNode, onRepositionNode}: TreeNodeProps) => (
  <li className={selectedNode === nodeConfig ? 'selected' : ''}>
    <a
      href="#"
      draggable={true}
      onClick={(e) => {
        onSelectNode(nodeConfig);
        e.preventDefault();
        e.stopPropagation();
      }}
      onDragStart={(event) => {
        event.dataTransfer.clearData();
        event.dataTransfer.setData(DRAG_AND_DROP_DATA_ID, nodeConfig.id);
        event.dataTransfer.effectAllowed = 'all';
      }}
      onDragOver={(event) => {
        event.dataTransfer.dropEffect = 'none';
        if (event.dataTransfer.types.indexOf(DRAG_AND_DROP_DATA_ID) > -1) {
          if (registry[nodeConfig.module].acceptsChildren) {
            event.dataTransfer.dropEffect = (event.altKey ? 'copy' : 'link');
            event.preventDefault();
          }
        }
      }}
      onDrop={(event) => {
        const sourceNodeId = event.dataTransfer.getData(DRAG_AND_DROP_DATA_ID);
        event.dataTransfer.dropEffect = (event.altKey ? 'copy' : 'link');
        const copy = (event.dataTransfer.dropEffect === 'copy');
        onRepositionNode(sourceNodeId, nodeConfig.id, copy);
      }}
    >
      {nodeConfig.module}
    </a>
    {nodeConfig.children.length ?
      <TreeLevel
        nodeConfigs={nodeConfig.children}
        selectedNode={selectedNode}
        onSelectNode={onSelectNode}
        onRepositionNode={onRepositionNode}
      />
      : null
    }
  </li>
);

const TreeLevel = ({nodeConfigs, selectedNode, onSelectNode, onRepositionNode}: TreeLevelProps) => (
  <ul>
    {nodeConfigs.map((nodeConfig: NodeConfig) => (
      <TreeNode
        key={nodeConfig.id}
        nodeConfig={nodeConfig}
        selectedNode={selectedNode}
        onSelectNode={onSelectNode}
        onRepositionNode={onRepositionNode}
      />
    ))}
  </ul>
);

export default ({nodeConfigs, selectedNode, onSelectNode, onRepositionNode}: TreeLevelProps) => {
  return (
    <div
      id="tree"
      onClick={(e) => {
        if (e.currentTarget.id === 'tree') {
          onSelectNode(null);
        }
      }}
    >
      <TreeLevel
        nodeConfigs={nodeConfigs}
        selectedNode={selectedNode}
        onSelectNode={onSelectNode}
        onRepositionNode={onRepositionNode}
      />
    </div>
  );
};
