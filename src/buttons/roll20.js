const prompts = require("../data/prompts.js");
const sceneManager = require("../utils/sceneManager.js");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags } = require("discord.js");

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

    const roll = Math.floor(Math.random() * 20) + 1;
    const matchingPrompt = prompts.find((prompt) => prompt.id === roll);

    if (!matchingPrompt) {
      return interaction.reply({
        content: "⚠️ No prompt found for this roll.",
        flags: MessageFlags.Ephemeral,
      });
    }

    // Save prompt for later response
    sceneManager.setLastPrompt(channelId, matchingPrompt);

    const response = `🎲You rolled a **${roll}**!\n` +
                     `${matchingPrompt.prompt}\n`;

    const actionRow = new ActionRowBuilder();

    // Reset button
    actionRow.addComponents(
      new ButtonBuilder()
      .setCustomId("reset_daily_tracker")
      .setLabel("Reset Daily Tracker")
      .setStyle(ButtonStyle.Danger)
    );

    // Submit response button
    // actionRow.addComponents(
    //   new ButtonBuilder()
    //   .setCustomId("submit_response")
    //   .setLabel("✍️ Submit Response")
    //   .setStyle(ButtonStyle.Success)
    // );

    // Reroll button only if memory > 1
    if (visitor.memory > 0) {
      actionRow.addComponents(
      new ButtonBuilder()
        .setCustomId("reroll_20")
        .setLabel("🔄🎲 Reroll (Spend 1 Memory)")
        .setStyle(ButtonStyle.Secondary)
      );
    }

    const components = [actionRow];

    await interaction.reply({
      content: response,
      components,
    });
  },
};
