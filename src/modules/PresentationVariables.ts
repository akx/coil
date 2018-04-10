import VariableDefinition from './VariableDefinition';

const group = 'Presentation';
export default [
  {name: 'fill', default: '#333', group, type: 'color'},
  {name: 'stroke', default: '', group, type: 'color'},
  {name: 'strokeWidth', default: '0', group, type: 'number'},
  {name: 'opacity', default: '1', group},
] as VariableDefinition[];
