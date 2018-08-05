import * as React from 'react';
import {VariableType} from '../types';

interface VariableConfigRowProps {
  name: string;
  type: VariableType;
  choices?: string[];
  value: any;
  onChange: (value: string) => void;
}

const GenericVariableConfigRow = ({name, choices, type, onChange, value}: VariableConfigRowProps) => {
  let extraControls: React.ReactElement<any> | null = null;
  let input: React.ReactElement<any> | null = null;
  value = (value === undefined ? '' : value);

  const handleChange = (event) => onChange(event.target.value.toString());

  if (choices) {
    input = (
      <select
        value={value}
        onChange={handleChange}
      >
        {choices.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
    );
  } else {
    input = (
      <input
        type="text"
        value={value}
        onChange={handleChange}
      />
    );
  }
  if (type === 'color') {
    extraControls = (
      <input type="color" value={value} onChange={handleChange} />
    );
  }

  return (
    <tr className="variable-config-row">
      <th>
        {name}
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

export default GenericVariableConfigRow;
