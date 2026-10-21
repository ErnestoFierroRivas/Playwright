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

  reporter: 'html',

  projects: [
    {
      name: 'Firefox',
      use: {
        actionTimeout: 10 * 1000,
        navigationTimeout: 30 * 1000,
        //Se abre en navegador en Firefox
        browserName: 'firefox',
        //headless es para mostar resultado en el navegador. Si es true no abre el navegador y si es false lo abre.
        headless: !!process.env.CI,
        //Si se le pone true el programa no funcionara por el tiempo excedido
        //headless: true,
        screenshot:'on',
        trace:'on',//off o on
      }
    },

    {
      name: 'Chrome',
      use: {
        actionTimeout: 10 * 1000,
        navigationTimeout: 30 * 1000,
        //Se abre en navegador en Chrome
        browserName: 'chromium',
        //headless es para mostar resultado en el navegador. Si es true no abre el navegador y si es false lo abre.
        headless: !!process.env.CI,
        //Si se le pone true el programa no funcionara por el tiempo excedido
        //headless: true,
        screenshot:'on',
        trace:'on',//off o on
      }
    }
  ]
};
module.exports = config;