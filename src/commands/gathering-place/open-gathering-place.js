const sceneManager = require("../../utils/sceneManager");
const gatheringPlaceManager = require("../../utils/gatheringPlaceManager");
const getRandomVisitor = require("../../utils/getRandomVisitor");
const dailyTracker = require("../../utils/dailyTracker");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags } = require("discord.js");

module.exports = {
  name: "open-gathering-place",
  description: "Gathering place is open for visitors!",
  testOnly: false,
  callback: async (client, interaction) => {
    const guildId = interaction.guild.id;
    const channelId = interaction.channel.id;
    const existingPlace = await gatheringPlaceManager.getPlace(guildId);

    if (!existingPlace) {
      return interaction.reply({
        content: "⚠️ No gathering place exists in this guild.",
        flags: MessageFlags.Ephemeral, // Ephemeral
      });
    }

    if (!await dailyTracker.canOpenGatheringPlace(guildId)) {
      return interaction.reply({
        content: "⚠️ The gathering place has already been opened today.",
        flags: MessageFlags.Ephemeral,
      });
    }

    const visitor = await getRandomVisitor(existingPlace); // Pass existingPlace to getRandomVisitor
    console.log(`Existing gathering place: ${existingPlace}`);

    if (!visitor) {
      return interaction.reply({
        content: "⚠️ No suitable visitor found for this gathering place.",
        flags: MessageFlags.Ephemeral,
      });
    }

    await dailyTracker.markGatheringPlaceOpened(guildId);

    if (sceneManager.isSceneActive(channelId)) {
      return interaction.reply({
        content: "A scene is already active in this channel.",
        flags: MessageFlags.Ephemeral,
      });
    }

    const randomScenario =
      visitor.optionalScenarios[
        Math.floor(Math.random() * visitor.optionalScenarios.length)
      ];

    sceneManager.startScene(channelId, visitor);
    await interaction.reply({
      content:
        `_You have a visitor._\n` +
        `**${visitor.title}**\n` +
        `${visitor.description}\n` +
        `If the interaction goes well, ${visitor.goodOutcome}\n` +
        `If the interaction goes poorly, ${visitor.badOutcome}\n` +
        `> Visitor's Memory: ${visitor.memory}\n`,
      components: [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("roll_20")
            .setLabel("🎲Roll 20")
            .setStyle(ButtonStyle.Primary)
        ),
      ],
    });
  },
};