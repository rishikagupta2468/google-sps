const express = require("express"),
    router  = express.Router(),
    reportDb = require("../Controllers/report.js");
router.use(express.json());
router.use(express.urlencoded({ extended: false }));



router.get("/", async function(req,res) {
    try {
        reports = await reportDb.getAllReports();
        res.status(200).json(reports);
    } catch (err) {
        res.status(400).send(err.message);
    }   
});

router.post("/", async function(req, res){
    const desc = req.body.description;
    const image = req.body.image;
    try {
        reportObject = await reportDb.createReport({
            'img': image,
            'description': desc,
            'email': req.body.email
        });
        res.status(200).json(reportObject);
    } catch(err) {
        console.log(err.message);
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

router.put('/:id', async function (req, res) {
    const desc = req.body.description;
    const image = req.body.image;
    try {
        reportObject = await reportDb.editReport({
            'img': image,
            'description': desc,
            'id': req.params.id
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