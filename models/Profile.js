const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  personalDetails: {
    name: {
      type: String
    },
    email: {
      type: String
    },
    // address: {
    //   type: String
    // },
    dateOfBirth: {
      type: Date
    },
    description: {
      type: String
    },
    cnic: {
      type: Number
    },
    // Admin/ Coordinator/ Applicant/ Student
    type: {
      type: Number
    }
  },
  familyDetails: {
    familyMembers: {
      type: Number
    },
    parents: {
      type: Number
    },
    cnic: {
      type: String
    },
    phoneNumber: {
      type: Number
    },
    siblings: {
      type: Number
    },
    address: {
      type: String
    }
  },
  experienceDetails: {
    title: {
      type: String
    },
    company: {
      type: String
    },
    location: {
      type: String
    },
    from: {
      type: Date
    },
    to: {
      type: Date
    },
    current: {
      type: Boolean,
      default: false
    },
    description: {
      type: String
    }
  },
  educationDetails: {
    college: {
      type: String
    },
    university: {
      type: String
    },
    degree: {
      type: String
    },
    fieldOfStudy: {
      type: String
    },
    from: {
      type: Date
    },
    to: {
      type: Date
    },
    current: {
      type: Boolean
    },
    description: {
      type: String
    }
  },
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now()
  },
  status: {
    type: Number,
    default: 0
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
