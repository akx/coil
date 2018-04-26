import * as React from 'react';
import Dropdown, {DropdownContent, DropdownTrigger} from 'react-simple-dropdown';
import {NodeConfig} from '../NodeConfig';
import registry from '../modules/registry';
import {TreeManager} from "../managers/TreeManager";

type ToolbarProps = {
  treeManager: TreeManager,
  selectedNode: NodeConfig | null,
};

function nodeAcceptsChildren(node: NodeConfig | null) {
  return (node && registry[node.module] && registry[node.module].acceptsChildren);
}

export default class TreeToolbar extends React.Component<ToolbarProps, any> {
  private dropdowns: { [key: string]: Dropdown } = {};

  private handleAddNode(method: 'wrap' | 'child' | 'sibling', module: string) {
    const {treeManager, selectedNode} = this.props;
    switch (method) {
      case 'child':
        treeManager.addChildNode((selectedNode ? selectedNode.id : null), module);
        break;
      case 'sibling':
        treeManager.addSiblingNode(selectedNode!.id, module);
        break;
      case 'wrap':
        treeManager.wrapNode(selectedNode!.id, module);
    }
    this.hideDropdowns();
  }

  private handleDeleteNode(withHierarchy: boolean) {
    const {treeManager, selectedNode} = this.props;
    treeManager.deleteNode(selectedNode!.id, withHierarchy);
  }

  hideDropdowns() {
    Object.values(this.dropdowns).forEach((dropdown) => {
      return dropdown.hide();
    });
  }

  render() {
    const {selectedNode} = this.props;
    let childMode: string | null = null, childText: string = 'Node';
    let allowAddSibling = false;
    if (selectedNode === null) {
      childMode = 'child';
      childText = 'Node';
    }
    if (nodeAcceptsChildren(selectedNode)) {
      childMode = 'child';
      childText = 'Child';
    }
    if (selectedNode) {
      const parent = this.props.treeManager.getNodeParentOrNull(selectedNode.id);
      if(parent === null || nodeAcceptsChildren(parent)) {
        allowAddSibling = true;
      }
    }
    return (
      <div id="tree-toolbar" className="toolbar">
        <Dropdown
          disabled={!selectedNode}
          ref={(instance) => {
            this.dropdowns.wrap = instance;
          }}
        >
          <DropdownTrigger className="btn">Wrap...</DropdownTrigger>
          <DropdownContent className="node-select">
            {Object.keys(registry).filter((module) => registry[module].acceptsChildren).map((module) => (
              <a href="#" key={module} onClick={() => this.handleAddNode('wrap', module)}>{module}</a>
            ))}
          </DropdownContent>
        </Dropdown>
        <Dropdown
          disabled={!childMode}
          ref={(instance) => {
            this.dropdowns.addChild = instance;
          }}
        >
          <DropdownTrigger className="btn">Add {childText}...</DropdownTrigger>
          <DropdownContent className="node-select">
            {Object.keys(registry).map((module) => (
              <a href="#" key={module} onClick={() => this.handleAddNode('child', module)}>{module}</a>
            ))}
          </DropdownContent>
        </Dropdown>
        <Dropdown
          disabled={!allowAddSibling}
          ref={(instance) => {
            this.dropdowns.addSibling = instance;
          }}
        >
          <DropdownTrigger className="btn">Add Sibling...</DropdownTrigger>
          <DropdownContent className="node-select">
            {Object.keys(registry).map((module) => (
              <a href="#" key={module} onClick={() => this.handleAddNode('sibling', module)}>{module}</a>
            ))}
          </DropdownContent>
        </Dropdown>
        <div
          className={'btn ' + (selectedNode ? '' : 'disabled')}
          title="Shift-click to delete with hierarchy"
          onClick={(event) => {
            this.handleDeleteNode(event.shiftKey);
            event.preventDefault();
          }}
        >
          Delete
        </div>
      </div>
    );
  }

}
