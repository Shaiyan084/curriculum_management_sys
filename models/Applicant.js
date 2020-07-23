const mongoose = require('mongoose');

const ApplicantSchema = mongoose.Schema({
  personalDetails: {
    name: {
      type: String,
      required: true
    },
    fathersName: {
      type: String,
      required: true
    },
    cnic: {
      number: {
        type: String,
        required: true
      },
      frontPicture: {
        type: String,
        required: true
      },
      backPicture: {
        type: String,
        required: true
      }
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
    placeOfBirth: {
      type: String,
      required: true
    },
    dateOfBirth: {
      type: Date,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    domicile: {
      type: String
    }
  },
  incomeDetails: {
    monthlyIncome: {
      type: Number
    },
    minimumYearlyIncome: {
      type: Number
    }
  },
  educationDetails: {
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
    gradeDetails: {
      oLevelMarks: {
        type: Number,
        required: true
      },
      aLevelMarks: {
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
      },
      bachelorsCGPA: {
        type: String
      },
      entryTestPercentage: {
        type: Number,
        required: true
      },
      ntsPercentage: {
        type: Number,
        required: true
      },
      picture: {
        type: String,
        required: true
      },
      totalMarks: {
        type: String,
        required: true
      }
    }
  },
  appliedPrograms: {
    program: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'programme'
    }
  },
  Date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Applicant = mongoose.model('applicant', ApplicantSchema);
