import * as React from 'react';
import {configure} from '../universe/configure';
import Context from '../universe/Context';
import {TreeManager} from '../managers/TreeManager';
import Status from '../universe/Status';
import GlobalToolbar from '../components/GlobalToolbar';
import {NodeConfig} from '../types';
import TreePanel from '../sidebar-panels/TreePanel';
import FilePanel from '../sidebar-panels/FilePanel';

const DEFAULT_NODE_CONFIGS: NodeConfig[] = [
  configure(
    'RemoveChildren',
    {
      seed: 'foo',
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
  activeTab: 'tree' | 'file',
};

export default class App extends React.Component<{}, AppState> {

  private treeManager: TreeManager = new TreeManager();

  public state: AppState = {
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

  private onSelectNode = (nodeConfig: NodeConfig | null): void => {
    this.setState({
      selectedNodeId: (nodeConfig ? nodeConfig.id : null),
    });
  }

  renderDrawing(tree: NodeConfig[]) {
    const status = new Status();
    const rootPseudoNode = {id: 'root', module: 'root', config: {}, children: tree};
    const context = new Context(status, rootPseudoNode);
    const width = 800;
    const height = 800;
    let renderedChildren;
    try {
      renderedChildren = context.renderChildren();
    } catch (e) {
      renderedChildren = <text y={50} x={50}>{e.toString()}</text>;
      console.error(renderedChildren);
    }
    const rendered = (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {renderedChildren}
      </svg>
    );
    this.setState({rendered, status});
  }

  onChangeTab = (tabId) => {
    this.setState({activeTab: tabId});
  }

  render() {
    const {selectedNodeId, rendered, status, activeTab} = this.state;
    const {treeManager} = this;
    const selectedNodeConfig = treeManager.getNodeOrNull(selectedNodeId!);
    let configContent: React.ReactElement<any> | null = null;
    switch (activeTab) {
      case 'tree':
        configContent = (
          <TreePanel
            treeManager={this.treeManager}
            status={this.state.status}
            selectedNodeId={this.state.selectedNodeId}
            onSelectNode={this.onSelectNode}
          />
        );
        break;
      case 'file':
        configContent = (
          <FilePanel
            treeManager={this.treeManager}
            rendered={this.state.rendered}
          />
        );
        break;
    }
    return (
      <>
        <div id="config">
          <GlobalToolbar activeTab={activeTab} onChangeTab={this.onChangeTab} />
          {configContent}
        </div>
        <div id="drawing">
          {rendered}
        </div>
      </>
    );
  }
}
