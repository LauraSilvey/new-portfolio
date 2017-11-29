var bodyParser = require("body-parser");
methodOverride= require("method-override"),
expressSanitizer= require("express-sanitizer"),
mongoose = require("mongoose"),
express = require("express"),
app = express();

// App Config
mongoose.connect("mongodb://localhost/portfolio", {useMongoClient: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

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

//Edit Route
app.get("/projects/:id/edit", function(req, res){
  Project.findById(req.params.id, function(err, foundProject){
    if(err){
      res.redirect("/projects");
    } else {
      res.render("edit", {project: foundProject});
    }
  })
});

//Update Route
app.put("/projects/:id", function(req, res){
  Project.findByIdAndUpdate(req.params.id, req.body.project, function(err, updatedBlog){
    if(err){
      res.redirect("/projects");
    } else {
      res.redirect("/projects/" + req.params.id);
    }
  })
});

//Delete Route
app.delete("/projects/:id", function(req, res){
  Project.findByIdAndRemove(req.params.id, function(err){
    if(err) {
      res.redirect("/projects");
    } else {
      res.redirect("/projects");
    }
  })
});


app.listen(3000);