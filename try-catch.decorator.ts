export function TryCatch(errorMessage: string): MethodDecorator {
    return function (target: Function, key: string, descriptor: any) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            try {
                const result = originalMethod.apply(this, args);
                return result;
            } catch (error) {
                if (errorMessage) {
                    console.error(errorMessage);
                }
                console.error(`A problem happened in ${key} method. The error is ${error}`);
            }
        };
        return descriptor;
    };
}
