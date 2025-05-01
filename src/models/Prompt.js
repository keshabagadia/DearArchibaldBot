const { Schema, model } = require('mongoose');

const promptSchema = new Schema({
  prompt: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  isTwist: {
    type: Boolean,
    default: false,
  },
  memoryChange: {
    type: Number,
    default: 0,
  },
});
