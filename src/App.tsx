import * as React from 'react';
import {configure, NodeConfig} from "./NodeConfig";
import NodeTree from "./components/NodeTree";
import NodeConfigView from "./components/NodeConfigView";
import Context from './Context';
import TreeToolbar from './components/TreeToolbar';
import {TreeManager} from "./managers/TreeManager";
import Status from "./Status";
import GlobalToolbar from "./components/GlobalToolbar";

const DEFAULT_NODE_CONFIGS: NodeConfig[] = [
  configure(
    'RemoveChildren',
    {
      'seed': 'foo',
    },
    [
      configure(
        'RectArray',
        {
          numberX: '7',
          numberY: '7',
          variableX: 'i',
          variableY: 'j',
        },
        [
          configure('Ngon', {
            radius1: '15',
            radius2: '5',
            vertices: '10',
            x: '=15 + i * 30',
            y: '=30 + j * 30',
            fill: 'blue',
          }),
        ]),
    ]),
];

type AppState = {
  selectedNodeId: string | null,
  rendered: any,
  status: Status,
  activeTab: string,
};

export default class App extends React.Component<any, AppState> {

  private treeManager: TreeManager = new TreeManager();

  state = {
    selectedNodeId: null,
    rendered: null,
    status: new Status(),
    activeTab: 'tree',
  };

  componentDidMount() {
    this.treeManager.addTreeUpdateListener((tree) => {
      this.renderDrawing(tree);
    });
    this.treeManager.replaceTree(DEFAULT_NODE_CONFIGS);
  }

  onSelectNode = (nodeConfig: NodeConfig | null): void => {
    this.setState({
      selectedNodeId: (nodeConfig ? nodeConfig.id : null),
    });
  };

  onChangeNodeVariable = (nodeConfig: NodeConfig, variableName: string, newValue: string) => {
    this.treeManager.changeNodeVariable(nodeConfig.id, variableName, newValue);
    this.forceUpdate();  // Avoid asynchronous input caret position problem :(
  };

  onRepositionNode = (sourceNodeId: string, targetNodeId: string, copy: boolean) => {
    if (copy) {
      this.treeManager.copyNode(sourceNodeId, targetNodeId);
    } else {
      this.treeManager.moveNode(sourceNodeId, targetNodeId);
    }
  };

  renderDrawing(tree: NodeConfig[]) {
    const status = new Status();
    const rootPseudoNode = {id: 'root', module: 'root', config: {}, children: tree};
    const context = new Context(status, rootPseudoNode);
    const rendered = context.renderChildren();
    this.setState({rendered, status});
  }

  onChangeTab = (tabId) => {
    this.setState({activeTab: tabId});
  };

  render() {
    const {selectedNodeId, rendered, status, activeTab} = this.state;
    const {treeManager} = this;
    const selectedNodeConfig = treeManager.getNodeOrNull(selectedNodeId!);
    let configContent: React.ReactElement<any> | null = null;
    switch (activeTab) {
      case 'tree':
        configContent = (
          <>
            <div id="hierarchy">
              <TreeToolbar treeManager={treeManager} selectedNode={selectedNodeConfig} />
              <NodeTree
                nodeConfigs={treeManager.getTree()}
                selectedNode={selectedNodeConfig}
                onSelectNode={this.onSelectNode}
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
    return (
      <>
        <div id="config">
          <GlobalToolbar activeTab={activeTab} onChangeTab={this.onChangeTab} />
          {configContent}
        </div>
        <div id="drawing">
          <svg width={800} height={800}>
            {rendered}
          </svg>
        </div>
      </>
    );
  }
}
