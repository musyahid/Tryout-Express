const express = require("express"); // import express
const app = express(); // inisialisasi express
const bodyParser = require("body-parser"); // 
const port = 3000;

const middle = require("./src/middlewares/jwt");

const fileUpload = require('express-fileupload')

app.use(fileUpload({
  useTempFiles: true
}))


const routerUser = require('./src/routes/user')
const routerProduct = require('./src/routes/product')
const routerProductIn = require('./src/routes/product_in')
const routerProductOut = require('./src/routes/product_out')
const routerPrintProduct = require('./src/routes/print')
const routeLogin = require('./src/routes/login')

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

app.use('/api/v1/user', middle, routerUser)
app.use('/api/v1/product', routerProduct)
app.use('/api/v1/in', middle, routerProductIn)
app.use('/api/v1/out', middle, routerProductOut)
app.use('/api/v1/print', middle, routerPrintProduct)

app.use('/login', routeLogin)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


