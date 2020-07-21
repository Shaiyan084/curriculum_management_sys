const mongoose = require('mongoose');

const ProgrammeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    yearly: {
      type: Number,
      default: 0
    },
    semester: {
      type: Number,
      default: 0
    }
  },
  feePerSemester: {
    type: Number,
    required: true
  },
  criteria: {
    minPercentageOfEquivalence: {
      type: Number
    },
    categoryOfDegree: {
      type: Number
    }
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'department'
  }
});

module.exports = Programme = mongoose.modle('programme', ProgrammeSchema);
