import * as React from 'react';
import Context from '../universe/Context';
import {TreeManager} from '../managers/TreeManager';
import Status from '../universe/Status';
import GlobalToolbar from '../components/GlobalToolbar';
import {NodeConfig} from '../types';
import TreePanel from '../sidebar-panels/TreePanel';
import FilePanel from '../sidebar-panels/FilePanel';
import * as storage from '../utils/storage';
import makeDefaultConfig from '../utils/defaultConfig';

type AppState = {
  selectedNodeId: string | null,
  rendered: any,
  status: Status,
  activeTab: 'tree' | 'file',
};

const STORAGE_KEY = 'coilSave';

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
    this.treeManager.addTreeUpdateListener((tree) => {
      storage.save(STORAGE_KEY, tree);
    });

    const lTree = storage.load(STORAGE_KEY) || makeDefaultConfig();
    this.treeManager.replaceTree(lTree);
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
