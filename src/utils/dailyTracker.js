const rolledNumbers = new Map(); // guildId -> { rolled: Set<number>, lastOpened: Date }

function getToday() {
  return new Date().toDateString();
}

module.exports = {
  trackRoll(guildId, roll) {
    const today = getToday();

    this.resetDailyTrackerIfNeeded(guildId, today);

    const guildData = rolledNumbers.get(guildId);

    const isNewRoll = !guildData.rolled.has(roll);
    guildData.rolled.add(roll);

    return isNewRoll;
  },

  resetDailyTracker(guildId) {
    rolledNumbers.set(guildId, { rolled: new Set(), lastOpened: null });
  },

  resetDailyTrackerIfNeeded(guildId, today) {
    if (!rolledNumbers.has(guildId)) {
      this.resetDailyTracker(guildId);
    }

    const guildData = rolledNumbers.get(guildId);

    if (guildData.lastOpened !== today) {
      this.resetDailyTracker(guildId);
      guildData.lastOpened = today;
    }
  },

  canOpenGatheringPlace(guildId) {
    const today = getToday();

    this.resetDailyTrackerIfNeeded(guildId, today);

    const guildData = rolledNumbers.get(guildId);
    return guildData.lastOpened !== today;
  },

  markGatheringPlaceOpened(guildId) {
    const today = getToday();

    this.resetDailyTrackerIfNeeded(guildId, today);

    const guildData = rolledNumbers.get(guildId);
    guildData.lastOpened = today;
  },
};