//creating custom fixtures section 11 lecture 54
const base = require('@playwright/test');


exports.customtest = base.test.extend({

testDataForOrder : {
    username: "mzamo.mahaeng@gmail.com",
    password: "Mzamo123",
    productName: "zara coat 3"
    // this is a javascript object so the keys dont needs "" quotes
    // of its JSON then the keys will need "" quotes
}


    }
)