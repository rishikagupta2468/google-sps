var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    port =  process.env.PORT || 8080,
    articleRoute=require("./routes/articles");
    methodOverride = require('method-override')
    
var cors = require('cors')
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use("/articles", articleRoute);


// PORT
app.listen(port, function () {
  console.log(`Running at ${port}`);
});

