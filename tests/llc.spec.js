import {test, expect} from '@playwright/test';
import { timeout } from '../playwright.config';

test('Playwright Special Locator', async ({page}) =>{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", {name: 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    //Tiempo de espera 10segundo (se duplico par verse mejor la afirmacion)
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({ timeout: 10_000 });
     
    await page.getByRole("link",{name : "Shop"}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();

    //locator(css) waitFor()

});

//Prueba fallara a los 30 segundos de espera se suepra
test('Playwright Test Level Time Out', async ({page}) =>{
    //Forma de medir el tiempo de ejecucion de manera individual.
    //Sin tomar el valor que se configuro en las configuraciones
    //de playwright.config.js, se hace en una variable (const).

    //60 Segunos para terminar la prueba, de lo contrario, fallara.
    test.setTimeout(6000);
    const slowExpect = expect.configure({timeout:9000});
    page.setDefaultTimeout(9000);

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");

    await page.getByRole("button", {name: 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    
    //Tiempo de espera 10segundo (se duplico par verse mejor la afirmacion)
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({ timeout: 10_000 });
     
    await page.getByRole("link",{name : "Shop"}).click({timeout:15000});
    await expect(page.locator(".my-4").first()).toHaveText("Shop");

    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();

    //locator(css) waitFor()

});