const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Department = require('../../models/Department');

// @route  PUT /api/department
// @desc   Add/Update department
// @access Private
router.put(
  '/',
  [
    auth,
    check('name', 'Name of department is required')
      .not()
      .isEmpty(),
    check('description', 'Description of department is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, description } = req.body;

    let departmentFields = {};

    departmentFields.name = name;
    departmentFields.description = description;

    try {
      const department = await Department.findOneAndUpdate(
        { _id: req.params.id },
        { $set: departmentFields },
        { new: true }
      );

      await department.save();
      res.json(department);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route  GET /api/department
// @desc   Get all departments
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const departments = await Department.find();

    res.json(departments);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  GET /api/department/:id
// @desc   Get department by id
// @access Private
router.get('/:id', auth, async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(400).json({ msg: 'Department not found' });
    }

    res.json(department);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
