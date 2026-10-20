const {test, expect} = require('@playwright/test');
const {POManager} = require('../pageobjects/POManager');

test('@Webst Client App Login', async ({ page }) =>{
    const poManager = new POManager(page);
    const username = "anshikaw@yahoo.com";
    const password = "Learning@830$3mK3"
    const productsName = 'ZARA COAT 3';   
    const products = page.locator(".card-body");
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(productsName);
    await dashboardPage.navigateToCart();
    const cartPage = poManager.poManager.getCartPage();
    await cartPage.VeryfyProductIsDisplayed(productsName);
    await cartPage.Checkout();
    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.OrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});