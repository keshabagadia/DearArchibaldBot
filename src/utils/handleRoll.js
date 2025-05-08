const prompts = require("../data/prompts.js");
const sceneManager = require("../utils/sceneManager.js");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags } = require("discord.js");
const { trackRoll } = require("./dailyTracker.js");

async function handleRoll(interaction, visitor, deductMemory = false) {
  const channelId = interaction.channel.id;

  if (deductMemory) {
    if (visitor.memory <= 0) {
      return interaction.reply({
        content: "⚠️ Not enough memory to reroll.",
        flags: MessageFlags.Ephemeral,
      });
    }
    visitor.memory -= 1;
  }

  const roll = Math.floor(Math.random() * 20) + 1;
  const isNewPrompt = await trackRoll(interaction.guild.id, roll);
  const promptId = isNewPrompt ? roll : roll + 100;
  const prompt = prompts.find((p) => p.id === promptId);

  if (!prompt) {
    return interaction.reply({
      content: "⚠️ No prompt found for this roll.",
      flags: MessageFlags.Ephemeral,
    });
  }

  sceneManager.setCurrentPrompt(channelId, isNewPrompt ? prompt : null);
  sceneManager.setCurrentTwistRoll(channelId, 0);

  const twistNote = isNewPrompt ? "" : "There has been a twist. ";
  const response = `🎲 You rolled a **${roll}**${isNewPrompt ? "" : " again"}.\n${twistNote}${prompt.prompt}\n> Visitor's Memory: ${visitor.memory}`;

  const buttons = [];
  if (isNewPrompt && visitor.memory > 1) {
    buttons.push(
      new ButtonBuilder()
        .setCustomId("reroll_20")
        .setLabel("🔄🎲 Reroll (Spend 1 Memory)")
        .setStyle(ButtonStyle.Secondary)
    );
  } else if (!isNewPrompt) {
    buttons.push(
      new ButtonBuilder()
        .setCustomId("roll_6")
        .setLabel("🎲 Roll 6")
        .setStyle(ButtonStyle.Primary)
    );
  }

  const replyOptions = { content: response };
  if (buttons.length > 0) {
    replyOptions.components = [new ActionRowBuilder().addComponents(buttons)];
  }

  return interaction.reply(replyOptions);
}

module.exports = { handleRoll };
