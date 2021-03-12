export function PureFunctionMemo<T>(
  target: T,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const map = new WeakMap<
    PropertyDescriptor,
    {
      result: unknown;
      args: unknown[];
    }
  >();
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: unknown[]) {
    let memoizedResult = map.get(this);
    if (
      memoizedResult &&
      memoizedResult.result &&
      argsEqual(args, memoizedResult.args)
    ) {
      return memoizedResult.result;
    }

    const result = originalMethod.apply(this, args);
    map.set(this, {
      result,
      args,
    });
    return result;
  };
  return descriptor;
}

function argsEqual(args1: unknown[], args2: unknown[]): boolean {
  if (args1.length !== args2.length) {
    return false;
  }
  for (let i = 0; i < args1.length; i++) {
    if (args1[i] !== args2[i]) {
      return false;
    }
  }
  return true;
}
