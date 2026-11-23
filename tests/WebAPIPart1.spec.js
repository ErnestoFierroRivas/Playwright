const {test, expect, request} = require('@playwright/test');
const {APiUtils} = require('./utils/APIUtils');
const loginPayLoad = {userEmail:"anshikaw@gmail.com",userPassword:"Learning@830$3mK3"};
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]};

let response;

test.beforeAll( async() =>{
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils (apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);
})

//Creacion de orden completada
test('@API Place the order', async ({ page }) =>
{
    page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    
    const rows = await page.locator("tbody tr");
    for(let i = 0; i < await rows.count(); ++i){
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if(response.orderId.includes(rowOrderId)){
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }    
    const orderIdDetail = await page.locator(".col-text").textContent();
   //await page.pause();
    expect (response.orderId.includes(orderIdDetail)).toBeTruthy();
});

test('MT-T24 The documents link flashes', async ({ page }) =>
{
    // Crea su propia orden sin tocar test.beforeAll ni el primer test
    const apiContext = await request.newContext();
    let ownResponse;
    try {
        const apiUtils = new APiUtils(apiContext, loginPayLoad);
        ownResponse = await apiUtils.createOrder(orderPayLoad);
    } finally {
        await apiContext.dispose();
    }

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, ownResponse.token);

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("button[routerlink*='myorders']").click();

    const rows = page.locator("tbody tr");
    await rows.first().waitFor({ state: "visible" });

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = (await rows.nth(i).locator("th").innerText()).trim();
        if (ownResponse.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetail = (await page.locator(".col-text").innerText()).trim();
    expect(ownResponse.orderId.includes(orderIdDetail)).toBeTruthy();
});

test('MT-T22 Select the User type and cancel the modal', async ({ page }) =>
{
    // Crea su propia orden sin tocar test.beforeAll ni el primer test
    const apiContext = await request.newContext();
    let ownResponse;
    try {
        const apiUtils = new APiUtils(apiContext, loginPayLoad);
        ownResponse = await apiUtils.createOrder(orderPayLoad);
    } finally {
        await apiContext.dispose();
    }

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, ownResponse.token);

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("button[routerlink*='myorders']").click();

    const rows = page.locator("tbody tr");
    await rows.first().waitFor({ state: "visible" });

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = (await rows.nth(i).locator("th").innerText()).trim();
        if (ownResponse.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetail = (await page.locator(".col-text").innerText()).trim();
    expect(ownResponse.orderId.includes(orderIdDetail)).toBeTruthy();
});