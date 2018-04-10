import * as React from 'react';
import NodeConfig from "./NodeConfig";
import NodeTree from "./components/NodeTree";
import NodeConfigView from "./components/NodeConfigView";
import configure from "./modules/configure";
import {renderNodesInto} from './render';
import Context from './Context';
import Toolbar from './components/Toolbar';
import {TreeManager} from "./managers/TreeManager";
import Status from "./Status";

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
  status: Status,
};

export default class App extends React.Component<any, AppState> {

  private treeManager: TreeManager = new TreeManager();

  state = {
    selectedNodeId: null,
    rendered: null,
    status: new Status(),
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

  onChange = (nodeId: string, variableName: string, value) => {
    this.treeManager.changeNodeVariable(nodeId, variableName, value);
    this.forceUpdate();  // Avoid asynchronous input caret position problem :(
  };

  onMoveNode = (sourceNodeId: string, targetNodeId: string) => {
    this.treeManager.moveNode(sourceNodeId, targetNodeId);
  };

  renderDrawing(tree: NodeConfig[]) {
    let rendered: Array<any> = [];
    const status = new Status();
    const context = new Context(status);
    renderNodesInto(rendered, tree, context);
    this.setState({rendered, status});
  }

  render() {
    const {selectedNodeId, rendered, status} = this.state;
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
              onMoveNode={this.onMoveNode}
            />
          </div>
          <div id="props">
            {selectedNodeConfig ?
              <NodeConfigView
                nodeConfig={selectedNodeConfig!}
                status={status}
                onChange={this.onChange}
              />
              : null
            }
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
