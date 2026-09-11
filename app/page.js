import FilterSelect from "@/components/FilterSelect/FilterSelect";
import Header from "@/components/Header/Header";
import RecipeCard from "@/components/RecipeCard/RecipeCard";
import SearchBar from "@/components/SearchBar/SearchBar";
import recipes from "@/data/recipes.json";
import styles from "./page.module.css";

const filters = ["Ingrédients", "Appareils", "Ustensiles"];

export default function Home() {
  return (
    <>
      <Header variant="expanded">
        <h1>
          Découvrez nos recettes
          <br />
          du quotidien, simples et délicieuses
        </h1>
        <SearchBar />
      </Header>

      <main className={styles.main}>
        <div className={styles.filtersRow}>
          <div className={styles.filters}>
            {filters.map((label) => (
              <FilterSelect key={label} label={label} />
            ))}
          </div>
          <p className={styles.count}>{recipes.length} recettes</p>
        </div>

        <div className={styles.grid}>
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </main>
    </>
  );
}
