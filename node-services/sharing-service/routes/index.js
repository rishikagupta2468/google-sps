const express = require('express');
const fetch = require('node-fetch');
const shareReportWithOthers = require('../controllers/sharedWithOthers');
const shareReportWithMe = require('../controllers/reportSharedWithMe');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// responseCode -1 Empty email parameter
// responseCode  0 User doesn't exist
// responseCode  1 Report shared successfully

router.post('/', async (req, res) => {
  try {
    if (req.body.email) {
      req.body.email = req.body.email.toLowerCase();
      const response = await fetch('https://user-service-dot-summer20-sps-77.df.r.appspot.com/checkuser', {
        method: 'post',
        body: JSON.stringify({
          email: req.body.email
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      const json = await response.json();
      if (json.responseCode === '0') {
        return res.status(200).json(json);
      }
    } else {
      return res.status(200).json({
        responseCode: '-1'
      });
    }
    isReportAlreadyShared = await shareReportWithOthers.checkIfReportAlreadyExists({
      id: req.body.reportId
    }, req.body.email);
    if (isReportAlreadyShared.responseCode === '0') {
      const shareWithMe = shareReportWithMe.shareWithMe({
        id: req.body.reportId,
        description: req.body.description,
        reportOwner: req.body.reportOwner
      }, req.body.email);
      const shareWithOther = shareReportWithOthers.shareWithOthers({
        id: req.body.reportId
      }, req.body.email);
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