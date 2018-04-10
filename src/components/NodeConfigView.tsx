import * as React from 'react';
import {NodeConfig} from "../NodeConfig";
import registry from "../modules/registry";
import Module from "../modules/Module";
import VariableDefinition from "../modules/VariableDefinition";
import Status from "../Status";
import {groupBy} from 'lodash';
import {ChangeNodeConfigHandler} from "../types";


type NodeConfigViewProps = {
  nodeConfig: NodeConfig,
  onChange: ChangeNodeConfigHandler,
  status: Status,
};

type VariableConfigRowProps = {
  variable: VariableDefinition,
  nodeConfig: NodeConfig,
  onChange: ChangeNodeConfigHandler,
  status: Status,
};

const VariableConfigRow = function ({variable, nodeConfig, onChange, status}: VariableConfigRowProps) {
  return (
    <tr className="variable-config-row">
      <th>
        {variable.name}
      </th>
      <td>
        <input
          type="text"
          value={nodeConfig.config[variable.name] || ''}
          onChange={(event) => onChange(
            nodeConfig,
            variable.name,
            event.currentTarget.value.toString(),
          )}
        />
      </td>
    </tr>
  );
};

export default class NodeConfigView extends React.Component<NodeConfigViewProps, any> {
  render() {
    const {nodeConfig, status} = this.props;
    const moduleClass: Module = registry[nodeConfig.module];
    const variablesByGroup = groupBy(moduleClass.variables, (v) => (v.group || 'Other'));

    return (
      <div>
        <h2>
          {nodeConfig.module}
        </h2>
        Variables last render: {status.getVariablesForNode(nodeConfig.id).join(', ')}
        <table>
          <tbody>
            {Object.keys(variablesByGroup).sort().map((group) => <React.Fragment key={group}>
                <tr key={`#${group}`} className="group-separator">
                  <th colSpan={2}>{group}</th>
                </tr>
                {variablesByGroup[group].map((variable: VariableDefinition) => (
                  <VariableConfigRow
                    key={variable.name}
                    variable={variable}
                    nodeConfig={nodeConfig}
                    status={status}
                    onChange={this.props.onChange}
                  />
                ))}
              </React.Fragment>
            )}
          </tbody>
        </table>
        <ul className="errors">
          {status.getErrorsForNode(nodeConfig.id).map((err, i) => <li key={i}>{err}</li>)}
        </ul>
      </div>
    );
  }
};
