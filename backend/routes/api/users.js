const express = require('express');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

const {generateToken, setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required'),
  handleValidationErrors
];

// SIGN-UP-USER
// **********************************************************
router.post(
  '',
  validateSignup,
  async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;

    // Check if a user with the provided email or username already exists
    const existingUserByEmail = await User.findOne({ where: { email } });
    const existingUserByUsername = await User.findOne({ where: { username } });

    if (existingUserByEmail) {
      return res.status(500).json({
        message: "User already exists",
        errors: {
          email: "User with that email already exists"
        }
      });
    }

    if (existingUserByUsername) {
      return res.status(500).json({
        message: "User already exists",
        errors: {
          username: "User with that username already exists"
        }
      });
    }

    const role = 'user';
    const createdAt = new Date();
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ email, username, password_hash: hashedPassword, firstName, lastName, role, created_at: createdAt });

    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName
    };

    await setTokenCookie(res, safeUser);

    return res.status(200).json({
      user: safeUser
    });
  }
);
// *************************************************************************

// LOG-OUT-User
// *************************************************************************
router.post('/logout', async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
});
// *************************************************************************

// LOG-IN-User
// *************************************************************************
router.post('/login', async (req, res) => {
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

  console.log('password attempt:', password);
  console.log('user', user);
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const safeUser = {
    id: user.id,
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName
  };

  await setTokenCookie(res, safeUser);

  return res.status(200).json({
    user: safeUser
  });
});
// *************************************************************************

// GET-CURRENT-USER
// *************************************************************************
const getCurrentUser = (req, res) => {
  const { user } = req;
  if (user) {
    const userInfo = {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName
    };
    return res.status(200).json({ userInfo });
  } else {
    return res.status(200).json({ user: null });
  }
};

router.get('/current-user', restoreUser, getCurrentUser);
// ***************************************************


// GET-ALL-USERS
// *************************************************************************
router.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: ['id', 'email', 'username', 'firstName', 'lastName']
  });

  res.status(200).json({
    users
  });
});
// *************************************************************************
module.exports = router;
