import {create, RandomSeed} from 'random-seed';
import {isEmpty} from 'lodash';
import Status from "./Status";
import NodeConfig from "./NodeConfig";
import {ExpressionMap, VariableMap} from "./types";

function evaluateExpression(expression: string, namespace: () => VariableMap): any {
  if (expression.startsWith('=')) {
    const exprFun = new Function('namespace', `with(namespace) { return ${expression.slice(1)}}`);
    return exprFun(namespace());
  }
  if (/[+-][0-9.]+/.test(expression)) {
    return parseFloat(expression);
  }
  return `${expression}`;
}

export default class Context {
  private rng?: RandomSeed;

  constructor(
    readonly status: Status,
    readonly parent: Context | null = null,
    readonly variables: VariableMap = {},
    readonly idPrefix: string = '',
    readonly randomSeed?: string,
  ) {
  }

  random() {
    if (!this.rng) {
      this.rng = create(this.randomSeed);
    }
    return this.rng.random();
  }

  evaluate(
    node: NodeConfig,
    tag: string,
    expression: string,
    additionalVariables?: VariableMap,
    errorDefault: any = null,
  ): any {
    try {
      return evaluateExpression(
        expression,
        () => ({rand: this.random.bind(this), ...this.variables, ...additionalVariables}),
      );
    } catch (e) {
      this.status.addError(node.id, `${tag}: ${e}`);
      console.warn(e);
      return errorDefault;
    }
  }

  evaluateAll(node: NodeConfig, expressionMap: ExpressionMap, additionalVariables?: VariableMap): VariableMap {
    const evaluated = {};
    Object.entries(expressionMap).forEach(([key, value]) => {
      if (value !== null) {
        evaluated[key] = this.evaluate(node, key, value, additionalVariables);
      }
    });
    return evaluated;
  }

  evaluateNodeConfig(node: NodeConfig): VariableMap {
    return this.evaluateAll(node, node.config);
  }

  subcontext(newVariables: VariableMap, idPrefix: string = '', randomSeed?: string): Context {
    const mergedVariables = Object.assign({}, this.variables, newVariables);
    return new Context(
      this.status,
      this,
      mergedVariables,
      this.idPrefix + (idPrefix || ''),
      !isEmpty(randomSeed) ? randomSeed : undefined,
    );
  }

  getId(suffix: string = '') {
    return this.idPrefix + suffix;
  }
}
