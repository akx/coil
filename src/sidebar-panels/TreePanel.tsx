import * as React from 'react';
import NodeConfigView from '../components/NodeConfigView';
import NodeTree from '../components/NodeTree';
import TreeToolbar from '../components/TreeToolbar';
import {TreeManager} from '../managers/TreeManager';
import {NodeConfig} from '../types';
import Status from '../universe/Status';

interface TreePanelProps {
  treeManager: TreeManager;
  status: Status;
  selectedNodeId: string | null;
  onSelectNode: (nodeConfig: NodeConfig | null) => void;
}

export default class TreePanel extends React.Component<TreePanelProps, {}> {

  private onChangeNodeVariable = (nodeConfig: NodeConfig, variableName: string, newValue: string) => {
    this.props.treeManager.changeNodeVariable(nodeConfig.id, variableName, newValue);
    this.forceUpdate();  // Avoid asynchronous input caret position problem :(
  }

  private onRepositionNode = (sourceNodeId: string, targetNodeId: string, copy: boolean) => {
    if (copy) {
      this.props.treeManager.copyNode(sourceNodeId, targetNodeId);
    } else {
      this.props.treeManager.moveNode(sourceNodeId, targetNodeId);
    }
  }

  public render() {
    const {treeManager, selectedNodeId, status} = this.props;
    const selectedNodeConfig = treeManager.getNodeOrNull(selectedNodeId!);
    return (
      <>
        <div id="hierarchy">
          <TreeToolbar treeManager={treeManager} selectedNode={selectedNodeConfig} />
          <NodeTree
            nodeConfigs={treeManager.getTree()}
            selectedNode={selectedNodeConfig}
            onSelectNode={this.props.onSelectNode}
            onRepositionNode={this.onRepositionNode}
          />
        </div>
        <div id="props">
          {selectedNodeConfig ?
            <NodeConfigView
              nodeConfig={selectedNodeConfig!}
              status={status}
              onChange={this.onChangeNodeVariable}
            />
            : null
          }
        </div>
      </>
    );
  }
}
