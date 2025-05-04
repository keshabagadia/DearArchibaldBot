const visitors = require('../data/visitors'); 

const getRandomVisitor = async (existingPlace) => {
  try {
    console.debug('Starting getRandomVisitor function');
    console.debug('Input existingPlace:', existingPlace);

    if (!existingPlace || visitors.length === 0) {
      console.debug('No existingPlace provided or visitors list is empty');
      return null;
    }

    console.debug('Filtering visitors by level:', existingPlace.level);
    const matchingVisitors = visitors.filter(visitor => visitor.level === existingPlace.level || visitor.level === 1);

    console.debug('Matching visitors:', matchingVisitors);

    if (matchingVisitors.length === 0) {
      console.debug('No matching visitors found');
      return null;
    }

    const randomIndex = Math.floor(Math.random() * matchingVisitors.length); 
    console.debug('Random index selected:', randomIndex);

    const randomVisitor = matchingVisitors[randomIndex];
    console.debug('Random visitor selected:', randomVisitor);

    return randomVisitor;
  } catch (error) {
    console.error('Error fetching random visitor:', error);
    return null;
  }
};

module.exports = getRandomVisitor;