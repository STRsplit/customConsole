const oldConsole = { ...console };

const iterateText = (logValues, globalCondition) => {
    if (Array.isArray(logValues)) {
        return logValues.every(globalCondition)
    }
    return globalCondition(logValues);
}

export default (action, globalCondition) => {
    action = action || 'log';
    console[action] = (...args) => {
        let condition = args[args.length - 1];
        if (args[args.length - 1] === '~true' && args.pop()) {
            oldConsole[action].apply(this, args);
        } else if (args[args.length - 1] === '~false') {
            return;
        } else {
            let passesGlobal = typeof globalCondition === 'undefined';
            if (!passesGlobal) {
                passesGlobal = typeof globalCondition === 'function' ? iterateText(args, globalCondition) : Boolean(globalCondition);
            }
            if (!passesGlobal) {
                return;
            } else {
                if (typeof condition === 'string' || args.length === 1) {
                    oldConsole[action].apply(this, args);
                } else if (typeof condition === 'function' && args.pop()) {
                    iterateText(args, condition) && oldConsole[action].apply(this, args);
                } else {
                    args.pop() && Boolean(condition) && oldConsole[action].apply(this, args);
                }
            }
        }
    }
};
