const { Schema, model } = require('mongoose');

const dailyTrackRecordSchema = new Schema({
  guildId: { type: String, required: true, unique: true },
  rolled: { type: [Number], default: [] },
  lastOpened: { type: String, default: null }, // store as .toDateString() format
});

module.exports = model('DailyTrackRecord', dailyTrackRecordSchema);
