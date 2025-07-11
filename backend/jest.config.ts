// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@models/(.*)$': '<rootDir>/src/models/$1',
        '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
        '^@helper/(.*)$': '<rootDir>/src/helper/$1',
        '^@routes/(.*)$': '<rootDir>/src/routes/$1',
        '^@utils/(.*)$': '<rootDir>/src/utils/$1',
        '^@types/(.*)$': '<rootDir>/src/types/$1',
    },
    testPathIgnorePatterns: ['<rootDir>/dist/']
};

