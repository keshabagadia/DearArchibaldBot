const dailyTracker = require("../utils/dailyTracker");
const { MessageFlags } = require("discord.js");

module.exports = {
  customId: "reset_daily_tracker",
  execute: async (interaction) => {
    const guildId = interaction.guild.id;

    dailyTracker.resetDailyTracker(guildId);

    await interaction.reply({
      content: "✅ The daily tracker has been manually reset for today.",
      flags: MessageFlags.Ephemeral, // Only visible to the user who clicked the button
    });
  },
};