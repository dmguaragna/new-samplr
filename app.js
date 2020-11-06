
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");


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
  password: String
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

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

app.get("/", function(req, res){
  res.render("index");
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

app.get("/account",function(req, res){

  if(req.isAuthenticated()){
    res.render("account");

  }else{
    res.redirect("/login");
  }
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
