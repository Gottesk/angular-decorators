export function Debounce(milliseconds: number): MethodDecorator {
    return function (target: Function, propertyKey: string, descriptor: PropertyDescriptor) {
        const map = new WeakMap();
        const originalMethod = descriptor.value;
        descriptor.value = function (...params) {
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

