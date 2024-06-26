import { ExpressionMap, NodeConfig, VariableMap } from '../types';
import { evaluateExpression, NamespaceFn } from '../utils/evaluator';
import { default as createRandomGenerator, RandomGenerator } from '../utils/RandomGenerator';
import { renderNodesInto } from './render';
import Status from './Status';

function _evaluate(
  status: Status,
  node: NodeConfig,
  tag: string,
  expression: string,
  namespace: NamespaceFn,
  errorDefault: any = null,
): any {
  try {
    return evaluateExpression(expression, namespace);
  } catch (err) {
    status.addError(node.id, `${tag}: ${err}`);
    console.warn(err);
    return errorDefault;
  }
}

function memoizeOnFirstInvocation<T>(creator: () => T): () => T {
  let t: T | undefined;
  return () => {
    if (t === undefined) {
      t = creator();
    }
    return t;
  };
}

export default class Context {
  private rng?: RandomGenerator;
  private readonly defaultNamespace: NamespaceFn = this.prepareNamespace();

  constructor(
    readonly status: Status,
    readonly node: NodeConfig,
    readonly parent: Context | null = null,
    readonly variables: VariableMap = {},
    readonly idPrefix: string = '',
  ) {}

  public subcontext(forNode: NodeConfig, newVariables: VariableMap = {}, idPrefix = ''): Context {
    const mergedVariables = Object.assign({}, this.variables, newVariables);
    return new Context(this.status, forNode, this, mergedVariables, `${this.idPrefix}.${idPrefix}`);
  }

  public random(min?: number, max?: number) {
    if (!this.rng) {
      const seed = this.evaluateFromNodeConfig('seed');
      this.rng = createRandomGenerator(seed);
    }
    const val = this.rng();
    if (min !== undefined) {
      if (max === undefined) {
        return val * min;
      }
      return min + val * (max - min);
    }
    return val;
  }

  public prepareNamespace(additionalVariables?: VariableMap): NamespaceFn {
    return memoizeOnFirstInvocation(() => ({
      rand: this.random.bind(this),
      ...this.variables,
      ...additionalVariables,
    }));
  }

  public evaluateFromNodeConfig(key: string): any {
    const expression = this.node.config[key];
    if (expression === undefined) {
      return null;
    }
    return _evaluate(this.status, this.node, key, String(expression), this.defaultNamespace);
  }

  public evaluate(tag: string, expression: string, additionalVariables?: VariableMap): any {
    const namespace = this.prepareNamespace(additionalVariables);
    return _evaluate(this.status, this.node, tag, expression, namespace);
  }

  public evaluateAll(node: NodeConfig, expressionMap: ExpressionMap, additionalVariables?: VariableMap): VariableMap {
    const evaluated = {};
    const namespace = this.prepareNamespace(additionalVariables);
    for (const tag in expressionMap) {
      if (tag in expressionMap) {
        const expression = expressionMap[tag];
        if (expression !== null) {
          evaluated[tag] = _evaluate(this.status, this.node, tag, expression, namespace);
        }
      }
    }
    return evaluated;
  }

  public evaluateNodeConfig(node: NodeConfig = this.node): VariableMap {
    return this.evaluateAll(node, node.config);
  }

  public getId(suffix: string = this.node.id) {
    return this.idPrefix + suffix;
  }

  public renderChildren(context: Context = this) {
    const nodes: Element[] = [];
    renderNodesInto(nodes, this.node.children, context);
    return nodes;
  }
}
