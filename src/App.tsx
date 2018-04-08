import * as React from 'react';
import NodeConfig from "./NodeConfig";
import NodeTree from "./components/NodeTree";
import NodeConfigView from "./components/NodeConfigView";
import configure from "./modules/configure";
import {renderNodesInto} from './render';
import Context from './Context';
import Dropdown, {DropdownTrigger, DropdownContent} from 'react-simple-dropdown';
import Toolbar from './components/Toolbar';

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
  selectedNodeConfig: NodeConfig | null,
  nodeConfigs: NodeConfig[],
  rendered: any,
};

export default class App extends React.Component<any, AppState> {

  state = {
    selectedNodeConfig: null,
    nodeConfigs: DEFAULT_NODE_CONFIGS,
    rendered: null,
  };

  componentDidMount() {
    this.renderDrawing();
  }

  onSelectNode = ({nodeConfig}): void => {
    this.setState({
      selectedNodeConfig: nodeConfig,
    });
  };

  onChange = (nodeConfig: NodeConfig, variableName: string, value) => {
    nodeConfig.config[variableName] = value;
    this.renderDrawing();
  };

  onAddChild = (nodeConfig: NodeConfig, moduleType: string) => {
    const config = configure(moduleType, {}, []);
    nodeConfig.children.push(config);
    this.setState({selectedNodeConfig: config}, () => {
      this.renderDrawing();
    });
  };

  renderDrawing() {
    let nodes: Array<any> = [];
    const context = new Context();
    renderNodesInto(nodes, this.state.nodeConfigs, context);
    this.setState({rendered: nodes});
  }

  render() {
    const {nodeConfigs, selectedNodeConfig, rendered} = this.state;
    return (
      <>
        <div id="config">
          <div id="tree">
            <Toolbar selectedNode={selectedNodeConfig} />
            <NodeTree
              nodeConfigs={nodeConfigs}
              selectedNode={selectedNodeConfig}
              onSelectNode={this.onSelectNode}
            />
          </div>
          <div id="props">
            {this.state.selectedNodeConfig ? <NodeConfigView
              nodeConfig={selectedNodeConfig!}
              onChange={this.onChange}
              onAddChild={this.onAddChild}
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
