const isValidName = (name) => {
  // TODO Throw out names that try to mess up the system
  // like %FIRST_NAME% or FIRST or NAME

  return name && name.trim() !== '' && name.length > 2;
};

const replaceInString = (needle, haystack, replacement) => {
  // replace a string only if it is NOT inside another word
  const secureNeedle = needle.replace(/\//g, '').replace(/\\/g, '');

  const wordBoundaryGroup = [
    '\\.', '\\,', '"', '\\\'', '\\?', '\\!', '@', '\\#', '\\$', '%', '\\^', '\\&', '\\(', '\\)',
    '\\s', '\\:', '\\b',
  ].join('|');

  return haystack
    .replace(new RegExp(`(?=${wordBoundaryGroup})${secureNeedle}(?=${wordBoundaryGroup})`, 'gi'), replacement)
    // Match beginning of string
    .replace(new RegExp(`^${secureNeedle}(?=${wordBoundaryGroup})`, 'gi'), replacement)
    // Match end of string
    .replace(new RegExp(`(?=${wordBoundaryGroup})${secureNeedle}$`, 'gi'), replacement);
};

export const replaceNames = (name, text) => {
  // Make sure the name is actually a set of characters
  if (!isValidName(name)) {
    return text;
  }

  // split on space
  const parts = name.split(' ');
  // throw out invalid names

  const validNameParts = parts.filter(isValidName);

  if (validNameParts.length > 0) {
    const firstName = validNameParts[0];
    const lastName = validNameParts.length > 1 ? validNameParts[validNameParts.length - 1] : null;

    // replace first name
    let newText = replaceInString(firstName, text, '%FIRST_NAME%');
    if (lastName) {
      newText = replaceInString(lastName, newText, '%LAST_NAME%');
    }

    // replace last name
    return newText;
  } else {
    return text;
  }
};

export const insertNames = (name, text) => {
  // Make sure the name is actually a set of characters
  if (!isValidName(name)) {
    return text;
  }

  // split on space
  const parts = name.split(' ');
  // throw out invalid names

  const validNameParts = parts.filter(isValidName);

  if (validNameParts.length > 0) {
    const firstName = validNameParts[0];
    const lastName = validNameParts.length > 1 ? validNameParts[validNameParts.length - 1] : null;

    // replace first name
    let newText = text.replace(new RegExp('%FIRST_NAME%', 'g'), firstName);
    if (lastName) {
      newText = newText.replace(new RegExp('%LAST_NAME%', 'g'), firstName);
    }

    // replace last name
    return newText;
  } else {
    return text;
  }
};
