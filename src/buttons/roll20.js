const prompts = require("../data/prompts.js");

module.exports = {
  customId: "roll_20",
  execute: async (interaction) => {
    const roll = Math.floor(Math.random() * 20) + 1;

    const matchingPrompt = prompts.find((prompt) => prompt.id === roll);

    if (!matchingPrompt) {
      return await interaction.reply({
        content: "No prompt found for this roll.",
        flags: 64,
      });
    }

    await interaction.reply({
      content: `You rolled a **${roll}**!\n` + `${matchingPrompt.prompt}`,
    });
  },
};
