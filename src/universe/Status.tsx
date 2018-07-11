import {VariableMap} from '../types';

export default class Status {
  private nodeErrors: { [key: string]: string[] } = {};
  private nodeVariables: { [key: string]: VariableMap[] } = {};

  public addError(nodeId: string, error: string) {
    if (!(nodeId in this.nodeErrors)) {
      this.nodeErrors[nodeId] = [];
    }
    this.nodeErrors[nodeId].push(error);
  }

  public getErrorsForNode(nodeId: string): ReadonlyArray<string> {
    return (nodeId in this.nodeErrors ? this.nodeErrors[nodeId] : []);
  }

  public addVariables(nodeId: string, variables: VariableMap) {
    if (!(nodeId in this.nodeVariables)) {
      this.nodeVariables[nodeId] = [];
    }
    this.nodeVariables[nodeId].push(Object.assign({}, variables));
  }

  public getVariablesForNode(nodeId: string): string[] {
    if (!(nodeId in this.nodeVariables)) {
      return [];
    }
    const variables = new Set();
    this.nodeVariables[nodeId].forEach((map) => {
      Object.keys(map).forEach((key) => {
        return variables.add(key);
      });
    });
    return Array.from(variables).sort();
  }

}
