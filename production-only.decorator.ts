export function ProductionOnly(environment: { production?: boolean }): MethodDecorator {
    return function (target: Function, key: string, descriptor: any) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
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
