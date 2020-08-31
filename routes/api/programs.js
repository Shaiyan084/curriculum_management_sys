const express = require('express');
const router = express.Router();
const Programme = require('../../models/Programme');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

// @route  POST /api/programs/undergraduate-programs
// @desc   Create an undergraduate program
// @access Private
router.post(
  '/undergraduate-program',
  [
    auth,
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('yearly', 'Yearly duration is required').isInt(),
    check('semester', 'Semester duration is required').isInt(),
    check('feePerSemester', 'Fee per semester is required').isInt(),
    check(
      'minPercentageOfEquivalence',
      'Minimum percentage of equivalence is required'
    ).isInt(),
    check('categoryOfDegree', 'Category of degree is required').isInt(),
    check('department', 'Department is required').not().isEmpty(),
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
      categoryOfDegree,
      department,
    } = req.body;

    let programFields = {};

    programFields.name = name;
    programFields.description = description;
    programFields.feePerSemester = feePerSemester;
    programFields.department = department;

    const duration = {
      yearly,
      semester,
    };

    const criteria = {
      minPercentageOfEquivalence,
      categoryOfDegree,
    };

    programFields.duration = duration;
    programFields.criteria = criteria;

    try {
      const program = new Programme(programFields);

      program.type = 0;

      await program.save();
      res.json(program);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route  POST /api/programs/graduate-programs
// @desc   Create an graduate program
// @access Private
router.post(
  '/graduate-program',
  [
    auth,
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('yearly', 'Yearly duration is required').isInt(),
    check('semester', 'Semester duration is required').isInt(),
    check('feePerSemester', 'Fee per semester is required').isInt(),
    check(
      'minPercentageOfEquivalence',
      'Minimum percentage of equivalence is required'
    ).isInt(),
    check('minCGPA', 'Minimum CGPA is required').isInt(),
    check('categoryOfDegree', 'Category of degree is required').isInt(),
    check('department', 'Department is required').not().isEmpty(),
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
      minCGPA,
      categoryOfDegree,
      department,
    } = req.body;

    let programFields = {};

    programFields.name = name;
    programFields.description = description;
    programFields.feePerSemester = feePerSemester;
    programFields.department = department;

    const duration = {
      yearly,
      semester,
    };

    const criteria = {
      minPercentageOfEquivalence,
      minCGPA,
      categoryOfDegree,
    };

    programFields.duration = duration;
    programFields.criteria = criteria;
    try {
      let program = new Programme(programFields);

      program.type = 1;

      await program.save();
      res.json(program);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route  PUT /api/programs/undergraduate-programs/:id
// @desc   Update a undergraduate-program
// @access Private
router.put(
  'undergraduate-program/:id',
  [
    auth,
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('yearly', 'Yearly duration is required').isInt(),
    check('semester', 'Semester duration is required').isInt(),
    check('feePerSemester', 'Fee per semester is required').isInt(),
    check(
      'minPercentageOfEquivalence',
      'Minimum percentage of equivalence is required'
    ).isInt(),
    check('categoryOfDegree', 'Category of degree is required').isInt(),
    check('department', 'Department is required').not().isEmpty(),
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
      categoryOfDegree,
      department,
    } = req.body;

    let programFields = {};

    programFields.name = name;
    programFields.description = description;
    programFields.feePerSemester = feePerSemester;
    programFields.department = department;

    const duration = {
      yearly,
      semester,
    };

    const criteria = {
      minPercentageOfEquivalence,
      categoryOfDegree,
    };

    programFields.duration = duration;
    programFields.criteria = criteria;

    try {
      const program = await Programme.findOneAndUpdate(
        { _id: req.params.id },
        { $set: programFields },
        { new: true }
      );

      res.json(program);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route  PUT /api/programs/undergraduate-programs/:id
// @desc   Update a undergraduate-program
// @access Private
router.put(
  '/graduate-program/:id',
  [
    auth,
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('yearly', 'Yearly duration is required').isInt(),
    check('semester', 'Semester duration is required').isInt(),
    check('feePerSemester', 'Fee per semester is required').isInt(),
    check(
      'minPercentageOfEquivalence',
      'Minimum percentage of equivalence is required'
    ).isInt(),
    check('minCGPA', 'Minimum CGPA is required').isInt(),
    check('categoryOfDegree', 'Category of degree is required').isInt(),
    check('department', 'Department is required').not().isEmpty(),
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
      minCGPA,
      categoryOfDegree,
      department,
    } = req.body;

    let programFields = {};

    programFields.name = name;
    programFields.description = description;
    programFields.feePerSemester = feePerSemester;
    programFields.department = department;

    const duration = {
      yearly,
      semester,
    };

    const criteria = {
      minPercentageOfEquivalence,
      minCGPA,
      categoryOfDegree,
    };

    programFields.duration = duration;
    programFields.criteria = criteria;
    try {
      const program = await Programme.findOneAndUpdate(
        { _id: req.params.id },
        { $set: programFields },
        { new: true }
      );

      res.json(program);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route  GET /api/programs/undergraduate-programs
// @desc   Get all undergraduate programs
// @access Private
router.get('/undergraduate-programs', auth, async (req, res) => {
  try {
    const programs = await Programme.find({ type: 0 }).populate('department', [
      'name',
    ]);

    res.json(programs);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  GET /api/programs/graduate-programs
// @desc   Get all graduate programs
// @access Private
router.get('/graduate-programs', auth, async (req, res) => {
  try {
    const programs = await Programme.find({ type: 1 }).populate('department', [
      'name',
    ]);

    res.json(programs);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  GET /api/programs/:id
// @desc   Get program by id
// @access Private
router.get('/:id', auth, async (req, res) => {
  try {
    const program = await Programme.findById(req.params.id);

    if (!program) {
      return res.status(400).json({ msg: 'Program not found' });
    }

    res.json(program);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  PUT /api/programs/status/:id
// @desc   Change program status
// @access Private
router.put(
  '/status/:id',
  [auth, check('status', 'Status is required').isBoolean()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { status } = req.body;

    try {
      const program = await Programme.findById(req.params.id);

      program.status = status;

      await program.save();
      res.json(program);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
