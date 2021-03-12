export function ProductionOnly(environment: { production?: boolean }) {
  return function <T>(target: T, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: unknown[]) {
      if (environment && environment.production) {
        const result = originalMethod.apply(this, args);
        return result;
      }
      console.error(`Trying to access production only "${key}" method.`);
      return;
    };
    return descriptor;
  };
}
