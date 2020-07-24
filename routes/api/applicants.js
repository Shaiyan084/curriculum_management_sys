const express = require('express');
const router = express.Router();
const Applicant = require('../../models/Applicant');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Programme = require('../../models/Programme');

// @route  PUT /api/applicants/personal-details
// @desc   Add/Update applicants personal details
// @access Private
router.put(
  '/personal-detils',
  [
    auth,
    check('name', 'Name is required').not().isEmpty(),
    check('fathersName', "Father's name is required").not().isEmpty(),
    check('cnicNumber', 'Cnic number is required').not().isEmpty(),
    check('cnicFrontPicture', 'Cnic front picture is required').not().isEmpty(),
    check('cnicBackPicture', 'Cnic back picture is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty(),
    check('placeOfBirth', 'Place of birth is required').not().isEmpty(),
    check('dateOfBirth', 'Date of birth is required').not().isEmpty(),
    check('phoneNumber', 'Phone number is required').not().isEmpty(),
    check('domicile', 'Domicile is required').not().isEmpty(),
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
      domicile,
    } = req.body;

    let personalDetails = {};

    personalDetails.name = name;
    personalDetails.fatherName = fatherName;
    personalDetails.placeOfBirth = placeOfBirth;
    personalDetails.dateOfBirth = dateOfBirth;
    personalDetails.address = address;
    personalDetails.phoneNumber = phoneNumber;
    personalDetails.domicile = domicile;

    const cnic = {
      number: cnicNumber,
      frontPicture: cnicFrontPicture,
      backPicture: cnicBackPicture,
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

// @route  PUT /api/applicants/income-details
// @desc   Add/Update applicants income details
// @access Private
router.put(
  '/income-details',
  [
    auth,
    check('monthlyIncome', 'Monthly income is required').isInt(),
    check('minimumYearlyIncome', 'Minimum yearly income is required').isInt(),
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

// @route  PUT /api/applicants/education-details
// @desc   Add/Update applicants education details
// @access Private
router.put(
  '/education-details',
  [
    auth,
    check(
      'secondaryEducationType',
      'Secondary Education type of education is required'
    ).isInt(),
    check(
      'secondaryEducationInstitute',
      'Secondary Education institute is required'
    )
      .not()
      .isEmpty(),
    check(
      'secondaryEducationFieldOfStudy',
      'Secondary Education field of study is required'
    )
      .not()
      .isEmpty(),
    check('secondaryEducationFrom', 'Secondary Education from date is required')
      .not()
      .isEmpty(),
    check('secondaryEducationTo', 'Secondary Education to date is required')
      .not()
      .isEmpty(),
    check(
      'secondaryEducationObtainedMarks',
      'Secondary Education obtained marks are required'
    ).isInt(),
    check(
      'secondaryEducationTotalMarks',
      'Secondary Education total marks are required'
    ).isInt(),
    check(
      'secondaryEducationPicture',
      'Secondary Education picture is required'
    )
      .not()
      .isEmpty(),
    check(
      'intermediateEducationType',
      'Intermediate Education type of education is required'
    ).isInt(),
    check(
      'intermediateEducationInstitute',
      'Intermediate Education institute is required'
    )
      .not()
      .isEmpty(),
    check(
      'intermediateEducationFieldOfStudy',
      'Intermediate Education field of study is required'
    )
      .not()
      .isEmpty(),
    check(
      'intermediateEducationFrom',
      'Intermediate Education from date is required'
    )
      .not()
      .isEmpty(),
    check(
      'intermediateEducationTo',
      'Intermediate Education to date is required'
    )
      .not()
      .isEmpty(),
    check(
      'intermediateEducationObtainedMarks',
      'Intermediate Education obtained marks are required'
    ).isInt(),
    check(
      'intermediateEducationTotalMarks',
      'Intermediate Education total marks are required'
    ).isInt(),
    check(
      'intermediateEducationPicture',
      'Intermediate Education picture is required'
    )
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      secondaryEducationType,
      secondaryEducationInstitute,
      secondaryEducationFieldOfStudy,
      secondaryEducationFrom,
      secondaryEducationTo,
      secondaryEducationObtainedMarks,
      secondaryEducationTotalMarks,
      secondaryEducationPicture,
      intermediateEducationType,
      intermediateEducationInstitute,
      intermediateEducationFieldOfStudy,
      intermediateEducationFrom,
      intermediateEducationTo,
      intermediateEducationObtainedMarks,
      intermediateEducationTotalMarks,
      intermediateEducationPicture,
      bachelorEducationInstitute,
      bachelorEducationFieldOfStudy,
      bachelorEducationFrom,
      bachelorEducationTo,
      bachelorEducationPicture,
      cgpa,
    } = req.body;

    const educationDetails = {};

    const secondaryEducationDetails = {
      type: secondaryEducationType,
      institute: secondaryEducationInstitute,
      fieldOfStudy: secondaryEducationFieldOfStudy,
      from: secondaryEducationFrom,
      to: secondaryEducationTo,
      obtainedMarks: secondaryEducationObtainedMarks,
      totalMarks: secondaryEducationTotalMarks,
      picture: secondaryEducationPicture,
    };

    educationDetails.secondaryEducationDetails = secondaryEducationDetails;

    const intermediateEducationDetails = {
      type: intermediateEducationType,
      institute: intermediateEducationInstitute,
      fieldOfStudy: intermediateEducationFieldOfStudy,
      from: intermediateEducationFrom,
      to: intermediateEducationTo,
      obtainedMarks: intermediateEducationObtainedMarks,
      totalMarks: intermediateEducationTotalMarks,
      picture: intermediateEducationPicture,
    };

    educationDetails.intermediateEducationDetails = intermediateEducationDetails;

    let applicant = await Applicant.findOne({ user: req.user.id });

    // Add bachelor education details only if the applicant is applying for a Masters degree
    if (applicant.type === 1) {
      const bachelorEducationDetails = {
        institute: bachelorEducationInstitute,
        fieldOfStudy: bachelorEducationFieldOfStudy,
        from: bachelorEducationFrom,
        to: bachelorEducationTo,
        picture: bachelorEducationPicture,
        cgpa: cgpa,
      };

      educationDetails.bachelorEducationDetails = bachelorEducationDetails;
    }

    try {
      applicant = await Applicant.findOneAndUpdate(
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

// @route  PUT /api/applicants/apply/:id
// @desc   Apply for a program
// @access Private
router.put('/apply/:id', auth, async (req, res) => {
  try {
    const programme = await Programme.findById(req.params.id);

    if (!programme) {
      return res.status(400).json({ msg: 'Programme not found' });
    }

    const applicant = await Applicant.findOne({ user: req.user.id });

    if (
      applicant.appliedPrograms
        .map((programme) => programme.programme)
        .indexOf(req.params.id) !== -1
    ) {
      return res.status(400).json({ msg: 'Already applied for program' });
    }

    applicant.appliedPrograms.push({ programme: programme.id });

    await applicant.save();
    res.json(applicant);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  PUT /api/applicants/remove/:id
// @desc   Remove a program
// @access Private
router.put('/remove/:id', auth, async (req, res) => {
  try {
    const programme = await Programme.findById(req.params.id);

    if (!programme) {
      return res.status(400).json({ msg: 'Programme not found' });
    }

    const applicant = await Applicant.findOne({ user: req.user.id });

    const removeIndex = applicant.appliedPrograms
      .map((programme) => programme.programme)
      .indexOf(req.params.id);

    if (removeIndex === -1) {
      return res.status(400).json({ msg: 'Program already removed' });
    }

    applicant.appliedPrograms.splice(removeIndex, 1);

    await applicant.save();
    res.json(applicant);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
