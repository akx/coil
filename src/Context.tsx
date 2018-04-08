interface VariableMap {
  [key: string]: any;
}

interface ExpressionMap {
  [key: string]: string | null;
}

export default class Context {
  constructor(
    readonly parent: Context | null = null,
    readonly variables: VariableMap = {},
    readonly idPrefix: string = '',
  ) {

  }

  evaluate(expression: string): any {
    if (expression.startsWith('=')) {
      const exprFun = new Function('namespace', `with(namespace) { return ${expression.slice(1)}}`);
      return exprFun(this.variables);
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

  subcontext(newVariables: VariableMap): Context {
    const mergedVariables = Object.assign({}, this.variables, newVariables);
    return new Context(this, mergedVariables);
  }
}
