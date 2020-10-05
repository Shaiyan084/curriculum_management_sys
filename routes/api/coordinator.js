const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

// @route  GET /api/applicants/me
// @desc   Get current applicant details
// @access Private

module.exports = router;
