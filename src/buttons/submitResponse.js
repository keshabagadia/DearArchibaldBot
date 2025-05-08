const { getMemoryOutcome } = require("../utils/getMemoryOutcome");
const sceneManager = require("../utils/sceneManager");
const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  MessageFlags,
} = require("discord.js");

module.exports = {
  customId: /^submit_response_\d+$/, // Expects buttons like "submit_response_<messageId>"
  execute: async (interaction) => {
    try {
      const channelId = interaction.channel.id;
      const messageId = interaction.customId.split("_").pop();

      const message = await interaction.channel.messages
        .fetch(messageId)
        .catch(() => null);

      if (!message) {
        return interaction.reply({
          content: "⚠️ Unable to find the original message.",
          flags: MessageFlags.Ephemeral,
        });
      }

      // Confirm active scene
      if (!sceneManager.isSceneActive(channelId)) {
        return interaction.reply({
          content: "⚠️ No active scene found for this channel.",
          flags: MessageFlags.Ephemeral,
        });
      }

      const visitor = sceneManager.getCurrentVisitor(channelId);
      const prompt = sceneManager.getCurrentPrompt(channelId);

      if (!visitor || !prompt) {
        return interaction.reply({
          content:
            "⚠️ Missing visitor or prompt data. Make sure you roll before submitting.",
          flags: MessageFlags.Ephemeral,
        });
      }

      // Save the message to the scene
      sceneManager.addMessage(channelId, {
        content: message.content,
        authorId: message.author.id,
        timestamp: message.createdTimestamp,
      });

      // Update visitor memory and clear the last prompt
      visitor.memory += prompt.memoryChange;
      sceneManager.setCurrentPrompt(channelId, null);

    //console.debug("Calling getMemoryOutcome...");
    const outcome = getMemoryOutcome(interaction, prompt.memoryChange);
    //console.debug("getMemoryOutcome result:", outcome);

    await interaction.reply({
      content: outcome.resultMessage,
      components: outcome.components,
    });
    } catch (error) {
      console.error("Error in submitResponse button handler:", error);
      try {
        await interaction.reply({
          content: "⚠️ An error occurred while processing your response.",
          flags: MessageFlags.Ephemeral,
        });
      } catch (replyError) {
        console.error("Error sending interaction reply:", replyError);
      }
    }
  },
};