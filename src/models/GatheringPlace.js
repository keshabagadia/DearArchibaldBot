/**
 * GatheringPlace Schema:
 * - gatheringPlaceId (number): Unique identifier for the gathering place.
 * - guildId (string): The Discord guild (server) ID where the gathering place belongs.
 * - xp (number): Experience points for the gathering place, used for leveling up (default: 0).
 * - level (number): The level of the gathering place, based on its XP (default: 0).
 * - type (string): "TYPE (This place is a...)" (e.g., "Cafe", "Park", "Library").
 * - location (string): "LOCATION (This place is at...)" (e.g., "A Sunny Wooded Clearing", "A Cliff by the Sea").
 * - name (string): The name of the gathering place (optional).
 * - purpose (string): "VIBE (This place exists to...)" (e.g., "to be a refuge from worldly expectations").
 * - description (array of strings): Aspects of the gathering place, such as its features or atmosphere (e.g., "Fireflies", "Mist", "Rain on the Windows").
 */

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
    default: 1,
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