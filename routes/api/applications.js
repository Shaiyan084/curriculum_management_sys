const express = require('express');
const router = express.Router();
const Applicant = require('../../models/Applicant');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

// @route  PUT /api/applications
// @desc   Add/Update applicants personal details
// @access Private
router.put(
  '/personal-detils',
  [
    auth,
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('fathersName', "Father's name is required")
      .not()
      .isEmpty(),
    check('cnic', 'CNIC is required').isJSON(),
    check('address', 'Address is required')
      .not()
      .isEmpty(),
    check('placeOfBirth', 'Place of birth is required')
      .not()
      .isEmpty(),
    check('dateOfBirth', 'Date of birth is required')
      .not()
      .isEmpty(),
    check('phoneNumber', 'Phone number is required')
      .not()
      .isEmpty(),
    check('domicile', 'Domicile is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      name,
      fatherName,
      dateOfBirth,
      placeOfBirth,
      cnic,
      address,
      phoneNumber,
      domicile
    } = req.body;

    let personalDetails = {};

    personalDetails.name = name;
    personalDetails.fatherName = fatherName;
    personalDetails.placeOfBirth = placeOfBirth;
    personalDetails.dateOfBirth = dateOfBirth;
    personalDetails.cnic = cnic;
    personalDetails.address = address;
    personalDetails.phoneNumber = phoneNumber;
    personalDetails.domicile = domicile;

    try {
      const application = await Applicant.findOneAndUpdate(
        { user: req.user.id },
        { $set: { personalDetails } },
        { new: true }
      );

      await application.save();
      res.json(application);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route  PUT /api/applications
// @desc   Add/Update applicants income details
// @access Private
router.put(
  '/income-details',
  [
    auth,
    check('monthlyIncome', 'Monthly income is required').isInt(),
    check('minimumYearlyIncome', 'Minimum yearly income is required').isInt()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { monthlyIncome, MinimumYearlyIncome } = req.body;

    let incomeDetails = {};

    incomeDetails.monthlyIncome = monthlyIncome;
    incomeDetails.minimumYearlyIncome = MinimumYearlyIncome;

    try {
      const application = await Applicant.findOneAndUpdate(
        { user: req.user.id },
        { $set: { incomeDetails } },
        { new: true }
      );

      await application.save();
      res.json(application);
    } catch (err) {
      console.log(err.message);
      return res.status(400).send('Server Error');
    }
  }
);

// @route  PUT /api/applications
// @desc   Add/Update applicants education details
// @access Private
router.put(
  '/education-details',
  [
    auth,
    check('school', 'School is required')
      .not()
      .isEmpty(),
    check('college', 'College is required')
      .not()
      .isEmpty(),
    check('university', 'University is required')
      .not()
      .isEmpty(),
    check('fieldOfStudy', 'Field of study is required')
      .not()
      .isEmpty(),
    check('from', 'From date is required')
      .not()
      .isEmpty(),
    check('to', 'To date is required')
      .not()
      .isEmpty(),
    check('description', 'Description is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      school,
      college,
      university,
      fieldOfStudy,
      from,
      to,
      description
    } = req.body;

    let educationDetails = {};

    educationDetails.school = school;
    educationDetails.college = college;
    educationDetails.university = university;
    educationDetails.fieldOfStudy = fieldOfStudy;
    educationDetails.from = from;
    educationDetails.to = to;
    educationDetails.description = description;

    try {
      const application = await Application.findOneAndUpdate(
        { user: req.user.id },
        { $set: { educationDetails } },
        { new: true }
      );

      await application.save();
      res.json(application);
    } catch (err) {
      console.log(err.message);
      return res.status(400).send('Server Error');
    }
  }
);

module.exports = router;
