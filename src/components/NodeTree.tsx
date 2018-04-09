import * as React from 'react';
import NodeConfig from "../NodeConfig";

type TreeCommonProps = {
  selectedNode: NodeConfig | null,
  onSelectNode: (node: NodeConfig | null) => void,
};

type TreeNodeProps = TreeCommonProps & {
  nodeConfig: NodeConfig,
};

type TreeLevelProps = TreeCommonProps & {
  nodeConfigs: ReadonlyArray<NodeConfig>,
};

const TreeNode = ({nodeConfig, selectedNode, onSelectNode}: TreeNodeProps) => (
  <li className={selectedNode === nodeConfig ? 'selected' : ''}>
    <a href="#" onClick={(e) => {
      onSelectNode(nodeConfig);
      e.preventDefault();
      e.stopPropagation();
    }}>
      {nodeConfig.module} {nodeConfig.id}
    </a>
    {nodeConfig.children.length ?
      <TreeLevel nodeConfigs={nodeConfig.children} selectedNode={selectedNode} onSelectNode={onSelectNode} /> : null}
  </li>
);

const TreeLevel = ({nodeConfigs, selectedNode, onSelectNode}: TreeLevelProps) => (
  <ul>
    {nodeConfigs.map((nodeConfig: NodeConfig) => (
      <TreeNode
        key={nodeConfig.id}
        nodeConfig={nodeConfig}
        selectedNode={selectedNode}
        onSelectNode={onSelectNode}
      />
    ))}
  </ul>
);

export default ({nodeConfigs, selectedNode, onSelectNode}: TreeLevelProps) => {
  return (
    <div
      id="tree"
      onClick={(e) => {
        console.log(e);
        if (e.currentTarget.id === 'tree') {
          onSelectNode(null);
        }
      }}
    >
      <TreeLevel nodeConfigs={nodeConfigs} selectedNode={selectedNode} onSelectNode={onSelectNode} />
    </div>
  );
};
