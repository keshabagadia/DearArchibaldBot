const prompts = require("../data/prompts.js");
const sceneManager = require("../utils/sceneManager.js");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags } = require("discord.js");

module.exports = {
  customId: "reroll_20",
  execute: async (interaction) => {
    const channelId = interaction.channel.id;
    const visitor = sceneManager.getCurrentVisitor(channelId);

    if (!visitor) {
      return interaction.reply({
        content: "⚠️ No active visitor found for this scene.",
        flags: MessageFlags.Ephemeral,
      });
    }

    visitor.memory -= 1;

    const roll = Math.floor(Math.random() * 20) + 1;
    const matchingPrompt = prompts.find((prompt) => prompt.id === roll);

    if (!matchingPrompt) {
      return interaction.reply({
        content: "❌ No prompt found for this reroll.",
        flags: MessageFlags.Ephemeral,
      });
    }

    const response = `🔁 You rerolled and got a **${roll}**!\n` +
                     `${matchingPrompt.prompt}\n`;

    const components = [
      new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("reset_daily_tracker")
          .setLabel("Reset Daily Tracker")
          .setStyle(ButtonStyle.Danger)
      )
    ];

    if (visitor.memory > 1) {
      components.push(
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("reroll_20")
            .setLabel("🔄 Reroll (Spend 1 Memory)")
            .setStyle(ButtonStyle.Secondary)
        )
      );
    }

    await interaction.reply({
      content: response,
      components,
    });
  },
};
