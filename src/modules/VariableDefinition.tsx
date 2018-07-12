// tslint:disable-next-line:interface-name
export default interface VariableDefinition {
  name: string;
  description?: string;
  default?: string;
  type?: 'number' | 'string' | 'color';
  group?: string;
  choices?: string[];
  static?: boolean;
}
