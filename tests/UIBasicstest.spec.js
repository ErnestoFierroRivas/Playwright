const {test, expect} = require('@playwright/test');

test('Browser Contex Playwright test', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    const singIn = page.locator("#signInBtn");
    const cardTitle = page.locator(".card-body a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    await userName.fill("rahulshetty");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await singIn.click();
    //cuando no se encuentre se usara el locator block
    console.log(await page.locator("[style*='block']").textContent('Incorrect'));

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await singIn.click();

    console.log(await cardTitle.first().textContent());
    console.log(await cardTitle.nth(1).textContent());

    const allTitle = await cardTitle.allTextContents();

    console.log(allTitle);
});

test.only('UI Controls', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const singIn = page.locator("#signInBtn");
    const dropdown = page.locator("select.form-control");
    const documentLink = page.locator("[href*='documents-request']");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect (await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class","blinkingText");
    
    //ASSERTION
    //await page.pause();
});