const { get } = require("mongoose");
const { getMemoryOutcome } = require("../utils/getMemoryOutcome");
const sceneManager = require("../utils/sceneManager");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags } = require("discord.js");

module.exports = {
  customId: "roll_6",
  execute: async (interaction) => {
    try {
      const channelId = interaction.channel.id;

      // Retrieve the current visitor from the scene manager
      const visitor = sceneManager.getCurrentVisitor(channelId);

      if (!visitor) {
        return interaction.reply({
          content: "⚠️ No active visitor found for this scene.",
          flags: MessageFlags.Ephemeral,
        });
      }

      // Roll a d6
      const roll = Math.floor(Math.random() * 6) + 1;
      let outcome = getMemoryOutcome(interaction, roll);
      // Update visitor memory based on the roll
      if (roll > visitor.memory) {
        visitor.memory += 1;
        sceneManager.setCurrentTwistRoll(channelId, 1);
        outcome = getMemoryOutcome(interaction, 1);
      } else {
        visitor.memory -= 1;
        sceneManager.setCurrentTwistRoll(channelId, -1);
        outcome = getMemoryOutcome(interaction, -1);
      }

      // Use the outcome to reply to the interaction
      await interaction.reply({
        content: `🎲You rolled a ${roll}.\n`+ outcome.resultMessage,
        components: outcome.components,
      });
    } catch (error) {
      console.error("Error in roll_6 button handler:", error);
      await interaction.reply({
        content: "❌ An error occurred while rolling the d6.",
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};