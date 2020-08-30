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

    if(Object.keys(req.params).length === 0) {
        try {
            const prducts = await Product_in.findAll({
                include: Products
            });
        
            ejs.renderFile(path.join(__dirname, '../../views/', "report-product.ejs"), {prducts: prducts}, (err, data) => {
            if (err) {
                    console.log(err)
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
                        console.log(err)
                        res.send(err);
                    } else {
                            response.message = "File Product In created successfully"
                            res.status(201).json(response)
                    }
                });
            }
        });
        } catch (error) {
            console.log(error)
        }
    }else{
        const {id} = req.params;
        try {
            const prducts = await Product_in.findByPk(id)
        
            ejs.renderFile(path.join(__dirname, '../../views/', "report-productId.ejs"), {prducts: prducts}, (err, data) => {
            if (err) {
                    console.log(err)
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
                pdf.create(data, options).toFile("reports/Product In By Id Report.pdf", function (err, data) {
                    if (err) {
                        console.log(err)
                        res.send(err);
                    } else {
                            response.message = "File Product In By Id created successfully"
                            res.status(201).json(response)
                    }
                });
            }
        });
        } catch (error) {
            console.log(error)
        }
    }

  }


  static async printProductOut(req, res) {

    if(Object.keys(req.params).length === 0){
        const prducts = await Product_out.findAll({});

            ejs.renderFile(path.join(__dirname, '../../views/', "report-product.ejs"), {prducts: prducts}, (err, data) => {
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
                        response.message = "File Product Out created successfully"
                        res.status(201).json(response)
                    }
                });
            }
        });
    }else{
        const {id} = req.params;

        const prducts = await Product_out.findByPk(id)

            ejs.renderFile(path.join(__dirname, '../../views/', "report-productId.ejs"), {prducts: prducts}, (err, data) => {
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
                pdf.create(data, options).toFile("reports/Produc Out By Id Report.pdf", function (err, data) {
                    if (err) {
                        res.send(err);
                    } else {
                        response.message = "File Product Out By Id created successfully"
                        res.status(201).json(response)
                    }
                });
            }
        });
    }


  }

}

module.exports = PrintController;