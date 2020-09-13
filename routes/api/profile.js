const express = require('express');
const router = express.Router();
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const auth = require('../../middleware/auth');
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

// @route  GET /api/profile/admin
// @desc   Get all profiles of admins
// @access Private
router.get('/admin', auth, async (req, res) => {
  try {
    const profiles = await Profile.find({ type: 0 }).populate('user', [
      'name',
      'email',
      'avatar'
    ]);
    res.json(profiles);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  GET /api/profile/coordinator
// @desc   Get all profiles of coordinators
// @access Private
router.get('/coordinator', auth, async (req, res) => {
  try {
    const profiles = await Profile.find({ type: 1 }).populate('user', [
      'name',
      'email',
      'avatar'
    ]);
    res.json(profiles);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  PUT /api/profile/my-details
// @desc   Add/Update users personal details
// @access Private
router.put(
  '/personal-details',
  [
    auth,
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Email is required')
      .not()
      .isEmpty(),
    // check('address', 'Address is required')
    //   .not()
    //   .isEmpty(),
    check('dateOfBirth', 'Date of birth is required')
      .not()
      .isEmpty(),
    check('description', 'Description is required')
      .not()
      .isEmpty(),
    check('cnic', 'CNIC is required').isLength({ min: 1, max: 13 }),
    check('type', 'Type of user is required').isInt()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      // address,
      dateOfBirth,
      description,
      cnic,
      type
    } = req.body;

    let personalDetails = {};

    personalDetails.name = name;
    personalDetails.email = email;
    // personalDetails.address = address;
    personalDetails.dateOfBirth = dateOfBirth;
    personalDetails.description = description;
    personalDetails.cnic = cnic;
    personalDetails.type = type;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: { personalDetails } },
          { new: true }
        );
      } else {
        profile = new Profile({ personalDetails });
      }

      if (profile.status < 1) {
        profile.status = 1;
      }

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

    let experienceDetails = {};

    experienceDetails.title = title;
    experienceDetails.company = company;
    experienceDetails.location = location;
    experienceDetails.from = from;
    experienceDetails.to = to;
    experienceDetails.current = current;
    experienceDetails.description = description;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: { profileFields } },
          { new: true }
        );
      } else {
        profile = new Profile({ experienceDetails });
      }

      if (profile.status < 2) {
        profile.status = 2;
      }

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

      if (profile.status < 3) {
        profile.status = 3;
      }

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
