var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    port = port =  process.env.PORT || 8000,
    methodOverride = require('method-override'),
    reportRoute=require("./routes/report");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use("/report", reportRoute);

// PORT
app.listen(port, function () {
  console.log(`Running at ${port}`);
});

