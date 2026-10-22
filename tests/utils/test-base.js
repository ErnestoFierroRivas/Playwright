const base = require('@playwright/test');

exports.customtest = base.test.extend({
    testDataForOrder : {
        username : "anshikaw@yahoo.com",
        password : "Learning@830$3mK3",
        productsName : "ZARA COAT 3"
    }
})