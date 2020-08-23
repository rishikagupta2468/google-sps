const express = require('express');
const shareReportWithOthers = require('../controllers/sharedWithOthers');
const shareReportWithMe = require('../controllers/reportSharedWithMe');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post('/', async (req, res) => {
  try {
    if (req.body.email) {
      req.body.email = req.body.email.toLowerCase();
    }
    doesExist = await shareReportWithOthers.checkIfExists({
      id: req.body.id,
      email: req.body.email
    });
    if (doesExist.responseCode === '0') {
      const shareWithMe = shareReportWithMe.shareWithMe({
        id: req.body.id,
        email: req.body.email,
        description: req.body.description,
        reportOwner: req.body.reportOwner
      });
      const shareWithOther = shareReportWithOthers.shareWithOthers({
        id: req.body.id,
        email: req.body.email
      });
      Promise.all([shareWithOther, shareWithMe]).then(() => {
          return res.status(200).json({
            responseCode: '1'
          })
        }).catch((err) => {
          return res.status(400).send(err.message);
      });
    } else {
      return res.status(200).json({
        responseCode: '1'
      });
    }
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

module.exports = router;