const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['quiz', 'assignment']
  },
  course: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);
