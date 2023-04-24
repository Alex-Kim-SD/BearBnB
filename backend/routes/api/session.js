// backend/routes/api/session.js
// ...// backend/routes/api/session.js
// ...
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// ...
// backend/routes/api/session.js
const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();
// backend/routes/api/session.js
// ...
const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];
// Log in
// LOG-IN-User
// *************************************************************************
router.post('/', async (req, res) => {
  const { credential, password } = req.body;

  if (!credential || !password) {
    const errors = {};
    if (!credential) errors.credential = 'Email or username is required';
    if (!password) errors.password = 'Password is required';
    return res.status(400).json({ message: 'Bad Request', errors });
  }

  const user = await User.findOne({ //one thing to note is this might cause problems if multiple ahve the same username
    where: {
      [Op.or]: [{ email: credential }, { username: credential }],
    },
  });

  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const safeUser = {
    id: user.id,
    email: user.email,
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name
  };

  setTokenCookie(res, safeUser);

  return res.status(200).json({
    user: safeUser
  });
});
// *************************************************************************

// GET-CURRENT-USER
// *************************************************************************
const getCurrentUser = (req, res) => {
  console.log(req.user)
  const { user } = req;
  if (user) {
    const userInfo = {
      id: user.id,
      email: user.email,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name
    };
    return res.status(200).json({ userInfo });
  } else {
    return res.status(200).json({ user: null });
  }
};

router.get('/current-user', restoreUser, getCurrentUser);
// ***************************************************


// Log out
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

// ...
// backend/routes/api/session.js
// ...

// Restore session user
router.get(
  '/',
  (req, res) => {
    const { user } = req;
    if (user) {
      const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName
      };
      return res.json({
        user: safeUser
      });
    } else return res.json({ user: null });
  }
);

// ...
module.exports = router;
