const DailyTrackRecord = require('../models/DailyTrackRecord.js');
const rolledNumbers = new Map(); // guildId -> { rolled: Set<number>, lastOpened: Date }

function getToday() {
  return new Date().toDateString();
}

function resetDailyTracker(guildId) {
  rolledNumbers.set(guildId, { rolled: new Set(), lastOpened: null });
}

function setDailyTrackerForGuild(guildId, today) {
  if (!rolledNumbers.has(guildId)) {
    resetDailyTracker(guildId);
  }

  const guildData = rolledNumbers.get(guildId);

  if (guildData.lastOpened !== today) {
    resetDailyTracker(guildId);
    guildData.lastOpened = today;
  }
}

module.exports = {
  trackRoll(guildId, roll) {
    const today = getToday();

    setDailyTrackerForGuild(guildId, today);

    const guildData = rolledNumbers.get(guildId);

    const isNewRoll = !guildData.rolled.has(roll);
    if (isNewRoll) guildData.rolled.add(roll);

    return isNewRoll; // Return whether the roll was new
  },

  resetDailyTracker,

  resetDailyTrackerIfNeeded: setDailyTrackerForGuild,

  canOpenGatheringPlace(guildId) {
    const today = getToday();

    setDailyTrackerForGuild(guildId, today);//Ensure if a daily tracker exists first

    const guildData = rolledNumbers.get(guildId);
    return guildData.lastOpened !== today;
  },

  markGatheringPlaceOpened(guildId) {
    const today = getToday();

    setDailyTrackerForGuild(guildId, today);

    const guildData = rolledNumbers.get(guildId);
    guildData.lastOpened = today;
  },
};