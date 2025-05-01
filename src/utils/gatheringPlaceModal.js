const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

function buildGatheringPlaceModal(customId, title, defaults = {}) {
  const {
    type = '',
    location = '',
    purpose = '',
    aspect_1 = '',
    aspect_2 = '',
  } = defaults;

  const inputs = [
    {
      id: 'type',
      label: 'TYPE (This place is a...)',
      placeholder: 'Cafe, Park, Library, etc.',
      style: TextInputStyle.Short,
      value: type,
      required: true
    },
    {
      id: 'location',
      label: 'LOCATION (This place is at...)',
      placeholder: 'A Sunny Wooded Clearing, A Cliff by the Sea, etc.',
      style: TextInputStyle.Short,
      value: location,
      required: true
    },
    {
      id: 'aspect_1',
      label: 'ONE ASPECT',
      placeholder: 'Fireflies, Mist, Rain on the Windows, etc.',
      style: TextInputStyle.Short,
      value: aspect_1,
      required: true
    },
    {
      id: 'aspect_2',
      label: 'ANOTHER ASPECT',
      placeholder: 'Fog, A Waterfall, A Bright Garden, etc.',
      style: TextInputStyle.Short,
      value: aspect_2,
      required: true
    },
    {
      id: 'purpose',
      label: 'VIBE (This place exists to...)',
      placeholder: 'to be a refuge from worldly expectations...',
      style: TextInputStyle.Paragraph,
      value: purpose,
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

module.exports = { buildGatheringPlaceModal };
