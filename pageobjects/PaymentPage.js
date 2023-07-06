class PaymentPage {

    constructor(page) {
        this.page = page;
        this.countryType = page.locator("[placeholder*='Country']");
        this.dropdown = page.locator(".ta-results");
        this.placeOrderButton = page.locator(".btnn.action__submit.ng-star-inserted");

    }
    async populateAndPlaceOrder(countryIndicator, selectCountryList) {

        await this.countryType.type(countryIndicator, {
            delay: 100

        });
        await this.dropdown.waitFor();
        const optionsCount = await this.dropdown.locator("button").count();

        for (let i = 0; i < optionsCount; ++i) {

            const text = await this.dropdown.locator("button").nth(i).textContent();
            if (text === selectCountryList) {

                await this.dropdown.locator("button").nth(i).click()
                break;
            }

        }

    }

    async placeTheOrder() {
        await this.page.pause();
        await this.placeOrderButton.click();
    }



}

export default PaymentPage