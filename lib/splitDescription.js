const SENTENCE_SEPARATOR = /(?<=\.)\s+/;

/**
 * @param {string} description
 * @returns {string[]}
 */
export function splitDescription(description) {
  return description.split(SENTENCE_SEPARATOR).filter(Boolean);
}
