const Firestore = require('@google-cloud/firestore');
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    port = 8000,
    methodOverride = require('method-override');

const multer = require('multer');
var cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dk96tpgwo',
  api_key: '257327353339548',
  api_secret: 'c4ItASdO3ykmYH5T5U8Ga2q-VBM'
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, "save.jpg");
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/jpg|jpe|jpeg|png$i/)) {
      cb(new Error('File is not supported'), false);
      return;
    }
    cb(null, true);
  }
});
var upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));

const db = new Firestore({
  projectId: 'summer20-sps-77',
  keyFilename: 'key.json',
});

app.get("/",function(req,res){
    res.render("profile");
});
app.get("/report/new",function(req,res){
    res.render("new");
});
app.get("/report",async function(req,res){
    const reports = await db.collection('reports').get();
    res.render("show",{reports: reports});
});
app.post("/report", upload.single('image'), async function(req, res){
    var desc = req.body.description;
    const image = await cloudinary.uploader.upload("./public/upload/save.jpg");
    db.collection("reports").add({
        img: image.secure_url,
        description: desc
    })
    .then(function(newReport) {
        res.redirect("/report");
    })
    .catch(function(error) {
        console.log(error);
        res.redirect("/");
    });
});

app.get('/report/:id/edit', function (req, res) {
    var report = db.collection("reports").doc(req.params.id);
    report.get().then(function(report) {
        if (report.exists) {
            res.render("edit", {report:report});
        } else {
            console.log("No such document!");
            res.redirect("/");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
        res.redirect("/");
    });
});

// UPDATE Route
app.put('/report/:id',upload.single('image'), async function (req, res) {
    var desc = req.body.description;
    const image = await cloudinary.uploader.upload("./public/upload/save.jpg");
    db.collection("reports").doc(req.params.id).update({
        "img": image.secure_url,
        "description": desc
    });
    res.redirect("/report");
});

//DELETE Route
app.delete('/report/:id', function (req, res) {
    db.collection("reports").doc(req.params.id).delete().then(function() {
        res.redirect('/report');
    }).catch(function(error) {
        console.log(error);
        res.redirect('/report');
    });
});

// PORT
app.listen(port, function () {
  console.log(`Running at ${port}`);
});