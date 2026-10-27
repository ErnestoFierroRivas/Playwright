import {test, expect} from '@playwright/test';
import {customTest} from './utils_ts/test-base';
import {POManager} from '../pageobjects_ts/POManager';
const dataset = JSON.parse(JSON.stringify(require("./util/placeorderTestData.json")));

for(const data of dataset){
    test(`@Webs Client App Login for ${data.productsName}`, async ({ page }) =>{
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
        let orderId:any;
        orderId = await ordersReviewPage.SubmitAndGetOrderId();
        console.log(orderId);
        await dashboardPage.navigateToOrders();
        const ordersHistoryPage = poManager.getOrdersHistoryPage();
        await ordersHistoryPage.searchOrderAndSelect(orderId);
        expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
    });
}

customTest('Client App Login-2', async ({ page,testDataForOrder }) =>{
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