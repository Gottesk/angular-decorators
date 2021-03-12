export function ReturnOn<T>(input: T) {
  return function <K>(
    target: K,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: unknown[]) {
      const hasValue = !!(args && args.filter((i) => i === input).length);
      if (hasValue) {
        return;
      }
      const result = originalMethod.apply(this, args);
      return result;
    };
    return descriptor;
  };
}



// usage example 
class AppComponent {

  constructor() {
    this.foo(undefined, { key: "foo" });
    this.foo([1, 2, 3], undefined);
    this.foo([1, 2, 3], { key: "foo" });
    this.foo(); // ==> No! function should not have optional params! Use unacceptable-values.decorator.ts for such cases
  }

  @ReturnOn(undefined)
  foo(data: number[], bar: { key: string }): void {
    console.log("Array length: " + data.length);
    console.log("Object value: " + bar.key);
  }

  // ==> Array length: 3
  // ==> Object value: foo
}
