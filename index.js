const oldConsole = { ...console };

const iterateText = (logValues, globalCondition) => {
    if (Array.isArray(logValues)) {
        return logValues.every(globalCondition);
    }
    return globalCondition(logValues);
}

export default (action, globalCondition) => {
    if (!console.original) {
        console.original = { ...oldConsole };
    }
    action = action || 'log';
    
    console[action] = (...args) => {
        let passesGlobal = typeof globalCondition === 'undefined';

        if (!passesGlobal) {
            passesGlobal = typeof globalCondition === 'function' ? iterateText(args, globalCondition) : Boolean(globalCondition);
        }

        if (!passesGlobal) {
            return;
        }
        oldConsole[action].apply(this, args);
    }

};
