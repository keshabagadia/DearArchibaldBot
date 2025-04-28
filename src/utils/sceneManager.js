// utils/sceneManager.js
const activeScenes = new Map(); // channelId -> { messages: [] }

module.exports = {
  startScene(channelId) {
    activeScenes.set(channelId, { messages: [] });
  },
  endScene(channelId) {
    const scene = activeScenes.get(channelId);
    activeScenes.delete(channelId);
    return scene?.messages || [];
  },
  isSceneActive(channelId) {
    return activeScenes.has(channelId);
  },
  addMessage(channelId, messageContent) {
    if (activeScenes.has(channelId)) {
      activeScenes.get(channelId).messages.push(messageContent);
    }
  },
};
