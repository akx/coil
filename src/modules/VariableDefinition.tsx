export default interface VariableDefinition {
  name: string;
  description?: string;
  default?: string;
  type?: 'number' | 'string' | 'color';
  group?: string;
}
