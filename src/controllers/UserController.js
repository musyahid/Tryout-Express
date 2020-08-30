const { Users } = require("../models");
const multer = require('multer')

const response = {
    message: "",
    status: true,
    data:{
      data: [],
      totalItems: "",
      totalPages: "",
    }
}


class UserController {

  static async getUser(req, res) {

    if(Object.keys(req.query).length === 0) {
      try {
        const options = {
          page: 1, // Default 1
          paginate: 10, // Default 25
        }
        const { docs, pages, total } = await Users.paginate(options)
          response.data.data = docs;
          response.data.totalItems = total;
          response.data.totalPages = pages;
          response.message = "succes get data";
          response.status = "success";
          res.json(response)
      } catch (error) {
          response.status = false;
          response.message = error.message;
          res.status(400).json(response)
      }
    }else {
      try {
          const page= parseInt(req.query.page)
          const totals = parseInt(req.query.total)
    
        const options = {
          page: page, // Default 1
          paginate: totals, // Default 25
        }
        const { docs, pages, total } = await Users.paginate(options)
    
          response.data.data = docs;
          response.data.totalItems = total;
          response.data.totalPages = pages;
          response.message = "succes get data";
          response.status = "success";
          res.json(response)
      } catch (error) {
          response.status = false;
          response.message = error.message;
          res.status(400).json(response)
      }
    }
 }
  

  static async saveUser(req, res) {

       try { 
        const saveUser = await Users.create({
            full_name:req.body.full_name,
            username:req.body.username,
            email:req.body.email,
            phone_number:req.body.phone_number,
            salt:req.body.salt,
            password:req.body.password,
            role:req.body.role
        }) 
        console.log(saveUser)
        response.message = "sukses simpan data"
        response.data = saveUser
        res.status(201).json(response)
      } catch (error) {
          response.status = false;
          response.message = error.message;
          res.status(400).json(response)
      }
  
  }

  static async getUserById(req, res) {
    const {id} = req.params;
    const UserDetail = await Users.findByPk(id)
    try {
        if(!UserDetail) throw new Error("Data Not Found")
        response.data = UserDetail;
        response.message = "succes get data";
        response.status = "Success";
        res.json(response)
    } catch (error) {
          // response.message = error.message;
          response.data = [];
          response.status = "fail";
          res.status(404).json(response)
    }
  } 

  static async updateUser(req, res) {
    const {id} = req.params;
    
    try {
      const updateUser = await Users.update({
        full_name:req.body.full_name,
        username:req.body.username,
        email:req.body.email,
        phone_number:req.body.phone_number,
        role:req.body.role
      }, {
        where: {
          id: id
        }
      })
      if(!updateUser) throw new Error("Data Not Found")
      const getUserById = await Users.findByPk(id)
      response.status = "success, data updated",
      response.data = getUserById
      res.status(200).json(response)
    } catch (error) {
      response.status = false;
      response.message = error.message;
      res.status(400).json(response)
    }
  }

  static async deleteUser(req, res) {
    const {id} = req.params;
    const user = await Users.destroy({
      where: {
        id: id
      }
    })

    try {
      if(user === 0) throw new Error("Data Not Found")
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
}

module.exports = UserController;
