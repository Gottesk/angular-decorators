export function Deprecated(message: string = ''): MethodDecorator {
    return function (target: Function, key: string, descriptor: any) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            console.warn(`${key} method is deprecated. ${message}`);
            const result = originalMethod.apply(this, args);
            return result;
        };
        return descriptor;
    };
}
