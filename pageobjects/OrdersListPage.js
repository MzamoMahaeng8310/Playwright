class OrdersListPage {
    // constructor(page) {

    //     this.page = page;
    //     this.waitForPageElemnt = page.locator("tbody");
    //     this.rowCountElements = page.locator("tbody tr");
    //     this.orderDetailsElement = page.locator(".col-text");
    //     //  this.rows = rows;

    // }

    // async FindAndVerifyOrder() {

    //     await this.waitForPageElemnt.waitFor();
    //     await this.page.pause();
    //    // const rows = await this.rowCountElements;
    //     for (let i = 0; i < await this.rowCountElements.count(); ++i) {

    //         const rowOrderId = await this.rowCountElements.nth(i).locator("th").textContent();
    //         if (orderId.includes(rowOrderId)) {

    //             //now we click on view 
    //             await this.rowCountElements.nth(i).locator("button").first().click(); // onlt the first 
    //             break;
    //         }
    //     }


    // await this.page.pause();
    // const orderIdDetails = this.orderDetailsElement.allTextContents();
    // expect(orderId.includes(orderIdDetails)).toBeTruthy();
    // }

    // async FindAndVerifyOrder() {
    //     await this.page.pause();
    //     await this.waitForPageElemnt.waitFor();

    //     const rowCount = await this.page.$$('tbody tr').count();
    //     for (let i = 0; i < rowCount; i++) {
    //         const rowOrderId = await this.page.$$('tbody tr').nth(i).$('th').textContent();
    //         if (orderId.includes(rowOrderId)) {
    //             await this.page.$$('tbody tr').nth(i).$('button').first().click();
    //             break;
    //         }
    //     }
    //     await this.page.pause();
    //     const orderIdDetails = await this.orderDetailsElement.allTextContents();
    //     expect(orderId.includes(orderIdDetails)).toBeTruthy();
    // }

    constructor(page) {
        this.page = page;
        this.ordersTable = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.orderdIdDetails = page.locator(".col-text");
    }
    async FindAndVerifyOrder() {

        await this.ordersTable.waitFor();
        for (let i = 0; i < await this.rows.count(); ++i) {
            const rowOrderId = await this.rows.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId)) {
                await this.rows.nth(i).locator("button").first().click();
                break;
            }
        }

    }

}

export default OrdersListPage