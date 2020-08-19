var express = require('express'),
    app = express(),
    bmiRoute=require("./routes/bmi-calculator");
    homeRoute = require('./routes/home')
    bodyParser = require('body-parser')
    port = 8080



app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

app.use("/", homeRoute);
app.use("/bmi-calculator", bmiRoute);

// PORT
app.listen(port, function () {
  console.log(`Running at ${port}`);
});