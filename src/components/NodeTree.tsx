import * as React from 'react';
import NodeConfig from "../NodeConfig";

const TreeNode = ({nodeConfig, onSelectNode}: { nodeConfig: NodeConfig, onSelectNode: Function }) => (
  <li>
    <a href="#" onClick={() => onSelectNode({nodeConfig})}>{nodeConfig.module} {nodeConfig.id}</a>
    {nodeConfig.children.length ?
      <TreeLevel nodeConfigs={nodeConfig.children} onSelectNode={onSelectNode} /> : null}
  </li>
);

const TreeLevel = ({nodeConfigs, onSelectNode}: { nodeConfigs: NodeConfig[], onSelectNode: Function }) => (
  <ul>
    {nodeConfigs.map((nodeConfig: NodeConfig) => (
      <TreeNode
        key={nodeConfig.id}
        nodeConfig={nodeConfig}
        onSelectNode={onSelectNode}
      />
    ))}
  </ul>
);

export default ({nodeConfigs, onSelectNode}) => {
  return (
    <div><TreeLevel nodeConfigs={nodeConfigs} onSelectNode={onSelectNode} /></div>
  );
};
