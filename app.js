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

//Index Route
app.get("/projects", function(req, res){
  Project.find({}, function(err, projects){
    if(err){
      console.log(err);
    }else{
      res.render("index", {projects});
    }
  });
});

//New Route
app.get("/projects/new", function(req, res){
  res.render("new");
});

//Create Route
app.post("/projects", function(req, res){
  Project.create(req.body.project, function(err, newProject){
    if(err){
      res.render("new");
    }else{
      res.redirect("/projects");
    }
  });
});

//Show Route
app.get("/projects/:id", function(req,res){
  Project.findById(req.params.id, function(err, foundProject){
    if (err) {
      res.redirect("/projects");
    } else {
      res.render("show", {project: foundProject});
    }
  })
});


app.listen(3000);