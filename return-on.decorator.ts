export function ReturnOn<T>(value: T): MethodDecorator {
    return function (target: Function, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            const hasValue = !!(args && args.filter(i => i === value).length);
            if (hasValue) {
                return;
            }
            const result = originalMethod.apply(this, args);
            return result;
        };
        return descriptor;
    };
}
