import {test,expect,Locator,Page} from '@playwright/test';

export class CartPage{
    cartProducts: Locator;
    productsText: Locator;
    cart: Locator;
    orders: Locator;
    checkout: Locator;
    page: Page;

    constructor(page: Page){
        this.page = page;
        this.cartProducts = page.locator("div li").first();
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");
        this.checkout = page.locator("text=Checkout");
    }
//    async VerifyProductIsDisplayed(productsName:string){
//        await this.cartProducts.waitFor();
//        const bool = await this.getProductLocator(productsName).isVisible();
//        expect(bool).toBeTruthy();
//    }

    async VerifyProductIsDisplayed(productsName:string){
        // Cambio: esperar carga de red y aumentar timeout a 20s antes de validar el producto
        await this.page.waitForLoadState('networkidle');
        await this.cartProducts.waitFor({ state: 'visible', timeout: 20000 });
        const bool = await this.getProductLocator(productsName).isVisible();
        expect(bool).toBeTruthy();
    }

    async Checkout(){
        await this.checkout.click();
    }

    getProductLocator(productsName:string){
        return this.page.locator("h3:has-text('"+productsName+"')");
    }
}

