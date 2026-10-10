const {test, expect} = require('@playwright/test');

test('@Webst Client App Login', async ({ page }) =>
{
    const email = "anshikaw@yahoo.com";
    const productsName = 'ZARA COAT 3';
    const products = page.locator(".card-body");

    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example").fill(email);
    await page.getByPlaceholder("enter your password").fill("Learning@830$3mK3");
    await page.getByRole('button', {name:"Login"}).click();
    //Se sustituye por la linea de arriba, para tomar referencias desde
    //la etiqueta getByRole
    //await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();

    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
    .getByRole("button", {name:"Add to Cart"}).click();

    await page.getByRole("listitem").getByRole('button', {name:"Cart"}).click();

    await page.locator("div li").first().waitFor();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();

    await page.getByRole("button", {name:"Checkout"}).click();

    await page.getByPlaceholder("Select Cuntry").pressSequentially(ind);

    await page.getByRole("button", {name:"India"}).nth(1).click();
    await page.getByText("PLACE ORDER").click();

    await expect(page.getByText("Thankyou for the order.")).toBeVisible();

});