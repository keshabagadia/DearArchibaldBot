const { get, set } = require("mongoose");

const activeScenes = new Map();

module.exports = {
  startScene(channelId, visitor) {
    activeScenes.set(channelId, {
      messages: [],
      currentVisitor: visitor,
      currentPrompt: null,
      currentTwistRoll: 0,
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
    console.debug("Getting current prompt for channel:", channelId);
    console.debug("Active scenes:", activeScenes);
    return activeScenes.get(channelId)?.currentPrompt || null;
  },

  setCurrentTwistRoll(channelId, roll) {
    if (!activeScenes.has(channelId)) return;
    activeScenes.get(channelId).currentTwistRoll = roll;
  },
  
  getCurrentTwistRoll(channelId) {
    return activeScenes.get(channelId)?.currentTwistRoll || 0;
  }
};
