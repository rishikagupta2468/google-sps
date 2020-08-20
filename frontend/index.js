const express = require('express'),
    app = express(),
    bmiRoute=require("./routes/bmi-calculator"),
    homeRoute = require('./routes/home'),
    authenticateRoute = require('./routes/authenticate'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    generalMiddleware = require('./middlewares/generalMiddleware'),
    PORT = process.env.PORT || 8080


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(generalMiddleware);

app.use("/", homeRoute);
app.use("/bmi-calculator", bmiRoute);
app.use("/authenticate", authenticateRoute);

// PORT
app.listen(PORT, function () {
  console.log(`Running at ${PORT}`);
});