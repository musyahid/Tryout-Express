const express = require("express"); // import express
const app = express(); // inisialisasi express
const bodyParser = require("body-parser"); // 
const port = 3000;
const report = require("./src/controllers/ReportConttroller")
const middle = require("./src/middlewares/jwt");

app.set('view engine', 'ejs')
const fileUpload = require('express-fileupload')

app.use(fileUpload({
  useTempFiles: true
}))
var cron = require('node-cron');
 
// kirim setiap tanggal 1
cron.schedule('* * * 1 * *', async () => {
  console.log('Sekarang tanggal 1, Membuat laporan...');
  await report.makeReport()
});
// report.makeReport("http://localhost:3000/view/template/report").then(res => console.log(res))
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
app.use('/api/v1/product', middle, routerProduct)
app.use('/api/v1/in', middle, routerProductIn)
app.use('/api/v1/out', middle, routerProductOut)
app.use('/api/v1/print', middle, routerPrintProduct);


app.use('/', routeLogin)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


