import * as React from 'react';
import { Document, GVar } from '../types';
import GenericVariableConfigRow from '../components/GenericVariableConfigRow';
import { GVarDeleteHandler, GVarModifyHandler } from '../ui-types';

interface GVarsPanelProps {
  document: Document;
  onAddGvar: () => void;
  onDeleteGvar: GVarDeleteHandler;
  onModifyGvar: GVarModifyHandler;
}

interface GVarPanelProps {
  gvar: GVar;
  onModifyGvar: GVarModifyHandler;
  onDeleteGvar: GVarDeleteHandler;
}

function GVarPanel({ gvar, onModifyGvar, onDeleteGvar }: GVarPanelProps) {
  return (
    <div className="gvar-panel" style={{ display: 'flex' }}>
      <button className="btn standalone" title="Delete gvar" onClick={() => onDeleteGvar(gvar)}>
        &times;
      </button>
      <table className="var-table" style={{ flex: 1 }}>
        <tbody>
          <GenericVariableConfigRow
            name="name"
            type="string"
            value={gvar.name}
            onChange={(value) => onModifyGvar(gvar, 'name', value)}
          />
          <GenericVariableConfigRow
            name="type"
            type="string"
            choices={['number', 'string']}
            value={gvar.type}
            onChange={(value) => onModifyGvar(gvar, 'type', value)}
          />
          <GenericVariableConfigRow
            name="value"
            type="string"
            value={gvar.value}
            onChange={(value) => onModifyGvar(gvar, 'value', value)}
          />
          {gvar.type === 'number' ? (
            <React.Fragment>
              <GenericVariableConfigRow
                name="min"
                type="string"
                value={gvar.min}
                onChange={(value) => onModifyGvar(gvar, 'min', parseFloat(value))}
              />
              <GenericVariableConfigRow
                name="max"
                type="string"
                value={gvar.max}
                onChange={(value) => onModifyGvar(gvar, 'max', parseFloat(value))}
              />
            </React.Fragment>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}

const GVarsPanel: React.SFC<GVarsPanelProps> = (props: GVarsPanelProps) => {
  const { document } = props;
  return (
    <div id="gvars-panel">
      <div id="gvars-toolbar" className="toolbar">
        <div
          className={'btn'}
          onClick={(event) => {
            props.onAddGvar();
            event.preventDefault();
          }}
        >
          Add new gvar
        </div>
      </div>
      {document.gvars && document.gvars.length ? (
        document.gvars.map((gvar, index) => (
          <GVarPanel key={index} gvar={gvar} onModifyGvar={props.onModifyGvar} onDeleteGvar={props.onDeleteGvar} />
        ))
      ) : (
        <i>No gvars specified</i>
      )}
    </div>
  );
};

export default GVarsPanel;
