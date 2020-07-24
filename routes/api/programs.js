const express = require('express');
const router = express.Router();
const Programme = require('../../models/Programme');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

// @route  PUT /api/programs
// @desc   Add/Update applicants personal details
// @access Private
router.put(
  '/',
  [
    auth,
    check('name', 'Programs name is required')
      .not()
      .isEmpty(),
    check('description', 'Description is required')
      .not()
      .isEmpty(),
    check('yearly', 'Programs yearly duration is required')
      .not()
      .isEmpty(),
    check('semester', 'Programs semester duration is required')
      .not()
      .isEmpty(),
    check('feePerSemester', 'Fee per semester duration is required').isInt(),
    check(
      'minPercentageOfEquivalence',
      'Minimum percentage of equivalence'
    ).isInt(),
    check('categoryOfDegree', 'Category of degree is required').isInt()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      description,
      yearly,
      semester,
      feePerSemester,
      minPercentageOfEquivalence,
      categoryOfDegree
    } = req.body;

    let programFields = {};

    programFields.department = req.department.id;

    if (name) programFields.name = name;
    if (description) programFields.description = description;

    programFields.duration = {};

    if (yearly) programFields.duration.yearly = yearly;
    if (semester) programFields.duration.semester = semester;

    if (feePerSemester) programFields.feePerSemester = feePerSemester;

    programFields.criteria = {};

    if (minPercentageOfEquivalence)
      programFields.criteria.minPercentageOfEquivalence = minPercentageOfEquivalence;
    if (categoryOfDegree)
      programFields.criteria.categoryOfDegree = categoryOfDegree;

    try {
      let program = await Programme.findOne({ department: req.department.id });

      if (program) {
        program = await Program.findOneAndUpdate(
          { department: req.department.id },
          { $set: programFields },
          { new: true }
        );
        await program.save();
      }

      program = new Program(programFields);

      await program.save();
      res.json(program);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route  GET /api/programs
// @desc   Get all programs
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const programs = await Program.find();

    res.json(programs);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  GET /api/program/:id
// @desc   Get program by id
// @access Private
router.get('/:id', auth, async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);

    if (!program) {
      return res.status(400).json({ msg: 'Program not found' });
    }

    res.json(program);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  PUT /api/program/verify/:id
// @desc   Verify a program status
// @access Private
router.put('/verify/:id', auth, async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);

    // status true means the program is being offered
    program.status = true;

    res.json(program);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
