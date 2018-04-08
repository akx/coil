import {create, RandomSeed} from 'random-seed';
import {isEmpty} from 'lodash';

interface VariableMap {
  [key: string]: any;
}

interface ExpressionMap {
  [key: string]: string | null;
}

export default class Context {
  private rng?: RandomSeed;

  constructor(
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

  evaluate(expression: string, additionalVariables?: VariableMap): any {
    if (expression.startsWith('=')) {
      const exprFun = new Function('namespace', `with(namespace) { return ${expression.slice(1)}}`);
      return exprFun({rand: this.random.bind(this), ...this.variables, ...additionalVariables});
    }
    if (/[+-][0-9.]+/.test(expression)) {
      return parseFloat(expression);
    }
    return `${expression}`;
  }

  evaluateAll(expressionMap: ExpressionMap): VariableMap {
    const evaluated = {};
    Object.entries(expressionMap).forEach(([key, value]) => {
      if (value !== null) {
        evaluated[key] = this.evaluate(value);
      }
    });
    return evaluated;
  }

  subcontext(newVariables: VariableMap, idPrefix: string = '', randomSeed?: string): Context {
    const mergedVariables = Object.assign({}, this.variables, newVariables);
    return new Context(
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
