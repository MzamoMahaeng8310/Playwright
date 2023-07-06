const {expect } = require('@playwright/test');

class OrderConfirmationPage
{

constructor(page)
{
    this.thankYouMessage = page.locator(".hero-primary");
    this.orderIdLocator =  page.locator("label[class='ng-star-inserted']");
    this.ordersButton = page.locator("//button[@routerlink='/dashboard/myorders']");

}

 async  verifyOrder(confirmMessage)
{
    await expect(this.thankYouMessage).toHaveText(confirmMessage); 
    const orderId = await this.orderIdLocator.textContent();
    console.log("This is the order id : ", orderId);

}

 async navigateToOrders()
    {
        await this.ordersButton.click();

    }




}

 
export default OrderConfirmationPage