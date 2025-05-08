const sceneManager = require('../../utils/sceneManager');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = async (client, message) => {
    const channelId = message.channel.id;

    // Ignore messages sent by bots
    if (message.author.bot) return;

    // Check if a scene is active and if there is an existing prompt
    if (sceneManager.isSceneActive(channelId)) {
        const currentPrompt = sceneManager.getCurrentPrompt(channelId);

        if (!currentPrompt) {
            console.debug('No existing prompt found for this scene.');
            return;
        }

        // Send a button prompting the user to submit their response
        const actionRow = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(`submit_response_${message.id}`) // Unique ID for the button
                .setLabel('Submit Response')
                .setStyle(ButtonStyle.Primary)
        );

        await message.reply({
            content: 'Would you like to submit this response? You can edit it before submitting if needed.',
            components: [actionRow],
        });
    }
};