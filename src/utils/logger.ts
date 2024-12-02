let debugMode = true;

function debugLog(...args: Array<any>) {
    if (debugMode) {
        console.log(...args);
    }
}

function setDebug(isDebugging: boolean) {
    debugMode = isDebugging;
}

export {debugLog, setDebug};
