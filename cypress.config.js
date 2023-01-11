const { defineConfig } = require("cypress");

module.exports = defineConfig({
  pageLoadTimeout: 600000,
  viewportHeight: 900,
  viewportWidth: 1000,
  video: false,
  screenshotOnRunFailure: true,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/e2e/**/*.js",
    baseUrl: "https://puffy.com/"
  },
  
});
