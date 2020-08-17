const express = require('express');
const router = express.Router();
const userDb = require('../controllers/userDb');

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post('/signup', async (req, res) => {
  try {
    responseObject = await userDb.signup({'email': req.body.email, 
        'password': req.body.password,
        'name': req.body.name,
        'age': req.body.age,
        'gender': req.body.gender
    });
    res.status(200).json(responseObject);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;