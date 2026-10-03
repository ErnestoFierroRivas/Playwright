const {test, expect} = require('@playwright/test');

test('Browser Contex Playwright test', async ({ page }) =>
{
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("anshikaw@yahoo.com");
    await page.locator("#userPassword").fill("Learning@830$3mK3");
    await page.locator("[value='Login']").click();
    //await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();

    const titles = await page.locator(".card-body b").allTextContents();
    
    console.log(titles);
});