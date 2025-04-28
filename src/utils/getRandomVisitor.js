const Visitor = require('../models/Visitor'); // Import the Visitor model

const getRandomVisitor = async () => {
  try {
    const count = await Visitor.countDocuments();
    if (count === 0) return null; // Return null if no visitors exist

    const randomIndex = Math.floor(Math.random() * count); // Generate a random index
    const randomVisitor = await Visitor.findOne().skip(randomIndex); // Fetch the visitor at the random index

    return randomVisitor;
  } catch (error) {
    console.error('Error fetching random visitor:', error);
    return null;
  }
};

module.exports = getRandomVisitor;