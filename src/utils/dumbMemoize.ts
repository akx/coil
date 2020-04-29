export default function dumbMemoize<T>(fn: (...args) => T): (...args) => T {
  const memo: { [args: string]: T } = {};
  const memoizedFn = (...args) => {
    const argsStr = args.join('\x01');
    if (argsStr in memo) {
      return memo[argsStr];
    }
    return (memo[argsStr] = fn(...args));
  };
  (memoizedFn as any).memo = memo;
  return memoizedFn;
}
