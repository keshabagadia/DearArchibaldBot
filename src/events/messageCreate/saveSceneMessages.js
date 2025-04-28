const sceneManager = require('../../utils/sceneManager');

module.exports = async (client, message) => {
    const channelId = message.channel.id;
    if (sceneManager.isSceneActive(channelId)) {
        sceneManager.addMessage(channelId, message.content);
    }
};
