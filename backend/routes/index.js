// backend/routes/index.js
const express = require('express');
const router = express.Router();

// backend/routes/index.js
// ...
// Add a XSRF-TOKEN cookie
// In this route, you are setting a cookie on the response with the name of XSRF-TOKEN
// to the value of the req.csrfToken method's return.
// Then, send the token as the response for easy retrieval.
router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});
// ...
// ...
// backend/routes/index.js
const apiRouter = require('./api');

router.use('/api', apiRouter);
// ...

// csrf route for testing
const csrfRouter = require('./csrf');
router.use('/csrf', csrfRouter);

module.exports = router;
