const { Products, Users, Product_in, Product_out } = require("../models");

const nodemailer = require('nodemailer')
const mustache = require('mustache');
const ejs = require("ejs")
const fs = require('fs')
const hbs = require('nodemailer-express-handlebars')
require('dotenv').config();


const cloudinary = require('cloudinary').v2;
var path = require("path");

const response = {
    message: "",
    status: true,
    data:[]
}




class ProductController {


  static async getProduct(req, res) {
   
    const product = await Products.findAll({
        include: [
          {
            model : Users, as: "Supplier" 
          }
        ]
      });
    response.data = product;
    response.message = "succes get data";
    response.status = "succes";
    res.json(response)
  }
  
  static async saveProduct(req, res) {

       try { 
        const filename = req.files.image.tempFilePath
        cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET 
      });
       console.log(filename);
       const img = await cloudinary.uploader.upload(filename, function(error, result) {console.log(result, error)});
       fs.unlinkSync(filename);
       console.log(img.secure_url);

        const saveProduct = await Products.create({
            name:req.body.name,
            stock:req.body.stock,
            price:req.body.price,
            UserId:req.body.UserId,
            image_url:img.secure_url,
        }) 
        console.log(saveProduct)
        response.message = "sukses simpan data"
        response.data = saveProduct
        res.status(201).json(response)
      } catch (error) {
          response.status = false;
          response.message = error.message;
          res.status(400).json(response)
      }
  
  }

  static async getProductById(req, res) {
    const {id} = req.params;
    const ProductDetail = await Products.findByPk(id)
    try {
        if(!ProductDetail) throw new Error("Data Not Found")
        response.data = ProductDetail;
        response.status = "Success";
        res.json(response)
    } catch (error) {
          // response.message = error.message;
          response.data = [];
          response.status = "fail";
          res.status(404).json(response)
    }
  } 

  static async updateProduct(req, res) {
    const {id} = req.params;
    
    try {
      const updateProduct = await Products.update({
        name:req.body.name,
        stock:req.body.stock,
        price:req.body.price,
        UserId:req.body.UserId
      }, {
        where: {
          id: id
        }
      })
      if(!updateProduct) throw new Error("Data Not Found")
      const getProductById = await Products.findByPk(id)
      response.status = "success, data updated",
      response.data = getProductById
      res.status(200).json(response)
    } catch (error) {
      response.status = false;
      response.message = error.message;
      res.status(400).json(response)
    }
  }

  static async deleteProduct(req, res) {
    const {id} = req.params;
    const product = await Products.destroy({
      where: {
        id: id
      }
    })

    try {
      if(product === 0) throw new Error("Data Not Found")
      response.status = "Success, Data Deleted";
      response.data = {"id" : id}
      res.json(response)
    } catch (error) {
      response.message = error.message;
      response.data = [];
      response.status = "fail";
      res.status(404).json(response)
    }
  }

  static async productIn(req, res) {
    try { 

      const id = req.body.ProductId;
      const totalIn = req.body.total;

      const findProduct = await Products.findByPk(req.body.ProductId) //Get product by id
      const stock = findProduct.stock; // Get stock
      const total =  totalIn + stock; // Add stock

      // save ProductIn
      const saveProductIn = await Product_in.create({
          total:req.body.total,
          date: Date.now(),
          ProductId:req.body.ProductId,
      }) 

      //update stock in Product
      await Products.update({
        stock: total,
      }, {
        where: {
          id: id
        }
      })

      response.message = "sukses simpan data",
      response.data = saveProductIn
      res.status(201).json(response)
    } catch (error) {
        response.status = false;
        response.message = error.message;
        res.status(400).json(response)
    }
  }

  static async getProductIn(req, res) {
    const product = await Product_in.findAll({
        include: Products
      });
    response.data = product;
    response.message = "succes get data";
    response.status = "success";
    res.json(response)
  }

  static async productOut(req, res) {
    try { 
      
      const id = req.body.ProductId;
      const totalOut = req.body.total;

      const findProduct = await Products.findByPk(req.body.ProductId) //Get product by id
      const stock = findProduct.stock; // Get stock
      const total =  stock - totalOut; // Kurangi stock
      // const template = fs.readFileSync('./views/template.html', 'utf8')

      console.log(req.body.total)
      //Jika jumlah stock yang tersedia melebihi dari jumlah produk keluar yg diminta 
      if(stock < req.body.total) {
        response.status = false,
        response.message = "stock yang tersedia melebihi dari jumlah produk keluar yg diminta"
        
        //Jika stok habis mengirim email
        if(stock == 0) {
          const htm = await ejs.renderFile(path.join(__dirname, "../../views/template.ejs"), { name: findProduct.name })
          console.log(htm);
          response.message = "stock habis"
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
            to: 'lombokvisit98@gmail.com',
            subject: 'Stok Barang Habis',
            template: 'main',
            html: mustache.render(htm)
          }

          transporter.sendMail(mailOptions, function(err, data) {
            if(err) {
              console.log("error", err)
            }else {
              console.log('email sent')
            }
          });

        }

        res.status(201).json(response)

      }else {      
            const saveProductOut = await Product_out.create({
            total:req.body.total,
            date: Date.now(),
            ProductId:req.body.ProductId,
        })
          //update stock in Product
          await Products.update({
            stock: total,
          }, {
            where: {
              id: id
            }
          })
        console.log(saveProductOut)
        response.message = "sukses simpan data",
        response.data = saveProductOut
        res.status(201).json(response)
      }
    } catch (error) {
        response.status = false;
        response.message = error.message;
        res.status(400).json(response)
    }
  }

  static async getProductOut(req, res) {
    const product = await Product_out.findAll({
        include: Products
      });
    response.data = product;
    response.message = "succes get data";
    response.status = "success";
    res.json(response)
  }

  
}

module.exports = ProductController;
