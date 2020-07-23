const mongoose = require('mongoose');

const ApplicantSchema = mongoose.Schema({
  // To keep track who is the actual user account associated with application object
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  // To keep track of what type of applicant the user is i.e. Bachelors or Masters
  type: {
    type: Number
  },
  personalDetails: {
    name: {
      type: String
    },
    fathersName: {
      type: String
    },
    // CNIC should remain like previous
    cnic: {
      number: {
        type: String
      },
      frontPicture: {
        type: String
      },
      backPicture: {
        type: String
      }
    },
    address: {
      type: String
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
      type: String
    },
    dateOfBirth: {
      type: Date
    },
    phoneNumber: {
      type: String
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
    // Here is the details of the secondary education
    secondaryEducationDetails: {
      type: {
        type: Number
      },
      institute: {
        type: String
      },
      fieldOfStudy: {
        type: String
      },
      from: {
        type: Date
      },
      to: {
        type: Date,
        default: Date.now()
      },
      obtainedMarks: {
        type: Number
      },
      totalMarks: {
        type: Number
      },
      picture: {
        type: String
      }
    },
    // Here is the details of the intermediate education
    intermediateEducationDetails: {
      type: {
        type: Number
      },
      institute: {
        type: String
      },
      fieldOfStudy: {
        type: String
      },
      from: {
        type: Date
      },
      to: {
        type: Date,
        default: Date.now()
      },
      obtainedMarks: {
        type: Number
      },
      totalMarks: {
        type: Number
      },
      picture: {
        type: String
      }
    },
    // Here is the details of the bachelor education
    bachelorEducationDetails: {
      institute: {
        type: String
      },
      fieldOfStudy: {
        type: String
      },
      from: {
        type: Date
      },
      to: {
        type: Date,
        default: Date.now()
      },
      cgpa: {
        type: Number
      },
      picture: {
        type: String
      }
    }
    // school: {
    //   type: String,
    //
    // },
    // college: {
    //   type: String,
    //
    // },
    // university: {
    //   type: String,
    // },
    // fieldOfStudy: {
    //   //pre-end/pre-med
    //   type: Number,
    //
    // },
    // from: {
    //   type: Date,
    //
    // },
    // to: {
    //   type: Date,
    // },
    // description: {
    //   type: String,
    // },
    // gradeDetails: {
    //   oLevelMarks: {
    //     type: Number,
    //
    //   },
    //   aLevelMarks: {
    //     type: Number,
    //
    //   },
    //   matricMarks: {
    //     type: Number,
    //
    //   },
    //   fscMarks: {
    //     type: Number,
    //
    //   },
    //   bachelorsCGPA: {
    //     type: String,
    //   },
    //   entryTestPercentage: {
    //     type: Number,
    //
    //   },
    //   ntsPercentage: {
    //     type: Number,
    //
    //   },
    //   picture: {
    //     type: String,
    //
    //   },
    //   totalMarks: {
    //     type: String,
    //
    //   },
    // },
  },
  // appliedPrograms: {
  //   program: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'programme'
  //   }
  // },
  timeStamp: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Applicant = mongoose.model('applicant', ApplicantSchema);
