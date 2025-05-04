const {
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder,
  } = require('discord.js');
  const Character = require('../../models/Character');
  const { buildCharacterModal } = require('../../modals/characterModal');

  module.exports = {
    name: 'create-character',
    description: 'Create your character via a form.',
  
    callback: async (client, interaction) => {
          try {
        const modal = buildCharacterModal('createCharacterModal', 'Create Character');
        await interaction.showModal(modal);
      } catch (error) {
        console.error('Error showing modal:', error);
      }
    },
  };
  