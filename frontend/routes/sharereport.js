const express = require("express"),
    redirectMiddleware = require('../middlewares/redirectMiddleware'),
    fetch = require("node-fetch"),
    router  = express.Router();

router.get("/share", redirectMiddleware, (req, res) => {
  res.render("report/share", {
    img: req.query.img,
    description: req.query.description,
    email: req.email,
    success: req.query.success,
    error: req.query.error
  })
});

router.post("/share", async (req, res) => {
  try {
    const responseObject = await fetch('https://sharing-service-dot-summer20-sps-77.df.r.appspot.com/share', {
      method: 'POST', 
      body: JSON.stringify({
          email: req.body.email,
          reportId: req.body.reportid,
          description: req.body.description,
          reportOwner: req.email
      }),
          headers: { 'Content-Type': 'application/json' }
    });
    const json = await responseObject.json();
    let success, error;
    if (json.responseCode === '1') {
      success = "Report Shared successfully";
    } else if (json.responseCode === '0') {
      error = "User doesn't exist";
    } else {
      error = "Email parameter empty";
    }
    res.redirect(`/share?img=${req.body.reportid}&description=${req.body.description}
        &success=${success}&error=${error}`);
  } catch(err) {
    res.send(err.message);
  }
});

module.exports = router;