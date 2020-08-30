// const { sendMail } = require("./cron");
const { Products, Users, Product_in, Product_out } = require("../models");
let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");


const response = {
    status: true,
    message: "",
    data:[]
}


class PrintController {

  static async printProductIn(req, res) {
    
    const {id} = req.params;
    try {
        const prducts = await Product_in.findAll({
            include: Products
          });
    
           ejs.renderFile(path.join(__dirname, '../../views/', "report-template.ejs"), {prducts: prducts}, (err, data) => {
           if (err) {
                 res.send(err);
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
               pdf.create(data, options).toFile("reports/Product In Report.pdf", function (err, data) {
                   if (err) {
                       res.send(err);
                   } else {
                       res.send("File created successfully");
                   }
               });
           }
       });
    } catch (error) {
        console.log(error)
    }


  }


  static async printProductOut(req, res) {
    const prducts = await Product_out.findAll({
        include: Products
      });

       ejs.renderFile(path.join(__dirname, '../../views/', "report-template.ejs"), {prducts: prducts}, (err, data) => {
       if (err) {
             res.send(err);
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
           pdf.create(data, options).toFile("reports/Product Out Report.pdf", function (err, data) {
               if (err) {
                   res.send(err);
               } else {
                   res.send("File created successfully");
               }
           });
       }
   });
  }

}

module.exports = PrintController;