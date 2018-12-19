const oldConsole = { ...console };

const iterateText = (logValues, globalCondition) => {
    if (Array.isArray(logValues)) {
        return logValues.every(globalCondition);
    }
    return globalCondition(logValues);
}

export default (action, globalCondition) => {
    action = action || 'log';
    console[action] = (...args) => {
        const caller = ((new Error().stack).split("at ")[2]).trim().split(' ')[0];
        let passesGlobal = false;
        if (caller.split('.')[1] && oldConsole[caller.split('.')[1]]) {
            passesGlobal = true;
        }
        if (!passesGlobal && caller !== 'console') {
            passesGlobal = typeof globalCondition === 'undefined';
        }
        if (!passesGlobal) {
            passesGlobal = typeof globalCondition === 'function' ? iterateText(args, globalCondition) : Boolean(globalCondition);
        }
        
        passesGlobal && oldConsole[action].apply(this, args);
    }
    if (!console.original) {
        console.original = { ...oldConsole };
    }
}
