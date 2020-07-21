const mongoose = require('mongoose');

const ApplicantSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  fathersName: {
    type: String,
    required: true
  },
  cnic: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  // email: {
  //   type: String,
  //   required: true
  // },
  // password: {
  //   type: String,
  //   required: true
  // },
  dateOfBirth: {
    type: Date,
    required: true
  },
  domicile: {
    type: String
  },
  education: [
    {
      school: {
        type: String,
        required: true
      },
      college: {
        type: String,
        required: true
      },
      university: {
        type: String
      },
      percentageEquivalence: {
        olevelPercentage: {
          type: Number,
          required: true
        },
        alevlePercentage: {
          type: Number,
          required: true
        },
        matricMarks: {
          type: Number,
          required: true
        },
        fscMarks: {
          type: Number,
          required: true
        }
      },
      fieldOfStudy: {
        //pre-end/pre-med
        type: Number,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      description: {
        type: String
      },
      bachelorsCGPA: {
        type: String
      }
    }
  ],
  entryTestPercentage: {
    type: Number,
    required: true
  },
  appliedPrograms: [
    {
      program: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'programme'
      }
    }
  ],
  Date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Applicant = mongoose.module('applicant', ApplicantSchema);
