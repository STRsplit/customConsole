const oldConsole = { ...console };

const iterateText = (logValues, globalCondition) => {
    if (Array.isArray(logValues)) {
        return logValues.every(globalCondition);
    }
    return globalCondition(logValues);
}

const hasMethod = new Map();

export default (action, globalCondition) => {
    action = action || 'log';

    const globalFunction = typeof globalCondition === 'function';

    if (hasMethod.has(action) && globalCondition !== false) {
        if (globalFunction) {
            hasMethod.set(action, 'true');
        } else {
            hasMethod.delete(action);
        }
    } else {
        hasMethod.set(action, 'true');
    }
    
    console[action] = (...args) => {
        let passesGlobal = !hasMethod.has(action);
        if (!passesGlobal) {
            const caller = ((new Error().stack).split("at ")[2]).trim().split(' ')[0];
            const selfCalled = caller.split('.')[1] && oldConsole[caller.split('.')[1]];
            passesGlobal = Boolean(selfCalled);

            if (!passesGlobal && !globalFunction && caller !== 'console') {
                passesGlobal = typeof globalCondition === 'undefined';
            }
            if (!passesGlobal) {
                passesGlobal = globalFunction ? iterateText(args, globalCondition) : Boolean(globalCondition);
            }
        }
        passesGlobal && oldConsole[action].apply(this, args);
    }
    if (!console.original) {
        console.original = { ...oldConsole };
    }
}

