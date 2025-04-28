const sceneManager = require('../../utils/sceneManager');
const gatheringPlaceManager = require('../../utils/gatheringPlaceManager');
const getRandomVisitor = require('../../utils/getRandomVisitor');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');


module.exports = {
  name: 'open-gathering-place',
  description: 'Gathering place is open for visitors!',
  testOnly: false,
  callback: async (client, interaction) => {
    const guildId = interaction.guild.id;
    const channelId = interaction.channel.id;
    const existingPlace = await gatheringPlaceManager.getPlace(guildId);
    const visitor = await getRandomVisitor(); // Fetch a random visitor from the database
    console.log(`Existing gathering place: ${existingPlace}`);
    if (!existingPlace) {
      return interaction.reply({
        content: '⚠️ No gathering place exists in this guild.',
        flags: 64, // Ephemeral
      });
    }

    if (sceneManager.isSceneActive(channelId)) {
      return interaction.reply({ content: 'A scene is already active in this channel.', ephemeral: true });
    }

    sceneManager.startScene(channelId);
      await interaction.reply({
        content:
        `_You have a visitor._\n` +
        `**${visitor.title}**\n` +  
        `${visitor.description}\n` +
        `> Memory: ${visitor.memory}\n`,
        components: [
          new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId('roll_20') // 👈 this MUST match your roll20.js `customId`
              .setLabel('🎲Roll 20')
              .setStyle(ButtonStyle.Primary)
            )
          ],
      });
    },
};
