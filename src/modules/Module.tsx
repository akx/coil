import Context from "../Context";
import NodeConfig from "../NodeConfig";


export interface VariableDefinition {
  name: string;
  description?: string;
  default?: string;
  type?: 'number' | 'string' | 'color';
}

export interface IModule {
  acceptsChildren: boolean;
  variables: Array<VariableDefinition>;

}


export default abstract class Module {
  public static acceptsChildren: boolean = false;
  public static variables: Array<VariableDefinition> = [];

  abstract render(context: Context, node: NodeConfig): Array<any>;

  public getVariableDefaults(): object {
    const defaults = {};
    (this.constructor as any as { variables: Array<VariableDefinition> }).variables.forEach((v) => {
      defaults[v.name] = v.default;
    });
    return defaults;
  }
}
