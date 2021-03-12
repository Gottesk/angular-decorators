export function Deprecated(message: string = '') {
  return function <T>(target: T, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: unknown[]) {
      console.warn(`${key} method is deprecated. ${message}`);
      const result = originalMethod.apply(this, args);
      return result;
    };
    return descriptor;
  };
}
