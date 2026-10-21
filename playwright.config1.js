// @ts-check
const {devices} = require('@playwright/test');

const config = {
  testDir: './tests',
  retries: 1,

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
        actionTimeout: 90000,
        navigationTimeout: 90000,
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
        //headless: false,
        //Si se le pone true el programa no funcionara por el tiempo excedido
        //headless: true,
        screenshot:'on',
        //ignoreHttpsErrors:true,
        //permission: ['geolocation'],
        //Toma de video
        //video:'retain-on-failure',
        trace:'on',//off o on

        //Es para abrir la ventana en cierto tamaño,pero si el sitio no es responsive
        //fallara al no encontrar elementos
        ////viewport:{width:720,height:720}

        //Se ejecuta en la pantalla de un celular con los tamaños de
        //este telefono
        //Por el ejercicio que no e sun sitio responsive, fallara la prueba
        ////...devices['Galaxy S24']
      }
    }
  ]
};
module.exports = config;