const {test, expect, request} = require('@playwright/test');
const {APiUtils} = require('./utils/APIUtils');
const loginPayLoad = {userEmail:"anshikaw@gmail.com",userPassword:"Learning@830$3mK3"};
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
const fakePayLoadOrders = {data: [],message:"No Orders"};

let response;

test.beforeAll( async() =>{
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils (apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);
})

//Creacion de orden completada
test('Place the order', async ({ page }) =>
{
    page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6aceb9d693b084c41f4899d7",
        async route=>{
            //interceptar respuesta
            const response = await page.request.fetch(route.request());
            let body = fakePayLoadOrders;
            route.fulfill({
                response,
                body,
            })
        }
    );
    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    console.log(await page.locator(".mt-4").textContent());
});