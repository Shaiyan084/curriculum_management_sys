const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Admission = require('../../models/Admission');
const User = require('../../models/User');
const Applicant = require('../../models/Applicant');

// @route  GET /api/admissions
// @desc   Get all admission sessions
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const admission = await Admission.find();
    const sessions = admission[0].sessions;

    res.json(sessions);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  GET /api/admissions/current
// @desc   Get current admission sessions
// @access Public
router.get('/current', async (req, res) => {
  try {
    const admission = await Admission.find().populate(
      'sessions.meritList.applicantId',
      [
        'personalDetails.name',
        'personalDetails.email',
        'educationDetails.totalAggregate',
      ]
    );

    const session = admission[0].sessions[0];

    res.json(session);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  GET /api/admissions/:id
// @desc   Get admission sessions by id
// @access Private
router.get('/:id', auth, async (req, res) => {
  try {
    const admission = await Admission.find();
    const session = admission[0].sessions.filter(
      session => session._id.toString() === req.params.id
    )[0];

    res.json(session);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  POST /api/admissions/generate-merit-list
// @desc   Create a merit list
// @access Private
router.post('/generate-merit-list', auth, async (req, res) => {
  try {
    const admission = await Admission.find();
    const session = admission[0].sessions[0];

    const applicants = await Applicant.find();

    if (session.meritList.length === 0) {
      applicants.forEach(applicant => {
        session.meritList.push({ applicantId: applicant._id });
      });
    }

    await admission[0].save();

    res.json({ msg: 'Merit list has been generated' });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  POST /api/admissions
// @desc   Create a new admission session
// @access Private
router.post(
  '/create-admission-session',
  [
    auth,
    check('name', 'Name of session is required').not().isEmpty(),
    check('startDate', 'Start date is required').not().isEmpty(),
    check('endDate', 'End date is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, startDate, endDate } = req.body;

    try {
      const user = await User.findById(req.user.id);

      if (user.type !== 0) {
        return res.status(400).json({ msg: 'User not authorized' });
      }
      let admission = await Admission.find();

      if (admission.length === 0) {
        admission = new Admission();
      } else {
        admission = admission[0];
      }

      const newSession = {
        name,
        startDate,
        endDate,
      };

      if (
        admission.sessions
          .map(session => session.name)
          .indexOf(newSession.name) !== -1
      ) {
        return res.status(400).json({ msg: 'Session already exists' });
      }

      admission.sessions.push(newSession);

      await admission.save();
      res.json(admission);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route  PUT /api/admissions/enable-admission-session/:id
// @desc   Enable admission session by id
// @access Private
router.put(
  '/enable-admission-session/:id',
  [auth, check('status', 'Status is required').isBoolean()],
  async (req, res) => {
    try {
      const admission = await Admission.find();
      const session = admission[0].sessions.filter(
        session => session._id.toString() === req.params.id
      )[0];

      session.status = true;

      await admission[0].save();

      res.json(session);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route  PUT /api/admissions/disable-admission-session/:id
// @desc   Disable admission session by id
// @access Private
router.put(
  '/disable-admission-session/:id',
  [auth, check('status', 'Status is required').isBoolean()],
  async (req, res) => {
    try {
      const admission = await Admission.find();
      const session = admission[0].sessions.filter(
        session => session._id.toString() === req.params.id
      )[0];

      session.status = false;

      await admission[0].save();
      res.json(session);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route  PUT /api/admissions/:id
// @desc   Update admission sessions by id
// @access Private
router.put(
  '/:id',
  [
    auth,
    check('name', 'Name of session is required').not().isEmpty(),
    check('startDate', 'Start date is required').not().isEmpty(),
    check('endDate', 'End date is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, startDate, endDate } = req.body;

    try {
      const user = await User.findById(req.user.id);

      if (user.type !== 0) {
        return res.status(400).json({ msg: 'User not authorized' });
      }

      const admission = await Admission.find();
      admission[0].sessions.map(session => {
        if (session._id.toString() === req.params.id) {
          session.name = name;
          session.startDate = startDate;
          session.endDate = endDate;
        }
        return session;
      });

      const session = admission[0].sessions.filter(
        session => session._id.toString() === req.params.id
      )[0];

      await admission[0].save();

      res.json(session);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route  PUT /api/admissions/remove-admission-session/:id
// @desc   Remove admission session by id
// @access Private
router.delete('/remove-admission-session/:id', auth, async (req, res) => {
  try {
    const admission = await Admission.find();

    const removeIndex = admission[0].sessions
      .map(session => session._id.toString())
      .indexOf(req.params.id);

    admission[0].sessions.splice(removeIndex, 1);

    await admission[0].save();

    res.json({ msg: 'Admission session has been successfully removed' });
  } catch (err) {
    console.log(err.message);
    return res.json(500).send('Server Error');
  }
});

module.exports = router;
