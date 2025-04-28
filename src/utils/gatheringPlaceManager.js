const GatheringPlace = require('../models/GatheringPlace'); // MongoDB model

module.exports = {
  async setPlace(guildId, data) {
    try {
      const existing = await GatheringPlace.findOne({ guildId });
      if (existing) {
        await GatheringPlace.updateOne({ guildId }, data);
      } else {
        await GatheringPlace.create({ guildId, ...data });
      }
    } catch (err) {
      console.error('Error setting gathering place:', err);
    }
  },

  async getPlace(guildId) {
    try {
      console.log(`Fetching gathering place for guildId: ${guildId}`);
      return await GatheringPlace.findOne({ guildId });
    } catch (err) {
      console.error('Error getting gathering place:', err);
      return null;
    }
  },

  async deletePlace(guildId) {
    try {
      await GatheringPlace.deleteOne({ guildId });
    } catch (err) {
      console.error('Error deleting gathering place:', err);
    }
  },

  async isPlaceActive(guildId) {
    try {
      const place = await GatheringPlace.findOne({ guildId });
      return !!place;
    } catch (err) {
      console.error('Error checking if place is active:', err);
      return false;
    }
  },
};