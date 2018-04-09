import * as React from 'react';
import NodeConfig from "./NodeConfig";
import NodeTree from "./components/NodeTree";
import NodeConfigView from "./components/NodeConfigView";
import configure from "./modules/configure";
import {renderNodesInto} from './render';
import Context from './Context';
import Toolbar from './components/Toolbar';
import {TreeManager} from "./managers/TreeManager";

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
          configure('Rect', {
            width: '20',
            height: '20',
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
};

export default class App extends React.Component<any, AppState> {

  private treeManager: TreeManager = new TreeManager();

  state = {
    selectedNodeId: null,
    rendered: null,
  };

  componentDidMount() {
    this.treeManager.addTreeUpdateListener((tree) => {
      this.renderDrawing(tree);
    });
    //this.treeManager.replaceTree(DEFAULT_NODE_CONFIGS);
  }

  onSelectNode = (nodeConfig: NodeConfig | null): void => {
    this.setState({
      selectedNodeId: (nodeConfig ? nodeConfig.id : null),
    });
  };

  onChange = (nodeId: string, variableName: string, value) => {
    this.treeManager.changeNodeVariable(nodeId, variableName, value);
  };

  renderDrawing(tree: NodeConfig[]) {
    let nodes: Array<any> = [];
    const context = new Context();
    renderNodesInto(nodes, tree, context);
    this.setState({rendered: nodes});
  }

  render() {
    const {selectedNodeId, rendered} = this.state;
    const {treeManager} = this;
    const selectedNodeConfig = treeManager.getNodeOrNull(selectedNodeId!);
    return (
      <>
        <div id="config">
          <div id="hierarchy">
            <Toolbar treeManager={treeManager} selectedNode={selectedNodeConfig} />
            <NodeTree
              nodeConfigs={treeManager.getTree()}
              selectedNode={selectedNodeConfig}
              onSelectNode={this.onSelectNode}
            />
          </div>
          <div id="props">
            {selectedNodeConfig ? <NodeConfigView
              nodeConfig={selectedNodeConfig!}
              onChange={this.onChange}
            /> : null}
          </div>
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
