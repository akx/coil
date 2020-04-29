/* eslint-disable no-new-func */
import { VariableMap } from '../types';

export type NamespaceFn = () => VariableMap;

const expressionFnCache = {};

export function evaluateExpression(expression: string, namespace: NamespaceFn): any {
  if (expression.startsWith('=')) {
    const exprFun =
      expression in expressionFnCache
        ? expressionFnCache[expression]
        : (expressionFnCache[expression] = new Function(
            'namespace',
            `with(namespace) { return ${expression.slice(1)}}`,
          ));
    return exprFun(namespace());
  }
  if (/[+-][0-9.]+/.test(expression)) {
    return parseFloat(expression);
  }
  return `${expression}`;
}
