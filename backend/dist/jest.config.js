"use strict";
// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1', // Optional: if you're using path aliases
    },
    testPathIgnorePatterns: ['<rootDir>/dist/']
};
