const visitors = require('../data/visitors'); 

const getRandomVisitor = async () => {
  try {
    if (visitors.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * visitors.length); 
    const randomVisitor = visitors[randomIndex];
    
    return randomVisitor;
  } catch (error) {
    console.error('Error fetching random visitor:', error);
    return null;
  }
};

module.exports = getRandomVisitor;