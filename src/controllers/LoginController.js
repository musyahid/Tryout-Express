const {  Users } = require("../models");

const response = {
    status: true,
    message: "",
    data:[]
}
// require("express-session")({
//   secret: "kucingpanda",
//   resave: false,
//   saveUninitialized: false,
// });

const jwt = require("jsonwebtoken");

// const passport = require("passport");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "kucingpanda";



const getUser = async obj => {
    return await Users.findOne({
      where: obj
    });
  };


class LoginController {

  static async login(req, res) {
    try {
        const { email, password } = req.body;
    
        if (email && password) {
          let user = await getUser({ email: email });
    
          if (!user) {
            res.status(401).json({ msg: "email salah atau anda belum terdaftar" });
          }
    
          if (user.password === password) {
            let payload = { id: user.id };
    
            let token = jwt.sign(payload, jwtOptions.secretOrKey);
    
            res.json({ Message: "Login Berhasi;", token: token });
          } else {
            res.status(401).json({ msg: "password salah" });
          }
        }
      } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
      }
  }
  
}

module.exports = LoginController;