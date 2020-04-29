import * as React from 'react';
import { GVar } from '../types';
import { GVarValueChangeHandler } from '../ui-types';

interface QuickGVarProps {
  gvar: GVar;
  onChange: GVarValueChangeHandler;
}

interface QuickGVarBarProps {
  gvars: GVar[];
  onChange: GVarValueChangeHandler;
}

const QuickGVar: React.SFC<QuickGVarProps> = ({ gvar, onChange }) => (
  <div className="quick-gvar">
    <span>{gvar.name}</span>
    {gvar.type === 'number' ? (
      <input
        type="range"
        min={gvar.min}
        max={gvar.max}
        step="any"
        value={gvar.value}
        onChange={(e) => onChange(gvar, e.target.valueAsNumber)}
      />
    ) : null}
  </div>
);

const QuickGVarBar: React.SFC<QuickGVarBarProps> = ({ gvars, onChange }) => (
  <div className="quick-gvar-bar">
    {gvars.map((gvar) => (
      <QuickGVar gvar={gvar} key={gvar.name} onChange={onChange} />
    ))}
  </div>
);

export default QuickGVarBar;
