// ./src/middleware/jwt.js
const { Users } = require("../models");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "kucingpanda",
};
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
      console.log("Payloadd: ",jwt_payload);
    Users
      .findOne({ where: { id: jwt_payload.id } })
      .then((user) => done(null, user))
      .catch((err) => done(err, false));
  })
);
passport.serializeUser((user, done) =>{ 
    
    console.log(user);
    done(null, user.id)});
passport.deserializeUser((id, done) => {
  Users
    .findByPk(id)
    .then((user) => done(null, user))
    .catch((err) => done(err));
});
module.exports = passport.authenticate("jwt", { session: false });
