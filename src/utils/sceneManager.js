// utils/sceneManager.js
const activeScenes = new Map(); // channelId -> { messages: [], currentVisitor: null }

module.exports = {
  startScene(channelId, visitor) {
    activeScenes.set(channelId, { messages: [], currentVisitor: visitor });
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
  getCurrentVisitor(channelId) {
    return activeScenes.get(channelId)?.currentVisitor || null;
  },
};