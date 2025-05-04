const { MessageFlags } = require('discord.js');
const gatheringPlaceManager = require('../../utils/gatheringPlaceManager');
const GatheringPlace = require('../../models/GatheringPlace');
const Character = require('../../models/Character');

module.exports = async (client, interaction) => {
  if (!interaction.isModalSubmit()) return;

  if (interaction.customId === 'createGatheringPlaceModal') {
    const guildID = interaction.guild.id;
    const existingPlace = await gatheringPlaceManager.getPlace(guildID);

    if (existingPlace) {
      await interaction.reply({
        content:
        `⚠️ A gathering place already exists in this channel.\n` +
        `You can use \`/edit-gathering-place\` to modify it.`,
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    try {
      const generateUniqueId = async () => {
        let id, exists = true;
        while (exists) {
          id = Math.floor(100000 + Math.random() * 900000);
          exists = await GatheringPlace.exists({ gatheringPlaceId: id });
        }
        return id;
      };

      const gatheringPlaceId = await generateUniqueId();
      
      const data = {
        gatheringPlaceId,
        guildId: guildID,
        xp: 0,
        level: 0,
        type: interaction.fields.getTextInputValue('type'),
        location: interaction.fields.getTextInputValue('location'),
        name: "",
        purpose: interaction.fields.getTextInputValue('purpose'),
        description: [
          interaction.fields.getTextInputValue('aspect_1'),
          interaction.fields.getTextInputValue('aspect_2')
        ],
      };

      await GatheringPlace.create(data);
      //gatheringPlaceManager.setPlace(guildID, data);

      await interaction.reply({
        content:
          `✅ **Gathering Place Created!**\n\n` +
          `**Type:** ${data.type}\n` +
          `**Location:** ${data.location}\n` +
          `**Name:** ${data.name || 'N/A'}\n` +
          `**Purpose:** ${data.purpose}\n` +
          `**Description:**\n${data.description.map((line) => `• ${line}`).join('\n')}\n\n` +
          `When you're ready, use \`/open-gathering-place\` to bring it to life.`,
        flags: MessageFlags.Ephemeral,
      });
      
    } catch (err) {
      console.error('Error handling creation modal:', err);
      if (!interaction.replied && !interaction.deferred) {
        await interaction.reply({
          content: 'Something went wrong creating the gathering place.',
          flags: MessageFlags.Ephemeral,
        });
      }
    }
  }
  if (interaction.customId === 'createCharacterModal') {
    const guildID = interaction.guild.id;
    const userID = interaction.user.id;

    try {
      const gatheringPlace = await gatheringPlaceManager.getPlace(guildID);
      if (!gatheringPlace) {
        return await interaction.reply({
          content: '⚠️ No gathering place found for this server. Please create one first using `/create-gathering-place`.',
          flags: MessageFlags.Ephemeral,
        });
      }

      const generateUniqueId = async () => {
        let id, exists = true;
        while (exists) {
          id = Math.floor(100000 + Math.random() * 900000);
          exists = await Character.exists({ characterId: id });
        }
        return id;
      };

      const characterId = await generateUniqueId();

      const data = {
        characterId,
        gatheringPlaceID: gatheringPlace.gatheringPlaceId, // auto-fetched
        guildId: guildID,
        userId: userID,
        name: interaction.fields.getTextInputValue('name'),
        mind: interaction.fields.getTextInputValue('mind'),
        body: interaction.fields.getTextInputValue('body'),
        strength: interaction.fields.getTextInputValue('strength'),
        flaw: interaction.fields.getTextInputValue('flaw'),
      };

      await Character.create(data);

      await interaction.reply({
        content:
          `✅ **Character Created!**\n\n` +
          `**Name:** ${data.name}\n` +
          `**Mind:** ${data.mind}\n` +
          `**Body:** ${data.body}\n` +
          `**Strength:** ${data.strength}\n` +
          `**Flaw:** ${data.flaw}`,
        flags: MessageFlags.Ephemeral,
      });

    } catch (err) {
      console.error('Error handling character creation modal:', err);
      if (!interaction.replied && !interaction.deferred) {
        await interaction.reply({
          content: 'Something went wrong creating the character.',
          flags: MessageFlags.Ephemeral,
        });
      }
    }
  }
};
