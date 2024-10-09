module.exports = {  
    preset: 'ts-jest',  
    testEnvironment: 'node',  
    transform: {  
      '^.+\\.tsx?$': 'ts-jest'  
    },  
    moduleFileExtensions: ['ts', 'tsx', 'js'],  
    testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts']  
  };