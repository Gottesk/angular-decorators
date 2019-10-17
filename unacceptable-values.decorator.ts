export function ReturnOnUnacceptableValues(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const metadataKey = `__unacceptable_${propertyKey}_values`;
  const originalMethod = descriptor.value;
  descriptor.value = function (...args) {
    if (target[metadataKey]) {
      const unacceptableValues = target[metadataKey];
      const argIndexes = Object.keys(target[metadataKey]);
      for (const iterator of argIndexes) {
        if (unacceptableValues[iterator].includes(args[iterator])) {
          return;
        }
      }
    }
    const result = originalMethod.apply(this, args);
    return result;
  };
  return descriptor;
}

export function UnacceptableValue<T>(...values: T[]) {
  return function (target: Object, key: string, index: number) {
    const metadataKey = `__unacceptable_${key}_values`;
    if (!target[metadataKey]) {
      target[metadataKey] = {};
    }
    target[metadataKey][index] = values;
  };
}



// usage example 
class AppComponent {
  title = 'hello';
  title2;

  constructor() {
    this.getTitle(this.title)
    this.getTitle(undefined);
    this.getTitle(this.title2);
    this.getTitle();
  }

  @ReturnOnUnacceptableValues
  getTitle(@UnacceptableValue(undefined, null, '') title?: string): string {
    console.log('Function output: ' + title);
    return title;
  }
  // ==> Function output: hello
  // in other cases getTitle will return undefined
}
