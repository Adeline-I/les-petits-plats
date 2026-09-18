import { normalizeText } from "./normalizeText";

/**
 * @typedef {import("@/components/RecipeCard/RecipeCard").Recipe} Recipe
 */

export const MIN_QUERY_LENGTH = 3;

/**
 * Filtre les recettes selon le titre, les ingrédients et la description.
 * @param {Recipe[]} recipes
 * @param {string} query
 * @returns {Recipe[]}
 */
export function filterRecipes(recipes, query) {
  const trimmedQuery = query.trim();

  if (trimmedQuery.length < MIN_QUERY_LENGTH) {
    return recipes;
  }

  const normalizedQuery = normalizeText(trimmedQuery);

  return recipes.filter((recipe) =>
    recipeMatchesQuery(recipe, normalizedQuery),
  );
}

/**
 * @param {Recipe} recipe
 * @param {string} normalizedQuery - déjà normalisée (voir normalizeText)
 * @returns {boolean}
 */
function recipeMatchesQuery(recipe, normalizedQuery) {
  if (normalizeText(recipe.name).includes(normalizedQuery)) {
    return true;
  }

  if (normalizeText(recipe.description).includes(normalizedQuery)) {
    return true;
  }

  const ingredients = recipe.ingredients ?? [];

  return ingredients.some((item) =>
    normalizeText(item.ingredient).includes(normalizedQuery),
  );
}
