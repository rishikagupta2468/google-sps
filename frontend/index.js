
const express = require('express'),
    app = express(),
    bmiRoute=require("./routes/bmi-calculator"),
    homeRoute = require('./routes/home'),
    authenticateRoute = require('./routes/authenticate'),
    articleRoute = require('./routes/articles'),
    reportRoute = require("./routes/report"),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    port = process.env.PORT || 8000,
    generalMiddleware = require('./middlewares/generalMiddleware'),
<<<<<<< HEAD
    methodOverride = require('method-override'),
    PORT =  process.env.PORT || 8080
=======
    methodOverride = require('method-override')

>>>>>>> 96b1e40688343a478dddd364d0b7105a6d27b0ca

var cors = require('cors')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(generalMiddleware);
app.use(methodOverride('_method'));

app.use("/", homeRoute);
app.use("/bmi-calculator", bmiRoute);
app.use("/authenticate", authenticateRoute);
app.use("/articles", articleRoute);
app.use("/report", reportRoute);

// PORT
app.listen(port, function () {
  console.log(`Running at ${port}`);
});

