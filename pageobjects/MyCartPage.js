class MyCartPage {
  constructor(page) {
    this.page = page;
    this.waitForElememt = page.locator("div li");
    this.productVisible = page.locator("h3:has-text('zara coat 3')");
    this.checkoutButton = page.locator("text=Checkout");

  }

  async validateAndCheckoutOrder() {

    await this.waitForElememt.first().waitFor();
    await this.page.pause();
    const bool = await this.productVisible.isVisible();
    //expect(bool).toBeTruthy();
    await this.checkoutButton.click();

  }



}

export default MyCartPage