const Visitor = require('../../models/Visitor');
const visitorData = require('../../data/visitors');


const arraysAreEqual = (a, b) => {
  if (!Array.isArray(a) || !Array.isArray(b)) return false;
  if (a.length !== b.length) return false;
  return a.every((val, i) => val === b[i]);
};

const registerVisitors = async () => {
  try {
    for (const localVisitor of visitorData) {
      const existingVisitor = await Visitor.findOne({ title: localVisitor.title });

      if (existingVisitor) {
        const isDifferent =
          existingVisitor.description !== localVisitor.description ||
          existingVisitor.level !== localVisitor.level ||
          !arraysAreEqual(existingVisitor.optionalScenarios, localVisitor.optionalScenarios);

        if (isDifferent) {
          await Visitor.updateOne({ title: localVisitor.title }, localVisitor);
          console.log(`🔁 Edited visitor "${localVisitor.title}".`);
        } else {
          console.log(`⏩ Skipping "${localVisitor.title}" – no changes.`);
        }
      } else {
        await Visitor.create(localVisitor);
        console.log(`👍 Registered visitor "${localVisitor.title}".`);
      }
    }

    console.log('✅ Visitor sync complete.');
  } catch (error) {
    console.error('❌ There was an error registering visitors:', error);
  }
};

module.exports = registerVisitors;
