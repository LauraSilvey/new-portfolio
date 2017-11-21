var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var express = require("express");
var app = express();

// App Config
mongoose.connect("mongodb://localhost/portfolio", {useMongoClient: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// Mongoose/Model Config
var projectSchema = new mongoose.Schema({
  image: String,
  techList: String,
});

var Project = mongoose.model("Project", projectSchema);

// RESTful Routes
app.get("/", function(req, res){
  res.redirect("/projects");
});

app.get("/projects", function(req, res){
  Project.find({}, function(err, projects){
    if(err){
      console.log(err);
    }else{
      res.render("index", {projects});
    }
  });
});

app.listen(3000);