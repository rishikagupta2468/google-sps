const express = require('express');
const fetch = require('node-fetch');
const shareReportWithOthers = require('../controllers/sharedWithOthers');
const shareReportWithMe = require('../controllers/reportSharedWithMe');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get('/', async (req, res) => {
  try {
    if (req.query.email) {
      req.query.email = req.query.email.toLowerCase();
      const response = await fetch('https://user-service-dot-summer20-sps-77.df.r.appspot.com/checkuser', {
        method: 'post', 
        query: JSON.stringify({
          email: req.query.email
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
    doesExist = await shareReportWithOthers.checkIfExists({
      id: req.query.id,
      email: req.query.email
    });
    if (doesExist.responseCode === '0') {
      const shareWithMe = shareReportWithMe.shareWithMe({
        id: req.query.id,
        email: req.query.email,
        description: req.query.description,
        reportOwner: req.query.reportOwner
      });
      const shareWithOther = shareReportWithOthers.shareWithOthers({
        id: req.query.id,
        email: req.query.email
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