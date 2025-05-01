const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

function buildCharacterModal(customId, title, defaults = {}) {
  const {
    name = '',
    mind = '',
    body = '',
    strength = '',
    flaw = '',
  } = defaults;

  const inputs = [
    {
      id: 'name',
      label: 'YOUR NAME & SPECIES',
      placeholder: 'Pip the Finch',
      style: TextInputStyle.Short,
      value: name,
      required: true
    },
    {
      id: 'mind',
      label: 'MIND (ONE TRAIT)',
      placeholder: 'Wise, Absent-Minded, Witty',
      style: TextInputStyle.Short,
      value: mind,
      required: true
    },
    {
      id: 'body',
      label: 'BODY (ONE TRAIT)',
      placeholder: 'Agile, Furry, Poor Constitution',
      style: TextInputStyle.Short,
      value: body,
      required: true
    },
    {
      id: 'strength',
      label: 'EDGE - WHAT IS ONE STRENGTH?',
      placeholder: 'Acrobatics, Potion-Making, Good Nose',
      style: TextInputStyle.Short,
      value: strength,
      required: true
    },
    {
      id: 'flaw',
      label: 'DEPTH - WHAT IS ONE FLAW?',
      placeholder: 'Clumsy, Perfectionistic, Overworked',
      style: TextInputStyle.Short,
      value: flaw,
      required: true
    }
  ];

  const modal = new ModalBuilder().setCustomId(customId).setTitle(title);
  inputs.forEach(input => {
    const field = new TextInputBuilder()
      .setCustomId(input.id)
      .setLabel(input.label)
      .setPlaceholder(input.placeholder)
      .setStyle(input.style)
      .setValue(input.value)
      .setRequired(input.required);
    modal.addComponents(new ActionRowBuilder().addComponents(field));
  });

  return modal;
}

module.exports = { buildCharacterModal };
