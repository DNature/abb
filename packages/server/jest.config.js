const { defaults } = require("jest-config");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  globalSetup: "<rootDir>/src/testUtils/callSetup.js",
  globals: {
    "ts-jest": {
      diagnostics: false
    }
  }
};
