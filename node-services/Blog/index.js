var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    port = 8080 || process.env.PORT,
    articleRoute=require("./routes/articles");
    methodOverride = require('method-override')
    
var cors = require('cors')
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use("/articles", articleRoute);

app.get("/",function(req,res){
    res.render("profile");
});

// PORT
app.listen(port, function () {
  console.log(`Running at ${port}`);
});

