import { formatUstensil } from "./formatUstensil";
import { normalizeText } from "./normalizeText";

/**
 * @typedef {import("@/components/RecipeCard/RecipeCard").Recipe} Recipe
 */

/**
 * @typedef {"ingredients" | "appliances" | "ustensils"} TagCategory
 */

/**
 * @typedef {Object} FilterTags
 * @property {string[]} ingredients
 * @property {string[]} appliances
 * @property {string[]} ustensils
 */

/**
 * Construit les 3 listes de tags de filtre (ingrédients, appareils, ustensiles) à partir des recettes.
 * @param {Recipe[]} recipes
 * @returns {FilterTags}
 */
export function getFilterTags(recipes) {
  return {
    ingredients: getUniqueTags(recipes, (recipe) =>
      (recipe.ingredients ?? []).map((item) => item.ingredient),
    ),
    appliances: getUniqueTags(recipes, (recipe) =>
      recipe.appliance ? [recipe.appliance] : [],
    ),
    ustensils: getUniqueTags(recipes, (recipe) =>
      (recipe.ustensils ?? []).map((ustensil) => formatUstensil(ustensil).name),
    ),
  };
}

/**
 * Récupère les valeurs uniques (via getValues) sur toutes les recettes, triées alphabétiquement.
 * @param {Recipe[]} recipes
 * @param {(recipe: Recipe) => string[]} getValues
 * @returns {string[]}
 */
function getUniqueTags(recipes, getValues) {
  const tagsByKey = new Map();

  for (const recipe of recipes) {
    for (const value of getValues(recipe)) {
      const key = normalizeText(value);
      if (!tagsByKey.has(key)) {
        tagsByKey.set(key, value);
      }
    }
  }

  return [...tagsByKey.values()]
    .map(capitalize)
    .sort((a, b) => a.localeCompare(b, "fr"));
}

/**
 * Met une majuscule en début de mot, garde les accents.
 * @param {string} text
 * @returns {string}
 */
function capitalize(text) {
  const lower = text.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}
