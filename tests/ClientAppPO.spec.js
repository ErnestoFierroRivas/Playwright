const {test, expect} = require('@playwright/test');
const {customtest} = require("./utils/test-base");
const {POManager} = require('../pageobjects/POManager');
const dataset = JSON.parse(JSON.stringify(require("./utils/placeorderTestData.json")));

for(const data of dataset){
    test(`Client App Login for ${data.productsName}`, async ({ page }) =>{
        const poManager = new POManager(page);

        const products = page.locator(".card-body");
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(data.username, data.password);

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(data.productsName);
        await dashboardPage.navigateToCart();
        const cartPage = poManager.getCartPage();
        await cartPage.VerifyProductIsDisplayed(data.productsName);
        await cartPage.Checkout();

        const ordersReviewPage = poManager.getOrdersReviewPage();
        await ordersReviewPage.searchCountryAndSelect("ind","India");
        const orderId = await ordersReviewPage.SubmitAndGetOrderId();
        console.log(orderId);
        await dashboardPage.navigateToOrders();
        const ordersHistoryPage = poManager.getOrdersHistoryPage();
        await ordersHistoryPage.searchOrderAndSelect(orderId);
        expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
    });
}

customtest.only('Client App Login-2', async ({ page,testDataForOrder }) =>{
    const poManager = new POManager(page);
    const products = page.locator(".card-body");
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(testDataForOrder.productsName);
    await dashboardPage.navigateToCart();
    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(testDataForOrder.productsName);
    await cartPage.Checkout();
});