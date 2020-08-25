const express = require("express"),
    fetch = require('node-fetch'),
    cloudinary = require('cloudinary').v2,
    multer = require('multer'),
    router  = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload');
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

router.get("/", async function(req, res){
    const reportData = await fetch("https://reports-dot-summer20-sps-77.df.r.appspot.com/report");
    reports = await reportData.json();
    res.render("report/index", {reports: reports.reports});
});

router.post("/",upload.single('image'), async function(req,res){
    const image = await cloudinary.uploader.upload("./public/upload/save.jpg");
    try {
        const reportResponse = await fetch('https://reports-dot-summer20-sps-77.df.r.appspot.com/report', {
        method: 'POST', 
        body: JSON.stringify({
            description: req.body.description,
            image: image.secure_url
        }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (reportResponse.status === 200) {
            console.log("valid");
            res.redirect("/report");
        }
        else {
            const text = await reportResponse.text();
            res.status(reportResponse.status).send(text);
        }
    }catch (err) {
        console.log(err.message);
        res.status(400).send(err.message);
        res.redirect("/report");
    }
});

router.get("/new", function (req,res){
  res.render('report/new');
});

router.get('/:id/edit', async function(req,res){
    const reportData = await fetch("https://reports-dot-summer20-sps-77.df.r.appspot.com/report/"+req.params.id);
    report = await reportData.json();
    res.render("report/edit", {'id': req.params.id, 'report': report});
});

router.put("/:id",upload.single('image'), async function(req, res){
    const image = await cloudinary.uploader.upload("./public/upload/save.jpg");
    try {
        const reportResponse = await fetch('https://reports-dot-summer20-sps-77.df.r.appspot.com/report/'+req.params.id+'/?_method=PUT', {
        method: 'POST', 
        body: JSON.stringify({
            description: req.body.description,
            image: image.secure_url
        }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (reportResponse.status === 200) {
            res.redirect("/report");
        }
        else {
            const text = await reportResponse.text();
            res.status(reportResponse.status).send(text);
        }
    }catch (err) {
        console.log(err.message);
        res.status(400).send(err.message);
        res.redirect("/report");
    }
});

router.delete('/:id', async function (req, res) {
    const response = await fetch('https://reports-dot-summer20-sps-77.df.r.appspot.com/report/'+req.params.id+'/?_method=DELETE', {
        method: 'POST'
    });
    res.redirect("/report");
});

module.exports = router ;