const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require('discord.js');
const GatheringPlace = require('../../models/GatheringPlace');
const gatheringPlaceManager = require('../../utils/gatheringPlaceManager');
const { buildGatheringPlaceModal } = require('../../utils/gatheringPlaceModal');
const { debug } = require('openai/core.mjs');

module.exports = {
  name: 'create-gathering-place',
  description: 'Create a new gathering place via a form.',

  callback: async (client, interaction) => {
        try {
      const modal = buildGatheringPlaceModal('createGatheringPlaceModal', 'Create Gathering Place');
      await interaction.showModal(modal);
    } catch (error) {
      console.error('Error showing modal:', error);
    }
  },
};
