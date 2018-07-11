import * as React from 'react';
import {TreeManager} from '../managers/TreeManager';
import {NodeConfig} from '../types';
import * as ReactDOMServer from 'react-dom/server';

interface FilePanelProps {
  treeManager: TreeManager;
  rendered: any;  // TODO: yigh
}

interface FilePanelState {
  serializedState: string;
}

export default class FilePanel extends React.Component<FilePanelProps, FilePanelState> {

  public state: FilePanelState = {
    serializedState: '',
  };

  private dumpState = () => {
    this.setState({
      serializedState: JSON.stringify(this.props.treeManager.getTree(), null, 2),
    });
  }

  private loadState = () => {
    let stateJson;
    try {
      stateJson = JSON.parse(this.state.serializedState);
    } catch (e) {
      alert('Could not parse JSON: ' + e);
      return;
    }
    if (!Array.isArray(stateJson)) {
      alert('Input is not an array.');
      return;
    }
    this.props.treeManager.replaceTree(stateJson as NodeConfig[]);
  }

  private saveSVG = () => {
    const svgString = (
      ReactDOMServer.renderToStaticMarkup(this.props.rendered)
        .replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ')
    );
    const blob = new Blob([svgString], {type: 'image/svg+xml'});
    const url = URL.createObjectURL(blob);
    const downloadLink = Object.assign(document.createElement('a'), {
      download: `coil-svg-${+new Date()}.svg`,
      href: url,
    });
    document.body.appendChild(downloadLink);
    downloadLink.click();
    setTimeout(() => {
      downloadLink.parentNode!.removeChild(downloadLink);
      URL.revokeObjectURL(url);
    }, 100);
  }

  public render() {
    const {treeManager, rendered} = this.props;
    return (
      <div id="file-panel">
        <div>
          <button className="btn standalone" onClick={this.dumpState}>Save state &darr;</button>
          <button className="btn standalone" onClick={this.loadState}>Load state &uarr;</button>
          <textarea
            value={this.state.serializedState}
            onChange={(e) => this.setState({serializedState: e.target.value})}
          />
        </div>
        <div>
          <button className="btn standalone" onClick={this.saveSVG}>Save rendered SVG...</button>
        </div>
      </div>
    );
  }
}
