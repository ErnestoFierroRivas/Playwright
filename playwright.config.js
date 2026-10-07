// @ts-check
const {devices} = require('@playwright/test');
const { trace } = require('node:console');

const config = {
  testDir: './tests',
  testMach: '**/*.spec.js',
  retries: 0,

  //Tiempo maximo de ejecucion de las pruebas
  //Tienpo predeterminado de las pruebas
  timeout: 30 * 1000,

  expect:{
    timeout: 5000
  },

  //timeout: 80 * 1000,
  //Si en 5 segundos no encuentra la palabra indicada, fallara (expect)
  //expect: {
  //  timeout: 5000
  //},
  reporter: 'html',

  use: {
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
    //Se abre en navegador en Chrome
    browserName: 'chromium',
    //Se abre en navegador en Firefox
    //browserName: 'firefox',
    //Se abre en navegador en Safari
    //browserName: 'webkit',

    //headless es para mostar resultado en el navegador. Si es true no abre el navegador y si es false lo abre.
    headless: false,
    screenshot:'on',
    trace:'on',//off o on
  },
};
module.exports = config;