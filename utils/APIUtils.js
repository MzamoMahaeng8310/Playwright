class APIUtils {
    constructor(apiContext, loginPayload) {
      this.apiContext = apiContext;
      this.loginPayload = loginPayload;
    }
  
    async getToken() {
      const loginResponse = await this.apiContext.post(
        "https://rahulshettyacademy.com/api/ecom/auth/login",
        {
          data: this.loginPayload
        }
      );
  
      // expect(loginResponse.ok()).toBeTruthy(); // response of 200
      const loginResponseJSON = await loginResponse.json();
      const token = loginResponseJSON.token;
      console.log(token);
      // now we have the token
      // it needs to be injected into the browser session
      return token;
    }
  
    async createOrder(orderPayload) {
      let response = {}; // this is an empty JavaScript object
      response.token = await this.getToken();
      // This is the API to place orders
      const orderResponse = await this.apiContext.post(
        "https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
          data: orderPayload,
          headers: {
            Authorization: response.token,
            "Content-Type": "application/json"
          }
        }
      );
  
      const orderResponseJSON = await orderResponse.json();
      console.log(orderResponseJSON);
      const orderId = orderResponseJSON.orders[0];
      response.orderId = orderId;
      return response;
    }
  }
  
  export default APIUtils;
  