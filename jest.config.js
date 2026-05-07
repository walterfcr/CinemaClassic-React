export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
};

