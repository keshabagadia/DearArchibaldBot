const { MessageFlags } = require('discord.js');
const gatheringPlaceManager = require('../../utils/gatheringPlaceManager');
const { buildGatheringPlaceModal } = require('../../modals/gatheringPlaceModal');

module.exports = {
  name: 'edit-gathering-place',
  description: 'Edit your existing Gathering Place.',

  callback: async (client, interaction) => {
    try {
      const guildId = interaction.guild.id;
      const existingPlace = await gatheringPlaceManager.getPlace(guildId);

      if (!existingPlace) {
        return interaction.reply({
          content: '⚠️ No gathering place exists yet. Use `/create-gathering-place` first.',
          flags: MessageFlags.Ephemeral,
        });
      }

      const defaults = {
        type: existingPlace.type || '',
        location: existingPlace.location || '',
        purpose: existingPlace.purpose || '',
        aspect_1: existingPlace.description?.[0] || '',
        aspect_2: existingPlace.description?.[1] || '',
      };

      const modal = buildGatheringPlaceModal('editGatheringPlaceModal', 'Edit Gathering Place', defaults);
      await interaction.showModal(modal);
    } catch (error) {
      console.error('Error showing edit modal:', error);
    }
  },
};
