var express = require("express");
var router  = express.Router();
var db = require("../database.js");

const multer = require('multer');
var cloudinary = require('../../../../software-product-sprint/node_modules/cloudinary').v2;

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

router.get("/new",function(req,res){
    res.render("report/new");
});

router.get("/",async function(req,res){
    const reports = await db.collection('reports').get();
    res.render("report/show",{reports: reports});
});

router.post("/", upload.single('image'), async function(req, res){
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

router.get('/:id/edit', function (req, res) {
    var report = db.collection("reports").doc(req.params.id);
    report.get().then(function(report) {
        if (report.exists) {
            res.render("report/edit", {report:report});
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
router.put('/:id',upload.single('image'), async function (req, res) {
    var desc = req.body.description;
    const image = await cloudinary.uploader.upload("./public/upload/save.jpg");
    db.collection("reports").doc(req.params.id).update({
        "img": image.secure_url,
        "description": desc
    });
    res.redirect("/report");
});

//DELETE Route
router.delete('/:id', function (req, res) {
    db.collection("reports").doc(req.params.id).delete().then(function() {
        res.redirect('/report');
    }).catch(function(error) {
        console.log(error);
        res.redirect('/report');
    });
});

module.exports = router;