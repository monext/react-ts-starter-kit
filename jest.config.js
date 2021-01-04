module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: {
        '\\.(png)$': '<rootDir>/src/__mocks__/fileMock.js',
    },
    setupFilesAfterEnv: [
        '@testing-library/jest-dom/extend-expect',
    ],
    testMatch: ['**/*.(test|spec).ts?(x)'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
};
