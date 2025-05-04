/**
 * Prompt Schema:
 * - id (number): Unique identifier for the prompt.
 * - prompt (string): The text of the prompt, describing the situation or question.
 * - isTwist (boolean): Indicates this is a "twist prompt" (true) or a regular prompt (false).
 * - memoryChange (number): The impact of the prompt on the visitor's memory, positive or negative.
 */
module.exports = [
  {
    prompt:
      "Your character is very confident that they know how to solve this visitor’s challenges completely! Unfortunately, your character is completely wrong. Do they tell the visitor that it’s just a matter of mindset, that everything happens for a reason, ask if they’ve tried an obvious solution ('Have you tried...'), or something else entirely?",
    id: 1,
    isTwist: false,
    memoryChange: -3,
  },
  {
    prompt:
      "You and the visitor discover that you have a value in common. What is it, and why do they feel like they haven’t been upholding it in their life lately? What do they resolve to do differently?",
    id: 2,
    isTwist: false,
    memoryChange: 1,
  },
  {
    prompt:
      "Your character finds something about this visitor that reminds them of someone else they know and like. What is it? Who does it remind them of?",
    id: 3,
    isTwist: false,
    memoryChange: 0,
  },
  {
    prompt:
      "Archibald lands at the window, briefly, to ask how the visit is going. What do you tell him?",
    id: 4,
    isTwist: false,
    memoryChange: 0,
  },
  {
    prompt:
      "Your character tells an unhelpful story, starting with 'I know just how you feel.' Unfortunately, your character does not know just how this visitor feels. What story do they tell, and how does the visitor react?",
    id: 5,
    isTwist: false,
    memoryChange: -2,
  },
  {
    prompt:
      "The visitor divulges something unusual that they saw recently. What is it?",
    id: 6,
    isTwist: false,
    memoryChange: 0,
  },
  {
    prompt:
      "You realize your character and the visitor both have a major life goal in common. What is it?",
    id: 7,
    isTwist: false,
    memoryChange: +1,
  },
  {
    prompt:
      "Choose an object that exists in your Gathering-Place. This object brings up something of personal significance to the visitor. What does it remind them of?",
    id: 8,
    isTwist: false,
    memoryChange: 0,
  },
  {
    prompt:
      "Your character tries to make the visitor feel better by explaining how things could be worse. How could things be worse?",
    id: 9,
    isTwist: false,
    memoryChange: -2,
  },
  {
    prompt:
      "Instead of trying to solve their challenges, your character instead asks what the visitor needs before they try to be helpful. Is it a hot cup of tea or a favorite food? Reflecting their feelings back to them? Taking their mind off things? Or something else?",
    id: 10,
    isTwist: false,
    memoryChange: 1,
  },
  {
    prompt:
      "Your visitor knows another past visitor somehow. Who is it, and how do they know one another? Does your character agree or disagree with what they think of them?",
    id: 11,
    isTwist: false,
    memoryChange: 0,
  },
  {
    prompt:
      "The visitor tells you about the journey to this Gathering-Place. Where are they coming from?",
    id: 12,
    isTwist: false,
    memoryChange: 0,
  },
  {
    prompt:
      "The visitor divulges a difficult fact or feeling, and your character, uncomfortable, tries to be encouraging with empty cheerleading. What does the visitor divulge, and what empty praise does your character heap onto them?",
    id: 13,
    isTwist: false,
    memoryChange: -2,
  },
  {
    prompt:
      "The visitor shares a sensitive fact about themselves or their situation that they didn’t share before. Your character makes it clear that they’re here to listen, not judge or prescribe. What does your character say? 'I’m listening'? 'Tell me more'? What do they share?",
    id: 14,
    isTwist: false,
    memoryChange: 2,
  },
  {
    prompt:
      "Your character tells the visitor a story about a gift they once received (either from Archibald, or someone else). What surprises the visitor about it?",
    id: 15,
    isTwist: false,
    memoryChange: 0,
  },
  {
    prompt:
      "You learn about the visitor’s hometown. What stands out to your character about the visitor’s description?",
    id: 16,
    isTwist: false,
    memoryChange: 0,
  },
  {
    prompt:
      "Your character tries to bring some food over to the visitor, but trips and dumps it all over them. What is the visitor now covered in?",
    id: 17,
    isTwist: false,
    memoryChange: -1,
  },
  {
    prompt:
      "Your character and the visitor realize you both have something that you really love in common. Is it a hobby, a food, a particular tree? Something else entirely?",
    id: 18,
    isTwist: false,
    memoryChange: 2,
  },
  {
    prompt: "You ask the visitor where they are headed next. What do they say?",
    id: 19,
    isTwist: false,
    memoryChange: 0,
  },
  {
    prompt:
      "None of you have perfect control over this visitor’s challenges, but they do come to an important realization about those challenges while resting here. What is it? Do they share it with your character?",
    id: 20,
    isTwist: false,
    memoryChange: 3,
  },
];
