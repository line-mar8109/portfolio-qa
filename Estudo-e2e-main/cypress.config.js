const { defineConfig } = require("cypress");

module.exports = defineConfig({
  "chromeWebSecurity":true,
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: "https://automationexercise.com",
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    defaultCommandTimeout: 30000
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
