require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findOrCreate');


const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  secret:"The secret code",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/samplrDB", {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  fname: String,
  lname: String,
  address:String,
  city:String,
  state:String,
  zip:String

});
const accountSchema = new mongoose.Schema({

});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);
// const Account = new mongoose.model("Account", accountSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.use(function (req, res, next) { // need this in order for the login in button to switch back and forth from logout this let the template access isAuthenticated
 res.locals.isAuthenticated = req.isAuthenticated();
 next();
});
app.use(function (req, res, next) { // need this in order for the login in button to switch back and forth from logout this let the template access isAuthenticated
 res.locals.isAuthenticated = req.isAuthenticated();
 next();
});
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/samplr",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get("/", function(req, res){
  res.render("index");
});

app.get("/auth/google",
  passport.authenticate("google", { scope:["profile"] })
);
app.get("/auth/google/samplr",
  passport.authenticate('google', { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirectto secrets.
    res.redirect("/account");
  });

app.get("/home", function(req, res){
  res.render("home");
});

app.get("/register", function(req, res){
  res.render("register");
});

app.get("/login", function(req, res){
  res.render("login");
});

app.get('/logout', function (req, res){
  req.logout();  // <-- not req.logout();
  req.session.destroy();
  res.redirect('/');
  console.log("Logged out");
});

app.get("/submission", function(req, res){
  res.render("submission");

});

app.get("/account",function(req, res){

  User.find({"_id": {$ne: null}}, function(err, foundUsers){
    if(err){
      console.log(err)
    }else{
      if(foundUsers){
        // res.render("account", {usersWithName: foundUsers});
        if(req.isAuthenticated()){
          res.render("account", {usersWithName: foundUsers});
          console.log(foundUsers);
        }else{
          res.redirect("/login");
        }
      }
    }
  });

});



app.post("/register", function(req, res){

  User.register({username: req.body.username}, req.body.password, function(err){
    if(err){
      console.log(err);
      res.redirect("/register");
    }else{
      passport.authenticate("local")(req, res, function(){
        res.redirect("/account");
      });
    }
  });
});


//
// app.post("/login", function(req, res){
//   const user = new User({
//     username: req.body.username,
//     password: req.body.password
//   });
//
//   req.login(user, function(err){
//     if(err){
//       console.log(err);
//       res.redirect("/register");
//     }else{
//       passport.authenticate("local")(req, res, function(){
//         res.redirect("/account");
//       });
//     }
//   });
//
// });
app.post("/account", function(req, res){
  const user = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    // email: req.body.email,
    // password: req.body.password,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip
  });
  // const userFname = req.body.fname;

  User.findById(req.user._id, function(err, foundUser){
    if(err){
      console.log(err);
    }else {
      if(foundUser){
        foundUser.fname = user.fname;
        foundUser.lname = user.lname;
        // foundUser.email = user.email;
        // foundUser.password = user.password;
        foundUser.address = user.address;
        foundUser.city = user.city;
        foundUser.state = user.state;
        foundUser.zip = user.zip;
        foundUser.save(function(){
          res.redirect("/account");
          console.log(foundUser);
        });
      }
    }
  });
});
// app.get("/account/:accountId", function(req, res){
//   const accountIdReq = req.params.accountId;
//
//   Account.findOne({_id:accountIdReq, function(err), account}{
//     res.render("account",{
//       fname: account.fname,
//       lname: account.lname
//     });
//   });
//
// });
app.post("/login", passport.authenticate("local",{
    successRedirect: "/account",
    failureRedirect: "/login"
}), function(req, res){

});

// check isLoggedIn
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(3000, function(){
  console.log(" Server Started on port 3000");
});
