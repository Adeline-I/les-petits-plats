const QUANTITY_PATTERN = /^(?<name>.*?)\s*\((?<quantity>\d+)\)$/;

/**
 * @param {string} ustensil
 */
export function formatUstensil(ustensil) {
  const match = ustensil.match(QUANTITY_PATTERN);
  const groups = match?.groups;
  return groups
    ? { name: groups.name, quantity: groups.quantity }
    : { name: ustensil, quantity: "1" };
}
