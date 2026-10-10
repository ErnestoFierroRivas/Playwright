class APIUtils{
    constructor(apiContext, loginPayLoad){
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    async getToken(){
        const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:loginPayLoad
        })
        const loginResponseJson = await loginResponse.json();
        token = loginResponseJson.token;
        console.log(token);
        return token;
    }
    async createOrder(orderPayLoad){
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayLoad,
            headers:{
                        'Authorization':this.getToken(),
                        'Content-Type': 'application/json'
                    },
        })
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        orderId = orderResponseJson.orders[0];
        response.orderId = orderId;
        return orderId;
    }
}

module.exports = {APIUtils};