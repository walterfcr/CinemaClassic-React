// cypress.config.js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173", // adjust if your dev server runs elsewhere
    setupNodeEvents(on, config) {
      // keep this empty unless you really need custom tasks
      return config;
    },
  },
});
