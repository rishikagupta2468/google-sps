const express = require('express');
const { doesUserExist } = require('../controllers/doesUserExist');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post('/', async (req, res) => {
  try {
    responseObject = await doesUserExist(req.body.email);
    res.status(200).send(responseObject);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;