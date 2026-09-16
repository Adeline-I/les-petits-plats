const DIACRITICS_PATTERN = /[\u0300-\u036f]/g;

/**
 * Normalise une chaîne pour une comparaison insensible à la casse et aux accents.
 * @param {string} text
 * @returns {string}
 */
export function normalizeText(text) {
  return text.normalize("NFD").replace(DIACRITICS_PATTERN, "").toLowerCase();
}
