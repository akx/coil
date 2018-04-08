import * as React from 'react';
import NodeConfig from "./NodeConfig";
import Drawing from "./components/Drawing";
import NodeTree from "./components/NodeTree";
import NodeConfigView from "./components/NodeConfigView";
import configure from "./modules/configure";

const DEFAULT_NODE_CONFIGS: NodeConfig[] = [
  configure(
    'LinearArray',
    {
      number: '7',
      variable: 'i',
    },
    [
      configure('Rect', {
        width: '20',
        height: '20',
        x: '=15 + i * 150',
        fill: 'blue',
      }),
    ]),
];

type AppState = {
  selectedNodeConfig: NodeConfig | null,
  nodeConfigs: NodeConfig[],
};

export default class App extends React.Component<any, AppState> {

  state = {
    selectedNodeConfig: null,
    nodeConfigs: DEFAULT_NODE_CONFIGS,
  };

  onSelectNode = ({nodeConfig}): void => {
    this.setState({
      selectedNodeConfig: nodeConfig,
    });
  };

  onChange = (nodeConfig: NodeConfig, variableName: string, value) => {
    nodeConfig.config[variableName] = value;
    this.forceUpdate();
  };

  onAddChild = (nodeConfig: NodeConfig, moduleType: string) => {
    const config = configure(moduleType, {}, []);
    nodeConfig.children.push(config);
    this.setState({selectedNodeConfig: config});
  };

  render() {
    const {nodeConfigs, selectedNodeConfig} = this.state;
    return (
      <>
        <div id="config">
          <div id="tree">
            <NodeTree nodeConfigs={nodeConfigs} onSelectNode={this.onSelectNode} />
          </div>
          <div id="props">
            {this.state.selectedNodeConfig ? <NodeConfigView
              nodeConfig={selectedNodeConfig!}
              onChange={this.onChange}
              onAddChild={this.onAddChild}
            /> : null}
          </div>
        </div>
        <Drawing nodeConfigs={nodeConfigs} width={800} height={800} />
      </>
    );
  }
}
