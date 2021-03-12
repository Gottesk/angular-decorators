export function TryCatch(errorMessage: string = '') {
  return function <T>(target: T, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: unknown[]) {
      try {
        const result = originalMethod.apply(this, args);
        return result;
      } catch (error) {
        if (errorMessage) {
          console.error(errorMessage);
        }
        console.error(
          `A problem happened in ${key} method. The error is ${error}`
        );
      }
    };
    return descriptor;
  };
}
