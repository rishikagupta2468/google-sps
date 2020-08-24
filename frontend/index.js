var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    port = 8000,
    reportRoute = require("./routes/report");
    methodOverride = require('method-override');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use("/report", reportRoute);


// PORT
app.listen(port, function () {
  console.log(`Running at ${port}`);
});

