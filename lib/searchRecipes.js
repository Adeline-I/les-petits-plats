import { filterRecipes } from "./filterRecipes";
import { filterRecipesByTags } from "./filterRecipesByTags";

/**
 * @typedef {import("@/components/RecipeCard/RecipeCard").Recipe} Recipe
 * @typedef {import("@/lib/getFilterTags").FilterTags} FilterTags
 */

/**
 * Recherche principale + tags sélectionnés, combinés en intersection.
 * @param {Recipe[]} recipes
 * @param {string} query
 * @param {FilterTags} selectedTags
 * @returns {Recipe[]}
 */
export function searchRecipes(recipes, query, selectedTags) {
  const recipesMatchingQuery = filterRecipes(recipes, query);

  return filterRecipesByTags(recipesMatchingQuery, selectedTags);
}
