/**
 * Visitor Schema:
 * - id (number): Unique identifier for the visitor.
 * - title (string): The title or name of the visitor.
 * - description (string): A brief description of the visitor and their situation.
 * - level (number): The corresponding level of gathering place the visitor appears at.
 * - optionalScenarios (array of strings) (depracated): A list of optional scenarios related to the visitor.
 * - goodOutcome (string): "If the interaction goes well..."
 * - badOutcome (string): "If the interaction goes poorly..."
 */

module.exports = [
  {
    id: 1,
    title: `A Worn-Out Visitor`,
    description:
      `Boris, a Badger, stumbles into your gathering place, visibly fatigued and carrying a heavy load.`,
    level: 1,
    optionalScenarios: [
      `If this is his first time here, Boris explains that he has been working nonstop to gather enough food for the upcoming winter and feels overwhelmed. Write to find out how this discussion plays out.`,
      `Boris shows a cracked, worn-out wagon wheel that he’s been using to transport goods.`,
      `Boris asks for a place to rest for a while but feels guilty about taking a break. How do your characters try to reassure him?`,
    ],
    goodOutcome: `Placeholder for a positive resolution.`,
    badOutcome: `Placeholder for a negative outcome.`,
  },
  {
    id: 2,
    title: `A Small Visitor`,
    description:
      `A field mouse comes in, his small child in tow. It is extremely clear that the kid is in serious need of some manners.`,
    level: 1,
    optionalScenarios: [
      `The kid immediately breaks something in the room. What is it?`,
      `The field mouse sighs and says he hasn't slept in days because nobody is around to watch the kid right now except him. He’s getting pressure from his village, who don’t understand why he can’t “pull his own weight.” He asks for help.`,
    ],
    goodOutcome: `Placeholder for a positive resolution.`,
    badOutcome: `Placeholder for a negative outcome.`,
  },
  {
    id: 3,
    title: `A Troubled Visitor`,
    description: `A mushroom sprite named Blink comes in, looking nervous.`,
    level: 1,
    optionalScenarios: [
      `If this is a new visitor to your gathering place, one of you knows them already. Describe, in a flashback, about the awkward picnic you both ruined.`,
      `The sprite obviously has a fae curse and is trying to hide it. Describe the curse and whether you point it out, and what happens next.`,
      `Think about your character and a goal they have. The sprite confesses that they have, somehow, accidentally or on purpose, gotten your character further away from it. What is it, and what happens next?`,
    ],
    goodOutcome: `Placeholder for a positive resolution.`,
    badOutcome: `Placeholder for a negative outcome.`,
  },
  {
    id: 4,
    title: `A Competitive Visitor`,
    description: `An old squirrel comes in, looking thoughtful.`,
    level: 1,
    optionalScenarios: [
      `The squirrel challenges one of you to a game of skill. What does he wager, and what do you wager in return? What game? Roll to see who wins. What happens next?`,
      `The squirrel is feeling wistful. He tells you a story about a time he felt judged for resting. Write to find out the short conversation between him and your character. Roll to see if the conversation goes well.`,
    ],
    goodOutcome: `Placeholder for a positive resolution.`,
    badOutcome: `Placeholder for a negative outcome.`,
  },
  {
    id: 5,
    title: `A Bazaar Visitor`,
    description:
      `A traveling bazaar rolls up to the gathering place and sets up for the day.`,
    level: 1,
    optionalScenarios: [
      `One of their members looks lost and upset. Write to find out the conversation you have with them.`,
      `One of their members claims to be selling enchanted bracelets. What happens next?`,
      `One of their members is selling pie. Regular pie. Really, it's just standard pie. Honest. What happens next?`,
      `There is an exotic fruit and nuts stall. Maybe something is worth sampling?`,
      `One of their members is bragging that they're the fastest creature in the wood. What happens next?`,
    ],
    goodOutcome: `Placeholder for a positive resolution.`,
    badOutcome: `Placeholder for a negative outcome.`,
  },
  {
    id: 6,
    title: `An Exiled Visitor`,
    description: `Delilah, a Mole, walks into your gathering place.`,
    level: 1,
    optionalScenarios: [
      `Delilah shares a story about her exile from her homeland. Write to find out the conversation you have.`,
      `Delilah has been working on an invention, a small golden box that she says allows people to go back in time five minutes. It's not currently working. She says it often gains other capabilities or properties as well. What happens next?`,
      `Delilah is looking for a temporary place to stay (unless she is already staying at the gathering place). But she is reluctant to stay here for fear of imposing. What happens next?`,
    ],
    goodOutcome: `Placeholder for a positive resolution.`,
    badOutcome: `Placeholder for a negative outcome.`,
  },
  {
    id: 7,
    title: `A Hungry Visitor`,
    description: `Rufus the Frog strides in.`,
    level: 2,
    optionalScenarios: [
      `Rufus has heard about your character's Edge (what they're really good at) and needs your help.`,
      `Rufus wants to host a grand feast but has only a single turnip to start with.`,
      `Rufus examines your gathering place and describes how he could improve it.`,
    ],
    goodOutcome: `Placeholder for a positive resolution.`,
    badOutcome: `Placeholder for a negative outcome.`,
  },
  {
    id: 8,
    title: `A Mischievous Visitor`,
    description:
      `Pip, a Chipmunk, arrives at your gathering place, grinning mischievously.`,
    level: 2,
    optionalScenarios: [
      `Pip has switched everyone’s belongings around as a prank and now can’t remember where anything goes. He is holding items from all around this area.`,
      `Pip insists he can perform magic tricks and wants to show off his skills. What happens next?`,
      `Pip challenges your characters to a race but has set up various, increasingly dangerous obstacles along the way. What happens next?`,
    ],
    goodOutcome: `Placeholder for a positive resolution.`,
    badOutcome: `Placeholder for a negative outcome.`,
  },
  {
    id: 9,
    title: `A Feral Visitor`,
    description:
      `Clay, a Raccoon, shuffles in. He is well-known for living on the fringes of polite animal society.`,
    level: 2,
    optionalScenarios: [
      `Clay challenges a long-held belief your character has related to their Flaw. What is it? Does he persuade them to see things a different way?`,
      `Clay gets into an argument with another visitor. What is it about? What happens next?`,
      `Clay is good at reading others. He realizes you're hiding something. What is it? What happens next?`,
    ],
    goodOutcome: `Placeholder for a positive resolution.`,
    badOutcome: `Placeholder for a negative outcome.`,
  },
];
