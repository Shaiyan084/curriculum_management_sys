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
    check('cnicNumber', 'Cnic number is required')
      .not()
      .isEmpty(),
    check('cnicFrontPicture', 'Cnic front picture is required')
      .not()
      .isEmpty(),
    check('cnicBackPicture', 'Cnic back picture is required')
      .not()
      .isEmpty(),
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
      cnicNumber,
      cnicFrontPicture,
      cnicBackPicture,
      address,
      phoneNumber,
      domicile
    } = req.body;

    let personalDetails = {};

    personalDetails.name = name;
    personalDetails.fatherName = fatherName;
    personalDetails.placeOfBirth = placeOfBirth;
    personalDetails.dateOfBirth = dateOfBirth;
    // personalDetails.cnicNumber = cnicNumber;
    // personalDetails.cnicFrontPicture = cnicFrontPicture;
    // personalDetails.cnicBackicture = cnicBackicture;
    personalDetails.address = address;
    personalDetails.phoneNumber = phoneNumber;
    personalDetails.domicile = domicile;

    const cnic = {
      number: cnicNumber,
      frontPicture: cnicFrontPicture,
      backPicture: cnicBackPicture
    };

    personalDetails.cnic = cnic;

    try {
      const applicant = await Applicant.findOneAndUpdate(
        { user: req.user.id },
        { $set: { personalDetails } },
        { new: true }
      );

      await applicant.save();
      res.json(applicant);
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
      const applicant = await Applicant.findOneAndUpdate(
        { user: req.user.id },
        { $set: { incomeDetails } },
        { new: true }
      );

      await applicant.save();
      res.json(applicant);
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
    check('type', 'Type of education is required').isInt(),
    check('institute', 'Institute is required')
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
    check('obtainedMarks', 'Obtained marks are required').isInt(),
    check('totalMarks', 'Total marks are required').isInt(),
    check('cgpa', 'CGPA is required').isInt(),
    check('picture', 'Picture is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      type,
      institute,
      fieldOfStudy,
      from,
      to,
      obtainedMarks,
      totalMarks,
      picture
    } = req.body;

    const secondaryEducationDetails = {
      type: type,
      institute: institute,
      fieldOfStudy: fieldOfStudy,
      from: from,
      to: to,
      obtainedMarks: obtainedMarks,
      totalMarks: totalMarks,
      picture: picture
    };

    educationDetails.secondaryEducationDetails = secondaryEducationDetails;

    const intermediateEducationDetails = {
      type: type,
      institute: institute,
      fieldOfStudy: fieldOfStudy,
      from: from,
      to: to,
      obtainedMarks: obtainedMarks,
      totalMarks: totalMarks,
      picture: picture
    };

    educationDetails.intermediateEducationDetails = intermediateEducationDetails;

    const bachelorEducationDetails = {
      type: type,
      institute: institute,
      fieldOfStudy: fieldOfStudy,
      from: from,
      to: to,
      cgpa: cgpa,
      picture: picture
    };

    educationDetails.bachelorEducationDetails = bachelorEducationDetails;

    try {
      const applicant = await Applicant.findOneAndUpdate(
        { user: req.user.id },
        { $set: { educationDetails } },
        { new: true }
      );

      await applicant.save();
      res.json(applicant);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
