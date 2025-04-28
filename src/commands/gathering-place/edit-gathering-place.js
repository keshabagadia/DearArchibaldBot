const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const gatheringPlaceManager = require('../../utils/gatheringPlaceManager');

module.exports = {
  name: 'edit-gathering-place',
  description: 'Edit the current gathering place with a form.',
  
  callback: async (client, interaction) => {
    const guildID = interaction.guild.id;
    const place = gatheringPlaceManager.getPlace(guildID);

    if (!place) {
      return interaction.reply({ content: 'No gathering place is active in this channel.', ephemeral: true });
    }

    const modal = new ModalBuilder()
      .setCustomId('editGatheringPlaceModal')
      .setTitle('Edit Gathering Place');

    const inputs = [
      new TextInputBuilder()
        .setCustomId('type')
        .setLabel('Type')
        .setStyle(TextInputStyle.Short)
        .setValue(place.type || '')
        .setRequired(true),

      new TextInputBuilder()
        .setCustomId('location')
        .setLabel('Location')
        .setStyle(TextInputStyle.Short)
        .setValue(place.location || '')
        .setRequired(true),

      new TextInputBuilder()
        .setCustomId('name')
        .setLabel('Name (optional)')
        .setStyle(TextInputStyle.Short)
        .setValue(place.name || '')
        .setRequired(false),

      new TextInputBuilder()
        .setCustomId('purpose')
        .setLabel('Purpose')
        .setStyle(TextInputStyle.Short)
        .setValue(place.purpose || '')
        .setRequired(true),

      new TextInputBuilder()
        .setCustomId('description')
        .setLabel('Description (single string or \\n-separated)')
        .setStyle(TextInputStyle.Paragraph)
        .setValue((place.description || []).join('\n'))
        .setRequired(true),
    ];

    const rows = inputs.map(input => new ActionRowBuilder().addComponents(input));
    modal.addComponents(...rows);

    await interaction.showModal(modal);
  }
};
