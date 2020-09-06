const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Type.ObjectId,
    ref: 'user'
  },
  myDetails: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    cnic: {
      type: String
    },
    // Admin/ Coordinator/ Applicant/ Student
    status: {
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
      type: Boolean
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
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
