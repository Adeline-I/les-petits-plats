/**
 * @typedef {Object} Ingredient
 * @property {string} ingredient
 * @property {number} [quantity]
 * @property {string} [unit]
 */

/**
 * @param {Ingredient} ingredient
 */
export function formatIngredient({ ingredient: name, quantity, unit }) {
  if (quantity === undefined || quantity === null) {
    return { name, quantity: "-" };
  }
  return { name, quantity: unit ? `${quantity} ${unit}` : `${quantity}` };
}
