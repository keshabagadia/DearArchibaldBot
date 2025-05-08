const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const sceneManager = require("./sceneManager.js");

function getMemoryOutcome(interaction, memoryChange) {
  const visitor = sceneManager.getCurrentVisitor(interaction.channel.id);
  let resultMessage = '';
  if (memoryChange !== 0) {
    const changeType = memoryChange > 0 ? 'increased by' : 'decreased by';
    resultMessage = `\nThe visitor's memory has ${changeType} ${Math.abs(memoryChange)}.`;
  }
  resultMessage += `\n> Visitor's Memory: ${visitor.memory}`;
  let components = [];

  // Append additional information based on memory conditions
  if (visitor.memory <= 0) {
    resultMessage += `\n${visitor.badOutcome}`;
    components = [
      new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("get_gift")
          .setLabel("🎁 End Scene & Receive Gift")
          .setStyle(ButtonStyle.Primary)
      ),
    ];
  } else if (visitor.memory >= 6) {
    resultMessage += `\n${visitor.goodOutcome}`;
    components = [
      new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("get_gift")
          .setLabel("🎁 End Scene & Receive Gift")
          .setStyle(ButtonStyle.Primary)
      ),
    ];
  } else {
    resultMessage += `\n\nYou may roll again to continue the journey.`;
    components = [
      new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("roll_20")
          .setLabel("🎲 Roll 20")
          .setStyle(ButtonStyle.Primary)
      ),
    ];
  }

  return { resultMessage, components };
}

module.exports = { getMemoryOutcome };