const { Products, Users, Product_in, Product_out } = require("../models");
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
var path = require("path");
require('dotenv').config();
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
      const saveProductIn = await Product_in.create({
          total:req.body.total,
          ProductId:req.body.ProductId,
      }) 
      console.log(saveProductIn)
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
      const findProduct = await Products.findOne({ where: { id: req.body.ProductId } });
      
      if(findProduct.stock > req.body.total) {
          response.status = false;
          response.message = "Stok Tidak Mencukupi"
      }else {
          const saveProductOut = await Product_out.create({
          total:req.body.total,
          ProductId:req.body.ProductId,
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
