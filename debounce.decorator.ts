/**
 * Delays and runs the original method in given milliseconds.
 *
 * Could be useful for the keyup events to delay execution until the user has stopped typing for a predetermined amount of time.
 */
export function Debounce(milliseconds: number = 200) {
  return function <T>(
    target: T,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const map = new WeakMap();
    const originalMethod = descriptor.value;
    descriptor.value = function (...params: unknown[]) {
      let debounced = map.get(this);
      if (debounced) {
        clearTimeout(debounced);
      }
      debounced = setTimeout(() => {
        originalMethod.apply(this, params);
        map.delete(this);
      }, milliseconds);
      map.set(this, debounced);
    };
    return descriptor;
  };
}



// usage example 
export class AppComponent {

  constructor() {
    this.foo()
  }

  @Debounce(1000)
  foo() {
    console.log("Fired after 1 second");
  }

  // ==> "Fired after 1 second"
}

