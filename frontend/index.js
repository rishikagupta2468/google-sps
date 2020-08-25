
const express = require('express'),
    app = express(),
    bmiRoute=require("./routes/bmi-calculator"),
    homeRoute = require('./routes/home'),
    authenticateRoute = require('./routes/authenticate'),
    articleRoute = require('./routes/articles'),
    reportRoute = require("./routes/report"),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    generalMiddleware = require('./middlewares/generalMiddleware'),
    methodOverride = require('method-override'),
    PORT =  process.env.PORT || 9000

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
app.listen(PORT, function () {
  console.log(`Running at ${PORT}`);
});

