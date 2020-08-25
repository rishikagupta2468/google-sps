const express = require('express');
const fetch = require('node-fetch');
const { createToken, verifyToken } = require('../util/jwt/index');
const cookieParser = require('cookie-parser');
const loginMiddleware = require('../middlewares/loginMiddleware');
var router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));
express().use(cookieParser());
router.use(express.static('public'));

router.get('/login', loginMiddleware, (req, res) => {
  res.render('login', {
    valid: req.query.valid
  });
});

router.get('/signup', loginMiddleware, (req, res) => {
  res.render('signup',  {
    valid: req.query.valid
  });
});

router.get('/logout', (req, res) => {
  res.status(200).clearCookie('jwt');
  res.redirect('/');
});

router.post('/login', async (req, res) => {
  try {
    const loginResponse = await fetch('https://user-service-dot-summer20-sps-77.df.r.appspot.com/login', {
      method: 'post', 
      body: JSON.stringify({
        email: req.body.email,
        password: req.body.password
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (loginResponse.status === 200) {
      const json = await loginResponse.json();
      const validationText = (json.responseCode === '-1') ? "Wrong Password!": "User doesn't exist"; 
      if (json.responseCode === '-1' || json.responseCode === '0') {
        return res.redirect(`/authenticate/login?valid=${ validationText }`);
      }
      json.userData.email = req.body.email;
      const token = createToken(json.userData);
      res.cookie('jwt', token, { httpOnly: true, secure: false, maxAge: 175000000 });
      res.redirect('/');
    } else {
      const text = await loginResponse.text();
      res.status(loginResponse.status).send(text);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post('/signup', async (req, res) => {
  try {
    const signupResponse = await fetch('https://user-service-dot-summer20-sps-77.df.r.appspot.com/signup', {
    method: 'post', 
    body: JSON.stringify({name: req.body.name,
      email: req.body.email, password: req.body.password,
      age: req.body.age, gender: req.body.gender}),
    headers: { 'Content-Type': 'application/json' }
    });
    if (signupResponse.status === 200) {
      const json = await signupResponse.json();
      if (json.responseCode === '0') {
        const validationText = "User already exists";
        return res.redirect(`/authenticate/signup?valid=${ validationText }`)
      }
      return res.redirect('/');
    } else {
      const text = await signupResponse.text();
      res.status(signupResponse.status).send(text);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;