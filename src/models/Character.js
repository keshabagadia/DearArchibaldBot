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