import * as React from 'react';
import {NodeConfig} from '../types';
import registry from '../modules/registry';
import Module, {UniversalVariables} from '../modules/Module';
import VariableDefinition from '../modules/VariableDefinition';
import Status from '../universe/Status';
import {groupBy} from 'lodash';
import {ChangeNodeConfigHandler} from '../types';

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

const VariableConfigRow = ({variable, nodeConfig, onChange, status}: VariableConfigRowProps) => {
  let extraControls: React.ReactElement<any> | null = null;
  let input: React.ReactElement<any> | null = null;

  const handleChange = ((event) => onChange(
    nodeConfig,
    variable.name,
    event.target.value.toString(),
  ));
  if (variable.choices) {
    input = (
      <select
        value={nodeConfig.config[variable.name] || ''}
        onChange={handleChange}
      >
        {variable.choices.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
    );
  } else {
    input = (
      <input
        type="text"
        value={nodeConfig.config[variable.name] || ''}
        onChange={handleChange}
      />
    );
  }
  if (variable.type === 'color') {
    extraControls = (
      <input type="color" value={nodeConfig.config[variable.name] || ''} onChange={handleChange} />
    );
  }

  return (
    <tr className="variable-config-row">
      <th>
        {variable.name}
      </th>
      <td>
        {input}
      </td>
      <td>
        {extraControls}
      </td>
    </tr>
  );
};

export default class NodeConfigView extends React.Component<NodeConfigViewProps, any> {
  render() {
    const {nodeConfig, status} = this.props;
    const moduleClass: Module = registry[nodeConfig.module];

    if (!moduleClass) {
      return (
        <div>
          The module {nodeConfig.module} is not available.
          <textarea>{JSON.stringify(nodeConfig, null, 2)}</textarea>
        </div>
      );
    }

    const variableDefinitions = moduleClass.variables.concat(UniversalVariables);
    const variablesByGroup = groupBy(variableDefinitions, (v) => (v.group || 'Other'));

    return (
      <div>
        <table>
          <tbody>
            {Object.keys(variablesByGroup).sort().map((group) => <React.Fragment key={group}>
                <tr key={`#${group}`} className="group-separator">
                  <th colSpan={3}>{group}</th>
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
              </React.Fragment>,
            )}
          </tbody>
        </table>
        <div className="debug">
          Variables last render: {status.getVariablesForNode(nodeConfig.id).join(', ')}
        </div>
        <ul className="errors">
          {status.getErrorsForNode(nodeConfig.id).map((err, i) => <li key={i}>{err}</li>)}
        </ul>
      </div>
    );
  }
}
