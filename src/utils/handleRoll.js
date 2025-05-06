const prompts = require("../data/prompts.js");
const sceneManager = require("../utils/sceneManager.js");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

async function handleRoll(interaction, visitor, deductMemory = false) {
  const channelId = interaction.channel.id;

  // Deduct memory if required
  if (deductMemory) {
    if (visitor.memory <= 0) {
      return interaction.reply({
        content: "⚠️ Not enough memory to reroll.",
        ephemeral: true,
      });
    }
    visitor.memory -= 1;
  }

  // Generate a random roll
  const roll = Math.floor(Math.random() * 20) + 1;
  const matchingPrompt = prompts.find((prompt) => prompt.id === roll);

  // Check if a matching prompt exists
  if (!matchingPrompt) {
    return interaction.reply({
      content: "⚠️ No prompt found for this roll.",
      ephemeral: true,
    });
  }

  // Save the prompt for the current scene
  sceneManager.setLastPrompt(channelId, matchingPrompt);

  // Prepare the response
  const response = `🎲 You rolled a **${roll}**!\n` +
                   `${matchingPrompt.prompt}\n` +
                   `> Visitor's Memory: ${visitor.memory}\n`;

  // Add buttons for further actions
  const actionRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("reset_daily_tracker")
      .setLabel("Reset Daily Tracker")
      .setStyle(ButtonStyle.Danger)
  );

  // Add a reroll button if the visitor has memory left
  if (visitor.memory > 0) {
    actionRow.addComponents(
      new ButtonBuilder()
        .setCustomId("reroll_20")
        .setLabel("🔄🎲 Reroll (Spend 1 Memory)")
        .setStyle(ButtonStyle.Secondary)
    );
  }

  await interaction.reply({
    content: response,
    components: [actionRow],
  });
}

module.exports = { handleRoll };