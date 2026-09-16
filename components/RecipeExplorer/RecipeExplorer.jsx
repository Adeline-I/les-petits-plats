"use client";

import FilterSelect from "@/components/FilterSelect/FilterSelect";
import Header from "@/components/Header/Header";
import RecipeCard from "@/components/RecipeCard/RecipeCard";
import SearchBar from "@/components/SearchBar/SearchBar";
import { filterRecipes } from "@/lib/filterRecipes";
import { useState } from "react";
import styles from "./RecipeExplorer.module.css";

const filters = ["Ingrédients", "Appareils", "Ustensiles"];

/**
 * @typedef {import("@/components/RecipeCard/RecipeCard").Recipe} Recipe
 */

/**
 * @param {Object} props
 * @param {Recipe[]} props.recipes
 */
export default function RecipeExplorer({ recipes }) {
  const [query, setQuery] = useState("");
  const filteredRecipes = filterRecipes(recipes, query);
  const hasNoResults = filteredRecipes.length === 0;

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
            {filters.map((label) => (
              <FilterSelect key={label} label={label} />
            ))}
          </div>
          <p className={styles.count}>{filteredRecipes.length} recettes</p>
        </div>

        {hasNoResults ? (
          <p className={styles.noResults}>
            Aucune recette ne contient « {query.trim()} », vous pouvez chercher
            « tarte aux pommes », « poisson », etc.
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
