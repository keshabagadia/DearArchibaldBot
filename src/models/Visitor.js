const { Schema, model } = require('mongoose');

const visitorSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  optionalScenarios: {
    type: [String],
    required: false,
    default: [],
  },
  memory: {
    type: Number,
    required: true, 
    default: 1,
  },
});

module.exports = model('Visitor', visitorSchema);