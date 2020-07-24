const mongoose = require('mongoose');

const DepartmentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // programs: {
  //   type: Number,
  //   required: true,
  //   default: 0
  // },
  // numberOfStudents: {
  //   type: Number,
  //   required: true
  // }
  description: {
    type: String,
    required: true
  }
});

module.exports = Department = mongoose.model('department', DepartmentSchema);
