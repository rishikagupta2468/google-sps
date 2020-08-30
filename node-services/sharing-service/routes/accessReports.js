const express = require('express');
const fetch = require('node-fetch');
const { accessReports } = require('../controllers/accessReportsSharedWithMe');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post('/sharedwithme', async (req, res) => {
  try {
    if (req.body.email) {
      req.body.email = req.body.email.toLowerCase();
    } else {
      return res.status(200).json({
        responseCode: '0'
      });
    }
    const resp = await accessReports({
      email: req.body.email
    });
    res.status(200).json(resp);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;