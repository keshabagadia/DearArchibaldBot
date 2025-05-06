const rolledNumbers = new Map(); // guildId -> { rolled: Set<number>, lastOpened: Date }

function getToday() {
  return new Date().toDateString();
}

function resetDailyTracker(guildId) {
  rolledNumbers.set(guildId, { rolled: new Set(), lastOpened: null });
}

function resetDailyTrackerIfNeeded(guildId, today) {
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

    resetDailyTrackerIfNeeded(guildId, today);

    const guildData = rolledNumbers.get(guildId);

    const isNewRoll = !guildData.rolled.has(roll);
    if (isNewRoll) guildData.rolled.add(roll);

    return isNewRoll; // Return whether the roll was new
  },

  resetDailyTracker,

  resetDailyTrackerIfNeeded,

  canOpenGatheringPlace(guildId) {
    const today = getToday();

    resetDailyTrackerIfNeeded(guildId, today);

    const guildData = rolledNumbers.get(guildId);
    return guildData.lastOpened !== today;
  },

  markGatheringPlaceOpened(guildId) {
    const today = getToday();

    resetDailyTrackerIfNeeded(guildId, today);

    const guildData = rolledNumbers.get(guildId);
    guildData.lastOpened = today;
  },
};