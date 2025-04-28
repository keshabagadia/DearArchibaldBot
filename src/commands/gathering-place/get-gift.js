const sceneManager = require('../../utils/sceneManager');
const openai = require('../../utils/openAI');

module.exports = {
  name: 'close-gathering-place',
  description: 'End the scene and get a present based on it.',
  callback: async (client, interaction) => {
    const channelId = interaction.channel.id;
    const messages = sceneManager.endScene(channelId);

    if (messages.length === 0) {
      return interaction.reply('No scene was active or there were no messages.');
    }

    await interaction.reply('Thinking...');

    const prompt = [
      {
        role: 'system',
        content: `You are Archibald, a friendly and mysterious crow. The user has shared a scene with you. You do not respond with a letter—just a gift. Reflect briefly on the emotional tone, imagery, or themes of their scene. Then, choose ONE of the following lenses at random to guide your response (do not mention the lens in your reply):
    
    1. A value you noticed in their scene  
    2. A limitation someone in the scene faced  
    3. An animal parable it reminds you of  
    4. A moment you personally resonated with  
    5. Something you quietly have in common with the characters  
    6. A myth the scene helps unravel (about control, perfection, or power)  
    7. A symbolic lesson tucked into the story
    
    Finally, describe the *gift* you would give the players—a small, curious, and symbolic object, ingredient, or piece of furniture for their gathering place. Your tone is thoughtful, a bit whimsical, and only slightly cryptic. Keep your reply under 300 words.`
      },
      {
        role: 'user',
        content: `Here is a log of a scene:\n\n${messages.join('\n')}\n\nWhat unique gift would you give the players at the end of this scene?`
      }
    ];
    

    try {
      const result = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: prompt,
      });

      const gift = result.choices[0].message.content;
      await interaction.followUp(`🎁 **Your gift:**\n${gift}`);
    } catch (err) {
      console.error('OpenAI error:', err);
      await interaction.followUp('Failed to generate a gift.');
    }
  },
};
