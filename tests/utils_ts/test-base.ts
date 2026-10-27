import {test as baseTest} from '@playwright/test';
interface testDataForOrder{
    username:string;
    password:string;
    productsName:string;
}

export const customTest = baseTest.extend<{testDataForOrder:testDataForOrder}>({
    testDataForOrder : {
        username : "anshikaw@yahoo.com",
        password : "Learning@830$3mK3",
        productsName : "ZARA COAT 3"
    }
})