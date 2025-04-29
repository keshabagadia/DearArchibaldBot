const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require('discord.js');
const GatheringPlace = require('../../models/GatheringPlace');
const gatheringPlaceManager = require('../../utils/gatheringPlaceManager');
const { buildGatheringPlaceModal } = require('../../utils/gatheringPlaceForm');

module.exports = {
  name: 'create-gathering-place',
  description: 'Create a new gathering place via a form.',

  callback: async (client, interaction) => {
    const guildID = interaction.guild.id;
    const existingPlace = gatheringPlaceManager.getPlace(guildID);

    if (existingPlace) {
      await interaction.reply({
        content:
        `⚠️ A gathering place already exists in this channel.\n` +
        `You can use \`/edit-gathering-place\` to modify it.`,
        flags: 64,
      });
      return;
      }
      try {
        const modal = buildGatheringPlaceModal('createGatheringPlaceModal', 'Create Gathering Place');
        await interaction.showModal(modal);        
    } catch (error) {
      console.error('Error showing modal:', error);
      await interaction.reply({
        content: 'Something went wrong while showing the form. Please try again later.',
        flags: 64,
      });
    }
  },
};
