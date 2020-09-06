const express = require('express');
const router = express.Router();
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const auht = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

// @route  GET /api/profile/me
// @desc   Get user profile based on id
// @access Private
router.get('/:id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.id
    }).populate('user', ['name', 'email', 'avatar']);

    if (!profile) {
      return res
        .status(400)
        .json({ msg: 'Profile of this user does not exist' });
    }

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  PUT /api/profile/my-details
// @desc   Add/Update users personal details
// @access Private
router.put(
  '/my-details',
  [
    auth,
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Email is required')
      .not()
      .isEmpty(),
    check('address', 'Address is required')
      .not()
      .isEmpty(),
    check('description', 'Description is required')
      .not()
      .isEmpty(),
    check('cnic', 'CNIC is required')
      .not()
      .isEmpty(),
    check('status', 'Status is required').isInt()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, address, description, cnic, status } = req.body;

    let myDetails = {};

    myDetails.name = name;
    myDetails.email = email;
    myDetails.address = address;
    myDetails.description = description;
    myDetails.cnic = cnic;
    myDetails.status = status;

    try {
      const profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: { myDetails } },
        { new: true }
      );

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route  PUT /api/profile/experience-details
// @desc   Add/Update users experience details
// @access Private
router.put(
  '/experience-details',
  [
    auth,
    check('title', 'Title is required')
      .not()
      .isEmpty(),
    check('company', 'Company is required')
      .not()
      .isEmpty(),
    check('location', 'Location is required')
      .not()
      .isEmpty(),
    check('from', 'From is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    let profileFields = {};

    profileFields.title = title;
    profileFields.company = company;
    profileFields.location = location;
    profileFields.from = from;
    profileFields.to = to;
    profileFields.current = current;
    profileFields.description = description;

    try {
      const profile = await Profile.findByIdAndUpdate(
        { user: req.user.id },
        { $set: { profileFields } },
        { new: true }
      );

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route  PUT /api/profile/education-details
// @desc   Add/Update users education details
// @access Private
router.put(
  '/education-details',
  [
    auth,
    check('college', 'College is required')
      .not()
      .isEmpty(),
    check('university', 'University is required')
      .not()
      .isEmpty(),
    check('degree', 'Degree is required')
      .not()
      .isEmpty(),
    check('fieldOfStudy', 'FieldOfStudy is required')
      .not()
      .isEmpty(),
    check('from', 'From is required')
      .not()
      .isEmpty(),
    check('description', 'Description is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }

    const {
      college,
      university,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description
    } = req.body;

    let profileFields = {};

    profileFields.college = college;
    profileFields.university = university;
    profileFields.degree = degree;
    profileFields.fieldOfStudy = fieldOfStudy;
    profileFields.from = from;
    profileFields.to = to;
    profileFields.current = current;
    profileFields.description = description;
    try {
      const profile = await Profile.findByIdAndUpdate(
        { user: req.user.id },
        { $set: { profileFields } },
        { new: true }
      );

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

//@route  DELETE /api/profile/delete-profile/:id
//@desc   Delete user profile based on id
//@access Private
router.delete('/delete-profile/:id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOneAndRemove({ user: req.user.id });

    res.json({ msg: 'Profile has been successfully removed' });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
