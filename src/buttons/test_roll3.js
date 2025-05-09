const prompts = require("../data/prompts.js");

module.exports = {
  customId: "roll_3",
  execute: async (interaction) => {
    const roll = Math.floor(Math.random() * 3) + 1;

    const matchingPrompt = prompts.find((prompt) => prompt.id === roll);

    if (!matchingPrompt) {
      return await interaction.reply({
        content: "No prompt found for this roll.",
        flags: MessageFlags.Ephemeral,
      });
    }

    await interaction.reply({
      content: `You rolled a **${roll}**!\n` + `${matchingPrompt.prompt}`,
    });
  },
};
