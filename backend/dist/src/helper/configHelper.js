"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfigValue = getConfigValue;
function getConfigValue(fieldName) {
    const value = process.env[fieldName];
    if (value === undefined) {
        throw new Error(fieldName + " is not set in .env file!");
    }
    return value;
}
