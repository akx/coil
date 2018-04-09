import * as React from 'react';
import NodeConfig from "../NodeConfig";
import registry from "../modules/registry";
import Module from "../modules/Module";
import VariableDefinition from "../modules/VariableDefinition";

type NodeConfigViewProps = {
  nodeConfig: NodeConfig,
  onChange: Function,
};

export default class NodeConfigView extends React.Component<NodeConfigViewProps, any> {
  onChangeConfig = (variableName, value) => {
    this.props.onChange(this.props.nodeConfig.id, variableName, value);
  };

  render() {
    const {nodeConfig} = this.props;
    const moduleClass: Module = registry[nodeConfig.module];

    return (
      <div>
        <h2>
          {nodeConfig.module}
        </h2>
        <table>
          <tbody>
            {moduleClass.variables.map((variable: VariableDefinition) => (
              <tr key={variable.name}>
                <th>
                  {variable.name}</th>
                <td>
                  <input
                    type="text"
                    value={nodeConfig.config[variable.name]}
                    onChange={(event) => this.onChangeConfig(variable.name, event.currentTarget.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};
