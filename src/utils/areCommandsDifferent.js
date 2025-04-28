module.exports = (existingCommand, localCommand) => {
  // Check base fields
  if (
    existingCommand.name !== localCommand.name ||
    existingCommand.description !== localCommand.description ||
    (existingCommand.options?.length || 0) !== (localCommand.options?.length || 0)
  ) {
    return true;
  }

  // Compare options one-by-one
  const localOptions = localCommand.options || [];
  const existingOptions = existingCommand.options || [];

  for (const localOption of localOptions) {
    const existingOption = existingOptions.find(opt => opt.name === localOption.name);
    if (!existingOption) return true;

    if (
      localOption.description !== existingOption.description ||
      localOption.type !== existingOption.type ||
      (localOption.required || false) !== (existingOption.required || false)
    ) {
      return true;
    }

    // Compare choices
    const localChoices = localOption.choices || [];
    const existingChoices = existingOption.choices || [];

    if (localChoices.length !== existingChoices.length) return true;

    for (let i = 0; i < localChoices.length; i++) {
      if (
        localChoices[i].name !== existingChoices[i].name ||
        localChoices[i].value !== existingChoices[i].value
      ) {
        return true;
      }
    }
  }

  return false;
};
