const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Admission = require('../../models/Admission');

// @route  POST /api/users/admin
// @desc   Register a admin
// @access Public
router.post(
  '/admin',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Email is required')
      .not()
      .isEmpty(),
    check('password', 'Password is required').isLength({ min: 6 })
    // check('registrationNumber', 'Registration number is required')
    //   .not()
    //   .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      password
      // registrationNumber
    } = req.body;
    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      const avatar = gravatar.url(email, {
        s: '200', //size
        r: 'pg', //rating
        d: 'mm' //default
      });

      user = new User({
        name,
        email,
        password,
        avatar
        // registrationNumber
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      user.type = 0;

      await user.save();

      const admission = new Admission();

      await admission.save();

      res.json({ msg: 'Admin created successfully' });
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route  POST /api/users/coordinator
// @desc   Register a coordinator
// @access Public
router.post(
  '/coordinator',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Email is required')
      .not()
      .isEmpty(),
    check('password', 'Password is required').isLength({ min: 6 })
    // check('registrationNumber', 'Registration number is required')
    //   .not()
    //   .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      password
      //registrationNumber
    } = req.body;

    try {
      const user = await User.findOne({ email });

      if (user) {
        return res.send(400).json({ msg: 'User already exists' });
      }

      const avatar = gravatar.url(email, {
        s: '200', //size
        r: 'pg', //rating
        d: 'mm' //default
      });

      user = new User({
        name,
        email,
        password,
        avatar
        // registrationNumber
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      user.type = 1;

      await user.save();
      res.json({ msg: 'User successfully registered' });
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route  POST /api/users/faculty
// @desc   Register a Faculty
// @access Public
router.post(
  '/faculty',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Email is required')
      .not()
      .isEmpty(),
    check('password', 'Password is required').isLength({ min: 6 })
    // check('registrationNumber', 'Registration number is required')
    //   .not()
    //   .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      name,
      email,
      password
      //registrationNumber
    } = req.body;
    try {
      const user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user.avatar = gravatar.url(email, {
        s: '200', //size
        r: 'pg', //rating
        d: 'mm' //default
      });

      user = new User({
        name,
        email,
        password,
        avatar
        // registrationNumber
      });

      const salt = bcrypt.genSalt(10);
      user.password = bcrypt.hash(password, salt);

      user.type = 2;

      await user.save();
      res.json({ msg: 'User successfully registered' });
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route  POST /api/users/applicant
// @desc   Register a Applicant
// @access Public
router.put(
  '/applicant',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Email is required')
      .not()
      .isEmpty(),
    check('password', 'Password is required').isLength({ min: 6 }),
    auth
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      const avatar = gravatar.url(email, {
        s: '200', //size
        r: 'pg', //rating
        d: 'mm' //default
      });

      user = new User({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      user.type = 3;

      await user.save();
      res.json({ msg: 'Applicant successfully registered' });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route  POST /api/users/student
// @desc   Register a Student
// @access Public
router.post(
  '/student',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Email is required')
      .not()
      .isEmpty(),
    check('password', 'Password is required')
      .not()
      .isEmpty()
    // check('registraionNumber', 'Registraion number is required')
    //   .not()
    //   .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      name,
      email,
      password
      //registrationNumber
    } = req.body;
    try {
      const user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists.' });
      }

      const avatar = gravatar.url(email, {
        s: '200', //size
        r: 'pg', //rating
        d: 'mm' //default
      });

      user = new User({
        name,
        email,
        password,
        avatar
        // registraionNumber
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      user.type = 4;

      await user.save();
      res.json({ msg: 'User has been created successfully' });
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route  GET /api/users/coordinators
// @desc   Get all Coordinators
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.find({ type: 1 }).select('-password');
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  GET /api/users/faculty
// @desc   Get all Faculty
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.find({ type: 2 }).select('-password');
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  GET /api/users/student
// @desc   Get all Student
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find({ type: 3 }).select('-password');
    res.json(users);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  PUT /api/users/password
// @desc   Change user password
// @access Private
router.put(
  '/password',
  [auth, check('password', 'Password is required').isLength({ min: 6 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { password } = req.body;
    try {
      const user = await User.findById(req.params.id);
      const salt = bcrypt.genSalt(10);
      user.password = bcrypt.hash(password, salt);

      await user.save();
      res.json(user);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route  GET /api/users/profile-picture/upload
// @desc   Upload a profile picture
// @access Private
router.put(
  '/profile-picture/upload',
  [
    auth,
    check('image', 'Image is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { image } = req.body;
    try {
      const user = await User.findById(req.params.id);

      user.avatar = image;

      await user.save();
      res.json(user);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route  GET /api/users/profile-picture/remove
// @desc   Remove a profile picture
// @access Private
router.put('/profile-picture/remove', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    user.avatar = gravatar.url(email, {
      s: '200', //size
      r: 'pg', //rating
      d: 'mm' //default
    });

    await user.save();
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
