const { PermissionsBitField, EmbedBuilder, ChannelType } = require('discord.js');

module.exports = async (client, guild) => {
  // Make sure the bot has permission to create channels
  if (!guild.members.me.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
    console.log(`Missing permission to create channels in ${guild.name}`);
    return;
  }

  // Create the channel
  try {
    const channel = await guild.channels.create({
      name: 'dear-archibald-prototype',
      type: ChannelType.GuildText,
      topic: 'Bot welcome and info channel',
      permissionOverwrites: [
        {
          id: guild.roles.everyone.id, // @everyone
          allow: [PermissionsBitField.Flags.ViewChannel],
        },
      ],
    });

    const embed = new EmbedBuilder()
    .setTitle("Welcome to Dear Archibald!")
    .setDescription("This is a low-barrier journaling RPG bot.")
    .setColor("Green")//ask Elaine for color palette
    .addFields(
        {name: "New here?", value: "To start playing, use /start. I will be right with you."},
        {name: "Commands:", value: "/start, /open-gathering-place"},
    )
    
    await channel.send({ embeds: [embed] });
    console.log(`Created channel and sent welcome embed in ${guild.name}`);
  } catch (err) {
    console.error(`Error creating channel in ${guild.name}:`, err);
  }
};
