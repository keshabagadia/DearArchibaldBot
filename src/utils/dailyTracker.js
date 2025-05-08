const DailyTrackRecord = require('../models/DailyTrackRecord.js');

function getToday() {
  return new Date().toDateString();
}

async function getOrCreateDailyTracker(guildId) {
  let tracker = await DailyTrackRecord.findOne({ guildId });
  if (!tracker) {
    tracker = new DailyTrackRecord({ guildId });
    await tracker.save();
  }
  return tracker;
}

async function resetDailyTracker(guildId) {
  await DailyTrackRecord.findOneAndUpdate(
    {guildId},
    { rolled: [], lastOpened: null },
    { upsert: true}
  );
}

async function setDailyTrackerForGuild(guildId, today) {
  const tracker = await getOrCreateDailyTracker(guildId);
  if(tracker.lastOpened === today) return; // No need to update if already set  
  await resetDailyTracker(guildId); // Reset the tracker if it's a new day
}

module.exports = {
  async trackRoll(guildId, roll) {
    const today = getToday();

    await setDailyTrackerForGuild(guildId, today);
    const tracker = await getOrCreateDailyTracker(guildId);

    const isNewRoll = !tracker.rolled.includes(roll);
    if (isNewRoll) {
      tracker.rolled.push(roll);
      await tracker.save();
    }

    return isNewRoll; // Return whether the roll was new
  },

  resetDailyTracker,
  setDailyTrackerForGuild,

  async canOpenGatheringPlace(guildId) {
    const today = getToday();
    const tracker = await getOrCreateDailyTracker(guildId);
    // console.log(`Tracker for guild ${guildId}:`, tracker); // Debugging line
    return tracker.lastOpened !== today;
  },

  async markGatheringPlaceOpened(guildId) {
    const today = getToday();

    const tracker = await getOrCreateDailyTracker(guildId);
    tracker.lastOpened = today;
    await tracker.save();
  },
};