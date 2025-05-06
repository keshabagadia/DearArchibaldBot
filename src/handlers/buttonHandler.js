const path = require('path');
const getAllFiles = require('../utils/getAllFiles');

module.exports = (client) => {
  const buttonFiles = getAllFiles(path.join(__dirname, '..', 'buttons'));

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;
    console.debug(`Button interaction received: ${interaction.customId}`);

    for (const file of buttonFiles) {
      const button = require(file);

      if (
        (typeof button.customId === 'string' && interaction.customId === button.customId) ||
        (button.customId instanceof RegExp && button.customId.test(interaction.customId))
      ) {
        console.debug(`Checking button: ${button.customId}`);
        try {
          await button.execute(interaction, client);
        } catch (error) {
          console.error(`Error executing button handler for ${interaction.customId}:`, error);
          await interaction.reply({
            content: '❌ An error occurred while processing this button.',
            ephemeral: true,
          });
        }
        break;
      }
    }
  });
};