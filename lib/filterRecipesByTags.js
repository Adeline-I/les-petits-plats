import { formatUstensil } from "./formatUstensil";
import { normalizeText } from "./normalizeText";

/**
 * @typedef {import("@/components/RecipeCard/RecipeCard").Recipe} Recipe
 * @typedef {import("@/lib/getFilterTags").FilterTags} FilterTags
 */

/**
 * Filtre les recettes qui correspondent à tous les tags sélectionnés (intersection).
 * @param {Recipe[]} recipes
 * @param {FilterTags} selectedTags
 * @returns {Recipe[]}
 */
export function filterRecipesByTags(recipes, selectedTags) {
  return recipes.filter((recipe) => recipeMatchesTags(recipe, selectedTags));
}

/**
 * Vérifie qu'une recette correspond à tous les tags sélectionnés.
 * @param {Recipe} recipe
 * @param {FilterTags} selectedTags
 * @returns {boolean}
 */
function recipeMatchesTags(recipe, selectedTags) {
  return (
    selectedTags.ingredients.every((tag) =>
      (recipe.ingredients ?? []).some(
        (item) => normalizeText(item.ingredient) === normalizeText(tag),
      ),
    ) &&
    selectedTags.appliances.every(
      (tag) => normalizeText(recipe.appliance ?? "") === normalizeText(tag),
    ) &&
    selectedTags.ustensils.every((tag) =>
      (recipe.ustensils ?? []).some(
        (ustensil) =>
          normalizeText(formatUstensil(ustensil).name) === normalizeText(tag),
      ),
    )
  );
}
