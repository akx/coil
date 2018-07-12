import * as React from 'react';
import GlobalToolbar from '../components/GlobalToolbar';
import {TreeManager} from '../managers/TreeManager';
import FilePanel from '../sidebar-panels/FilePanel';
import TreePanel from '../sidebar-panels/TreePanel';
import {Document, NodeConfig} from '../types';
import Context from '../universe/Context';
import Status from '../universe/Status';
import makeDefaultConfig from '../utils/defaultConfig';
import * as storage from '../utils/storage';

interface AppState {
  selectedNodeId: string | null;
  rendered: any;
  status: Status;
  activeTab: 'tree' | 'file';
  document: Document;
}

const STORAGE_KEY = 'coilSave';

export default class App extends React.Component<{}, AppState> {

  private treeManager: TreeManager = new TreeManager();

  public state: AppState = {
    selectedNodeId: null,
    rendered: null,
    status: new Status(),
    activeTab: 'tree',
    document: {
      nodes: [],
      width: 800,
      height: 800,
      background: 'orange',
    },
  };

  public componentDidMount() {
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

  public renderDrawing(tree: NodeConfig[]) {
    const status = new Status();
    const rootPseudoNode = {id: 'root', module: 'root', config: {}, children: tree};
    const context = new Context(status, rootPseudoNode);
    const {width, height, background} = this.state.document;
    let renderedChildren;
    try {
      renderedChildren = context.renderChildren();
    } catch (e) {
      renderedChildren = <text y={50} x={50}>{e.toString()}</text>;
      console.error(renderedChildren);
    }
    const rendered = (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {background ? <rect x={0} y={0} width={width} height={height} fill={background} id="background" /> : null}
        {renderedChildren}
      </svg>
    );
    this.setState({rendered, status});
  }

  public onChangeTab = (tabId) => {
    this.setState({activeTab: tabId});
  }

  public render() {
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
