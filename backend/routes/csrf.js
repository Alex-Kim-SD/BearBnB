const express = require('express');
const router = express.Router();

router.get('/token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

module.exports = router;
