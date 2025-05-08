const activeScenes = new Map();

module.exports = {
  startScene(channelId, visitor) {
    activeScenes.set(channelId, {
      messages: [],
      currentVisitor: visitor,
      currentPrompt: null,
    });
  },

  endScene(channelId) {
    const scene = activeScenes.get(channelId);
    activeScenes.delete(channelId);
    return scene?.messages || [];
  },

  isSceneActive(channelId) {
    return activeScenes.has(channelId);
  },

  addMessage(channelId, message) {
    if (!activeScenes.has(channelId)) return;

    activeScenes.get(channelId).messages.push(message.content);
  },

  getMessages(channelId) {
    return activeScenes.get(channelId)?.messages || [];
  },

  getCurrentVisitor(channelId) {
    return activeScenes.get(channelId)?.currentVisitor || null;
  },

  setCurrentPrompt(channelId, prompt) {
    if (!activeScenes.has(channelId)) return;
    activeScenes.get(channelId).currentPrompt = prompt;
  },

  getCurrentPrompt(channelId) {
    return activeScenes.get(channelId)?.currentPrompt || null;
  },
};
