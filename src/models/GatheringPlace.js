const { Schema, model } = require('mongoose');

const gatheringPlaceSchema = new Schema({
  gatheringPlaceId: {
    type: Number,
    required: true,
  },
  guildId: {
    type: String,
    required: true,
  },
  xp: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
    required: true,
    },
    location: {
        type: String,
        required: true,
    },
  name: {
    type: String,
    required: false,
  },
  purpose: {
    type: String,
    required: true,
  },
  description: {
    type: [String],
    required: false,
    },
});

module.exports = model('GatheringPlace', gatheringPlaceSchema);