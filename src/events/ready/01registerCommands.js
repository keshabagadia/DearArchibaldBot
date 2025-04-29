const { testServer } = require('../../../config.json');
const areCommandsDifferent = require('../../utils/areCommandsDifferent');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client) => {
  try {
    const localCommands = getLocalCommands();

    // Get appropriate command manager based on testOnly flag
    const globalCommandManager = await getApplicationCommands(client);
    const guildCommandManager = await getApplicationCommands(client, testServer);

    const commandScopeCache = {
      global: await globalCommandManager.cache,
      guild: await guildCommandManager.cache,
    };

    const localCommandNames = {
      global: [],
      guild: [],
    };

    for (const localCommand of localCommands) {
      const { name, description, options, deleted, testOnly = false } = localCommand;

      const scope = testOnly ? 'guild' : 'global';
      const manager = scope === 'guild' ? guildCommandManager : globalCommandManager;
      const cache = commandScopeCache[scope];

      //console.log(`🔍 Command: "${name}" | testOnly: ${testOnly} | scope: ${scope}`);

      localCommandNames[scope].push(name);

      const existingCommand = cache.find(cmd => cmd.name === name);

      if (deleted) {
        if (existingCommand) {
          console.log(`🗑 Deleting "${name}" from ${scope}...`);
          await manager.delete(existingCommand.id);
          console.log(`✅ Deleted "${name}" from ${scope}`);
        } else {
          console.log(`⏩ "${name}" marked deleted, but not found in ${scope}`);
        }
        continue;
      }

      if (existingCommand) {
        if (areCommandsDifferent(existingCommand, localCommand)) {
          console.log(`🔁 Updating "${name}" in ${scope}...`);
          await manager.edit(existingCommand.id, {
            description,
            options,
          });
          console.log(`✅ Edited "${name}" in ${scope}`);
        } else {
          //console.log(`⏩ No changes for "${name}" in ${scope}`);
        }
      } else {
        console.log(`📦 Registering new command "${name}" in ${scope}...`);
        await manager.create({
          name,
          description,
          options,
        });
        console.log(`✅ Registered "${name}" in ${scope}`);
      }
    }

    // Remove orphaned remote commands in both global and test scope
    for (const scope of ['global', 'guild']) {
      const manager = scope === 'guild' ? guildCommandManager : globalCommandManager;
      const remoteCommands = commandScopeCache[scope];

      for (const remoteCommand of remoteCommands.values()) {
        const isStillLocal = localCommandNames[scope].includes(remoteCommand.name);
        const isHandledExplicitly = localCommands.some(cmd => cmd.name === remoteCommand.name && cmd.deleted);

        if (!isStillLocal && !isHandledExplicitly) {
          console.log(`🧹 Removing orphaned command "${remoteCommand.name}" from ${scope}...`);
          await manager.delete(remoteCommand.id);
          console.log(`✅ Removed orphaned command "${remoteCommand.name}" from ${scope}`);
        }
      }
    }
  } catch (error) {
    console.error(`❌ Error syncing commands: ${error}`);
  }
};
