const sceneManager = require("../utils/sceneManager.js");
const { handleRoll } = require("../utils/handleRoll.js");
const { MessageFlags } = require("discord.js");

module.exports = {
  customId: "roll_20",
  execute: async (interaction) => {
    const channelId = interaction.channel.id;
    const visitor = sceneManager.getCurrentVisitor(channelId);

    if (!visitor) {
      return interaction.reply({
        content: "⚠️ No active visitor found for this scene.",
        flags: MessageFlags.Ephemeral,
      });
    }

    // Call the reusable roll handler
    await handleRoll(interaction, visitor);
  },
};