export function checkAllRequiredVars() {
    const requiredVars = [
        'NODE_ENV',
        'PORT',
        'DB_CONN_STRING',
        'JWT_SECRET',
        'HOST'
    ];
    requiredVars.forEach((varName) => {
        getConfigValue(varName);
    })
}

export function getConfigValue(fieldName: string): string {
    const value = process.env[fieldName];
    if (value === undefined) {
        throw new Error(fieldName + " is not set in .env file!");
    }
    return value;
}
