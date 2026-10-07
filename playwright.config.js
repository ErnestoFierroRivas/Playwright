// @ts-check
const {devices} = require('@playwright/test');

const config = {
  testDir: './tests',
  timeout: 80 * 1000,
  //Si en 5 segundos no encuentra la palabra indicada, fallara (expect)
  expect: {
    timeout: 5000
  },
  reporter: 'html',

  use: {
    //Se abre en navegador en Chrome
    browserName: 'chromium',
    //Se abre en navegador en Firefox
    //browserName: 'firefox',
    //Se abre en navegador en Safari
    //browserName: 'webkit',

    //headless es para mostar resultado en el navegador. Si es true no abre el navegador y si es false lo abre.
    headless: false
  },
};
module.exports = config;