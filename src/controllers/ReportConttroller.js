const axios = require("axios").default;
const mustache = require('mustache');
const nodemailer = require('nodemailer')
require('dotenv').config()
const { Products, Users, Product_in, Product_out } = require("../models");
let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");


class ReportController {
  static async makeReport(url, data) {
    console.log(url,data);

    //Get data Product In
    const prductsIn = await Product_in.findAll({})
    //Get data Product Out
    const prductsOut = await Product_out.findAll({})

    // data disini dapet dari parameter 2 di app.js tadi
    
    axios
      .post(url, data)
      .then(function (res) {
          // res.data disini sudah berupa text html, karena return dari posts nya adalah html
          // setelah itu tinggal print pdf nya karena sudah dapat html nya
        // menjalankan puppetear
        (async function () {
         
          //render file ejs in views/report-template.ejs dan mengirimkan data product in dan product out
          ejs.renderFile(path.join(__dirname, '../../views/', "report-template.ejs"), {prductsIn: prductsIn, prductsOut:prductsOut}, (err, data) => {
            if (err) {
                  console.log(err);
            } else {
                let options = {
                    "height": "11.25in",
                    "width": "8.5in",
                    "header": {
                        "height": "20mm"
                    },
                    "footer": {
                        "height": "20mm",
                    },
                };
                const id = `report-${new Date().toISOString().split(":").join("-")}`; // nama file berdasar tanggal
                //Generate file pdf
                pdf.create(data, options).toFile(`reports/${id}.pdf`, async function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                      const htm = await ejs.renderFile(path.join(__dirname, "../../views/email-html.ejs"))
                      
                      //Konfigurasi nodemailer
                      console.log(process.env.EMAIL)
                      let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                          user: process.env.EMAIL,
                          pass: process.env.PASSWORD
                        }
                      })


                      let mailOptions = {
                        from: process.env.EMAIL,
                        to: 'dimarhanung@gmail.com',
                        subject: 'LAPORAN BULANAN',
                        template: 'main',
                        html: mustache.render(htm),
                        attachments: [{
                          filename: `${id}.pdf`, 
                          path: path.join(__dirname, '../../reports', `${id}.pdf`),
                          contentType: 'application/pdf'
                        }]
                      }
            
                      transporter.sendMail(mailOptions, function(err, data) {
                        if(err) {
                          console.log("error", err)
                        }else {
                          console.log('email sent')
                        }
                      });
                        console.log("File created successfully");
                    }
                });
            }
        });

        })();
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }
}

module.exports = ReportController;
