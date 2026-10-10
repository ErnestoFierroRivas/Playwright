const {test, expect, request} = require('@playwright/test');
const {APiUtils} = require('./utils/APIUtils');
const loginPayLoad = {userEmail:"anshikaw@gmail.com",userPassword:"Learning@830$3mK3"};
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]};

let token;
let orderId;

test.beforeAll( async() =>{
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils (apiContext, loginPayLoad);
    apiUtils.createOrder(orderPayLoad);
});

//Creacion de orden completada
test('API Place the order', async ({ page }) =>
{
    page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    
    const rows = await page.locator("tbody tr");
    for(let i = 0; i < await rows.count(); ++i){
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if(orderId.includes(rowOrderId)){
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }    
    const orderIdDetail = await page.locator(".col-text").textContent();
    await page.pause();
    expect (orderId.includes(orderIdDetail)).toBeTruthy();
});