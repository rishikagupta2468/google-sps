const Firestore = require('@google-cloud/firestore');
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    port = 8000,
    methodOverride = require('method-override');

const multer = require('multer');
var cloudinary = require('cloudinary').v2;

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
app.get("/reports/new",function(req,res){
    res.render("new");
});
app.get("/reports",async function(req,res){
    const snapshot = await db.collection('reports').get();
    snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
    });
});
app.post("/reports", upload.single('image'), async function(req, res){
    var desc = req.body.description;
    const image = await cloudinary.uploader.upload("./public/upload/save.jpg");
    db.collection("reports").add({
        img: image.secure_url,
        description: desc
    })
    .then(function(newReport) {
        res.redirect("/reports");
    })
    .catch(function(error) {
        console.log(error);
        res.redirect("/");
    });
});

// PORT
app.listen(port, function () {
  console.log(`Running at ${port}`);
});