const path = require('path');
const getAllFiles = require('../utils/getAllFiles');

module.exports = (client) => {
  const buttonFiles = getAllFiles(path.join(__dirname, '..', 'buttons'));

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    for (const file of buttonFiles) {
      const button = require(file);

      if (interaction.customId === button.customId) {
        await button.execute(interaction, client);
        break;
      }
    }
  });
};
