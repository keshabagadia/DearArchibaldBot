module.exports = {
    name: 'start',
    description: 'Help player set up the game.',
    // devOnly: Boolean,
    testOnly: false,
    // options: Object[],
    // deleted: Boolean,
  
    callback: (client, interaction) => {
      const embed = {
        description: `You seem to sense what we crows remember: that life is
        unpredictable and beyond our full control, and that
        connections with others are more vital than the human myths
        of complete self-sufficiency or individual success.

        I need your help. To preserve this knowledge, we must build a
        gathering place where animals can rest and remember.

        ---
        Thank you for joining us on this journey.`,
        footer: {
          text: 'Use /create-gathering-place to set up your gathering place.',
        },
      };

      interaction.reply({ embeds: [embed] });
    },
  };