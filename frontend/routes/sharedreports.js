const express = require("express"),
    redirectMiddleware = require('../middlewares/redirectMiddleware'),
    fetch = require("node-fetch"),
    router  = express.Router();

router.get('/shared', redirectMiddleware, async (req, res) => {
  try {
    const responseObject = await fetch('https://sharing-service-dot-summer20-sps-77.df.r.appspot.com/accessreports/sharedwithme', {
      method: 'POST', 
      body: JSON.stringify({
          email: req.email
      }),
          headers: { 'Content-Type': 'application/json' }
    });
    const json = await responseObject.json();
    res.render("report/shared", {
      reports: json.reports
    });
  } catch(err) {
    res.send(err.message);
  }
})

module.exports = router;