export function ReturnOnUnacceptableValues(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const metadataKey = `__unacceptable_${propertyKey}_values`;
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        if (target[metadataKey]) {
            const unacceptableValues = target[metadataKey];
            for (let index = 0; index < args.length; index++) {
                const arg = args[index];
                if (unacceptableValues[index].includes(arg)) {
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
