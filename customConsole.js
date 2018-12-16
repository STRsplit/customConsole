module.exports = (action, globalCondition) => {
    const oldConsole = { ...console };
    action = action || 'log';
    console[action] = (text, condition) => {
        let passesGlobal = typeof globalCondition === 'undefined';
        if (!passesGlobal) {
            passesGlobal = typeof globalCondition === 'function' ? globalCondition(text) : globalCondition;
        }
        if (!passesGlobal) {
            return;
        } else {
            if (typeof condition === 'undefined') {
                oldConsole[action](text)
            } else if (typeof condition === 'function') {
                condition(text) && oldConsole[action](text);
            } else {
                Boolean(condition) && oldConsole[action](text);
            }
        }
    }
};
