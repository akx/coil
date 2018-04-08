import * as React from 'react';
import Dropdown, {DropdownTrigger, DropdownContent} from 'react-simple-dropdown';
import NodeConfig from '../NodeConfig';
import registry from '../modules/registry';

type ToolbarProps = { selectedNode: NodeConfig | null };
export default class Toolbar extends React.Component<ToolbarProps, any> {
  render() {
    const {selectedNode} = this.props;
    const acceptsChildren = (selectedNode && registry[selectedNode.module] && registry[selectedNode.module].acceptsChildren);
    return (
      <div id="toolbar">
        <Dropdown disabled={!selectedNode}>
          <DropdownTrigger className="btn">Wrap...</DropdownTrigger>
          <DropdownContent className="node-select">
            {Object.keys(registry).filter((module) => registry[module].acceptsChildren).map((module) => (
              <a href="#">{module}</a>
            ))}
          </DropdownContent>
        </Dropdown>
        <Dropdown disabled={!acceptsChildren}>
          <DropdownTrigger className="btn">Add Child...</DropdownTrigger>
          <DropdownContent className="node-select">
            {Object.keys(registry).map((node) => (
              <a href="#">{node}</a>
            ))}
          </DropdownContent>
        </Dropdown>
      </div>
    );
  }
}
