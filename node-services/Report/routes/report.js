const express = require("express"),
    router  = express.Router(),
    reportDb = require("../Controllers/report.js"),
    cloudinary = require('cloudinary').v2,
    multer = require('multer');
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

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

router.get("/", async function(req,res) {
    try {
        reports = await reportDb.getAllReports();
        res.status(200).json(reports);
    } catch (err) {
        res.status(400).send(err.message);
    }   
});

router.post("/", upload.single('image'), async function(req, res){
    const desc = req.body.description;
    const image = await cloudinary.uploader.upload("./public/upload/save.jpg");
    try {
        reportObject = await reportDb.createReport({
            'img': image.secure_url,
            'description': desc
        });
        res.status(200).json(reportObject);
    } catch(err) {
        res.status(400).send(err.message);
    }
});

router.get('/:id', async function (req, res) {
    try {
        reportObject = await reportDb.findReportById(req.params.id);
        res.status(200).json(reportObject);
    } catch (err) {
        res.status(400).send(err.message);
    } 
});

router.put('/:id',upload.single('image'), async function (req, res) {
    const desc = req.body.description;
    const image = await cloudinary.uploader.upload("./public/upload/save.jpg");
    try {
        reportObject = await reportDb.editReport({
            'img': image.secure_url,
            'description': desc
        });
        res.status(200).json(reportObject);
    } catch(err) {
        res.status(400).send(err.message);
    }
});

router.delete('/:id', function (req, res) {
    try {
        status = reportDb.deleteReport(req.params.id);
        res.status(200).send(status);
    } catch (err) {
        res.status(400).send(err.message);
    } 
});

module.exports = router;