"use client";

import FilterSelect from "@/components/FilterSelect/FilterSelect";
import Header from "@/components/Header/Header";
import RecipeCard from "@/components/RecipeCard/RecipeCard";
import SearchBar from "@/components/SearchBar/SearchBar";
import Tag from "@/components/Tag/Tag";
import { MIN_QUERY_LENGTH } from "@/lib/filterRecipes";
import { getFilterTags } from "@/lib/getFilterTags";
import { searchRecipes } from "@/lib/searchRecipes";
import { useState } from "react";
import styles from "./RecipeExplorer.module.css";

/**
 * @typedef {import("@/components/RecipeCard/RecipeCard").Recipe} Recipe
 * @typedef {import("@/lib/getFilterTags").FilterTags} FilterTags
 * @typedef {import("@/lib/getFilterTags").TagCategory} TagCategory
 */

/**
 * @typedef {Object} FilterConfigItem
 * @property {TagCategory} category
 * @property {string} label
 */

/** @type {FilterConfigItem[]} */
const filterConfig = [
  { category: "ingredients", label: "Ingrédients" },
  { category: "appliances", label: "Appareils" },
  { category: "ustensils", label: "Ustensiles" },
];

/**
 * @param {Object} props
 * @param {Recipe[]} props.recipes
 */
export default function RecipeExplorer({ recipes }) {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState(
    /** @type {FilterTags} */ ({
      ingredients: [],
      appliances: [],
      ustensils: [],
    }),
  );

  const filteredRecipes = searchRecipes(recipes, query, selectedTags);
  const hasNoResults = filteredRecipes.length === 0;

  const availableTags = getFilterTags(filteredRecipes);

  const selectedTagList = filterConfig.flatMap(({ category }) =>
    selectedTags[category].map((value) => ({ category, value })),
  );

  /**
   * @param {TagCategory} category
   * @param {string} value
   */
  function handleToggleTag(category, value) {
    setSelectedTags((current) => {
      const isSelected = current[category].includes(value);
      return {
        ...current,
        [category]: isSelected
          ? current[category].filter((tag) => tag !== value)
          : [...current[category], value],
      };
    });
  }

  return (
    <>
      <Header variant="expanded">
        <h1>
          Découvrez nos recettes
          <br />
          du quotidien, simples et délicieuses
        </h1>
        <SearchBar value={query} onChange={setQuery} />
      </Header>

      <main className={styles.main}>
        <div className={styles.filtersRow}>
          <div className={styles.filters}>
            {filterConfig.map(({ category, label }) => (
              <FilterSelect
                key={category}
                label={label}
                tags={availableTags[category]}
                selectedTags={selectedTags[category]}
                onToggle={(value) => handleToggleTag(category, value)}
              />
            ))}
          </div>
          <p className={styles.count} aria-live="polite" aria-atomic="true">
            {filteredRecipes.length} recettes
          </p>
        </div>

        {selectedTagList.length > 0 && (
          <div className={styles.selectedTags}>
            {selectedTagList.map(({ category, value }) => (
              <Tag
                key={`${category}-${value}`}
                variant="filter"
                action="remove"
                onAction={() => handleToggleTag(category, value)}
              >
                {value}
              </Tag>
            ))}
          </div>
        )}

        {hasNoResults ? (
          <p className={styles.noResults} aria-live="polite" aria-atomic="true">
            {getNoResultsMessage(query, selectedTagList.length > 0)}
          </p>
        ) : (
          <div className={styles.grid}>
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

/**
 * Construit le message "aucun résultat" selon que la recherche texte et/ou des tags sont actifs.
 * @param {string} query
 * @param {boolean} hasSelectedTags
 * @returns {string}
 */
function getNoResultsMessage(query, hasSelectedTags) {
  const trimmedQuery = query.trim();
  const hasQuery = trimmedQuery.length >= MIN_QUERY_LENGTH;

  if (hasQuery && hasSelectedTags) {
    return `Aucune recette ne contient « ${trimmedQuery} » avec les filtres sélectionnés.`;
  }

  if (hasQuery) {
    return `Aucune recette ne contient « ${trimmedQuery} », vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
  }

  return "Aucune recette ne correspond aux filtres sélectionnés.";
}
