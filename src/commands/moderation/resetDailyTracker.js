const { MessageFlags } = require('discord.js');
const dailyTracker = require('../../utils/dailyTracker');

module.exports = {
  name: 'reset-daily-tracker',
  description: 'Resets the daily tracker for all users.',

  callback: async (client, interaction) => {
    try {
      await dailyTracker.resetDailyTracker();
      await interaction.reply({
        content: "✅ The daily tracker has been manually reset for today.",
        flags: MessageFlags.Ephemeral, // Only visible to the user who clicked the button
      });
    } catch (error) {
      console.error('Error resetting daily tracker:', error);
      await interaction.reply({
        content: '❌ There was an error resetting the daily tracker. Please try again later.',
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};