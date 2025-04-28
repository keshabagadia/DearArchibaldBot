const gatheringPlaceManager = require('../../utils/gatheringPlaceManager');
const GatheringPlace = require('../../models/GatheringPlace');

module.exports = async (client, interaction) => {
  if (!interaction.isModalSubmit()) return;

  if (interaction.customId === 'editGatheringPlaceModal') {
    try {
      const guildID = interaction.guild.id;

      const updatedData = {
        type: interaction.fields.getTextInputValue('type'),
        location: interaction.fields.getTextInputValue('location'),
        name: interaction.fields.getTextInputValue('name') || undefined,
        purpose: interaction.fields.getTextInputValue('purpose'),
        description: interaction.fields.getTextInputValue('description').split('\n'),
      };

      const updated = gatheringPlaceManager.updatePlace(guildID, updatedData);

      await GatheringPlace.updateOne(
        { gatheringPlaceId: updated.gatheringPlaceId, guildId: interaction.guild.id },
        { $set: updatedData }
      );

      await interaction.reply({
        content: '✅ Gathering place updated!',
        flags: 64,
      });
    } catch (err) {
      console.error('Error handling modal:', err);
      await interaction.reply({
        content: 'Something went wrong updating the place.',
        flags: 64,
      });
    }
  }

  if (interaction.customId === 'createGatheringPlaceModal') {
    try {
      const generateUniqueId = async () => {
        let id, exists = true;
        while (exists) {
          id = Math.floor(100000 + Math.random() * 900000);
          exists = await GatheringPlace.exists({ gatheringPlaceId: id });
        }
        return id;
      };

      const gatheringPlaceId = await generateUniqueId();
      const guildID = interaction.guild.id;

      const data = {
        gatheringPlaceId,
        guildId: guildID,
        xp: 0,
        level: 0,
        type: interaction.fields.getTextInputValue('type'),
        location: interaction.fields.getTextInputValue('location'),
        name: "",
        purpose: interaction.fields.getTextInputValue('purpose'),
        description: [
          interaction.fields.getTextInputValue('aspect_1'),
          interaction.fields.getTextInputValue('aspect_2')
        ],
      };

      await GatheringPlace.create(data);
      gatheringPlaceManager.setPlace(channelId, data);

      await interaction.reply({
        content:
          `✅ **Gathering Place Created!**\n\n` +
          `**Type:** ${data.type}\n` +
          `**Location:** ${data.location}\n` +
          `**Name:** ${data.name || 'N/A'}\n` +
          `**Purpose:** ${data.purpose}\n` +
          `**Description:**\n${data.description.map((line) => `• ${line}`).join('\n')}\n\n` +
          `When you're ready, use \`/open-gathering-place\` to bring it to life.`,
        flags: 64,
      });
      
    } catch (err) {
      console.error('Error handling creation modal:', err);
      await interaction.reply({
        content: 'Something went wrong creating the gathering place.',
        flags: 64,
      });
    }
  }
};
