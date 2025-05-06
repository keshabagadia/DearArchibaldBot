const activeScenes = new Map(); // channelId -> { messages, currentVisitor, lastPrompt }

module.exports = {
  startScene(channelId, visitor) {
    activeScenes.set(channelId, {
      messages: [],
      currentVisitor: visitor,
      lastPrompt: null,
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

  setLastPrompt(channelId, prompt) {
    if (!activeScenes.has(channelId)) return;

    activeScenes.get(channelId).lastPrompt = {
      ...prompt,
      receivedAt: Date.now(), // Used for response timing check
    };
  },

  getLastPrompt(channelId) {
    return activeScenes.get(channelId)?.lastPrompt || null;
  },
};
