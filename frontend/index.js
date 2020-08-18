var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    port = 8080



app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));


app.get("/",async function(req,res){
    res.render("home");
});


// PORT
app.listen(port, function () {
  console.log(`Running at ${port}`);
});