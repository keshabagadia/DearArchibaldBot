const prompts = require("../data/prompts.js");
const sceneManager = require("../utils/sceneManager.js");
const { MessageFlags } = require("discord.js");

module.exports = {
  customId: "roll_20",
  execute: async (interaction) => {
    const channelId = interaction.channel.id;

    // Fetch the current visitor from the scene manager
    const visitor = sceneManager.getCurrentVisitor(channelId);

    if (!visitor) {
      return await interaction.reply({
        content: "⚠️ No active visitor found for this scene.",
        flags: MessageFlags.Ephemeral,
      });
    }

    const roll = Math.floor(Math.random() * 20) + 1;

    const matchingPrompt = prompts.find((prompt) => prompt.id === roll);

    if (!matchingPrompt) {
      return await interaction.reply({
        content: "No prompt found for this roll.",
        flags: MessageFlags.Ephemeral,
      });
    }

    visitor.memory += matchingPrompt.memoryChange;

    await interaction.reply({
      content: `You rolled a **${roll}**!\n` +
               `${matchingPrompt.prompt}\n` +
               `Memory change: **${matchingPrompt.memoryChange}**\n` +
               `New memory: **${visitor.memory}**`,
    });
  },
};