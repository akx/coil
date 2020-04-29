import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { TreeManager } from '../managers/TreeManager';
import { Document } from '../types';
import { deserialize, serialize } from '../utils/serde';
import { LoadDocumentHandler } from '../handlers';

interface FilePanelProps {
  treeManager: TreeManager;
  rendered: any; // TODO: yigh
  document: Document;
  onLoadDocument: LoadDocumentHandler;
}

interface FilePanelState {
  serializedState: string;
}

export default class FilePanel extends React.Component<FilePanelProps, FilePanelState> {
  public state: FilePanelState = {
    serializedState: '',
  };

  private dumpState = (event) => {
    const doc = serialize(this.props.document, this.props.treeManager.getTree());
    this.setState({
      serializedState: JSON.stringify(doc, null, event.shiftKey ? undefined : 2),
    });
  };

  private loadState = () => {
    let stateJson;
    try {
      stateJson = JSON.parse(this.state.serializedState);
    } catch (e) {
      alert('Could not parse JSON: ' + e);
      return;
    }
    try {
      const doc = deserialize(stateJson);
      this.props.onLoadDocument(doc);
    } catch (e) {
      alert('Could not read document:' + e);
      return;
    }
  };

  private saveSVG = () => {
    const svgString = ReactDOMServer.renderToStaticMarkup(this.props.rendered).replace(
      '<svg ',
      '<svg xmlns="http://www.w3.org/2000/svg" ',
    );
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const downloadLink = Object.assign(document.createElement('a'), {
      download: `coil-svg-${+new Date()}.svg`,
      href: url,
    });
    document.body.appendChild(downloadLink);
    downloadLink.click();
    setTimeout(() => {
      const parentNode = downloadLink.parentNode;
      if (parentNode) {
        parentNode.removeChild(downloadLink);
      }
      URL.revokeObjectURL(url);
    }, 100);
  };

  public render() {
    return (
      <div id="file-panel">
        <div>
          <button className="btn standalone" onClick={this.dumpState}>
            Save state &darr;
          </button>
          <button className="btn standalone" onClick={this.loadState}>
            Load state &uarr;
          </button>
          <textarea
            value={this.state.serializedState}
            onChange={(e) => this.setState({ serializedState: e.target.value })}
          />
        </div>
        <div>
          <button className="btn standalone" onClick={this.saveSVG}>
            Save rendered SVG...
          </button>
        </div>
      </div>
    );
  }
}
