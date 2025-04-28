module.exports = async (client, guildId) => {
    if (guildId) {
      const guild = await client.guilds.fetch(guildId);
      const cache = await guild.commands.fetch();
  
      return {
        cache,
        create: (data) => guild.commands.create(data),
        edit: (id, data) => guild.commands.edit(id, data),
        delete: (id) => guild.commands.delete(id),
      };
    }
  
    const cache = await client.application.commands.fetch();
  
    return {
      cache,
      create: (data) => client.application.commands.create(data),
      edit: (id, data) => client.application.commands.edit(id, data),
      delete: (id) => client.application.commands.delete(id),
    };
  };
  