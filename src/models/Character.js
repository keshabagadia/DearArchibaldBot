/**
 * Character Schema:
 * - characterId (number): Unique identifier for the character.
 * - gatheringPlaceID (number): Identifier for the gathering place the character is associated with.
 * - guildId (string): The Discord guild (server) ID where the character belongs.
 * - userId (string): The Discord user ID of the character's owner.
 * - name (string): "YOUR NAME & SPECIES"(e.g., "Pip the Finch").
 * - mind (string): "MIND (ONE TRAIT)" (e.g., "Wise", "Absent-Minded", "Witty").
 * - body (string): "BODY (ONE TRAIT)" (e.g., "Agile", "Furry", "Poor Constitution").
 * - strength (string): "EDGE - WHAT IS ONE STRENGTH?" (e.g., "Acrobatics", "Potion-Making", "Good Nose").
 * - flaw (string): "DEPTH - WHAT IS ONE FLAW?" (e.g., "Clumsy", "Perfectionistic", "Overworked").
 */

const { Schema, model } = require('mongoose');

const characterSchema = new Schema({
characterId: {
    type: Number,
    required: true,
},
gatheringPlaceID: {
    type: Number,
    required: true,
},
guildId: {
    type: String,
    required: true,
},
userId: {
    type: String,
    required: true,
},
name: {
    type: String,
    required: true,
},
mind: {
    type: String,
    required: true,
},
body: {
    type: String,
    required: true,
},
strength: {
    type: String,
    required: true,
},
flaw: {
    type: String,
    required: true,
},
});

module.exports = model('Character', characterSchema);