import Header from "@/components/Header/Header";
import RecipeItemList from "@/components/RecipeItemList/RecipeItemList";
import Tag from "@/components/Tag/Tag";
import recipes from "@/data/recipes.json";
import { formatIngredient } from "@/lib/formatIngredient";
import { formatUstensil } from "@/lib/formatUstensil";
import { splitDescription } from "@/lib/splitDescription";
import Image from "next/image";
import styles from "./page.module.css";

/**
 * @param {Object} props
 * @param {Promise<{ slug: string }>} props.params
 */
export default async function RecipePage({ params }) {
  const { slug } = await params;
  const recipe = recipes.find((r) => r.slug === slug);

  if (!recipe) {
    return <p>Recette introuvable</p>;
  }

  const { image, name, time, description, ingredients, ustensils, appliance } =
    recipe;

  const ingredientItems = ingredients.map(formatIngredient);
  const ustensilItems = ustensils.map(formatUstensil);
  const applianceItems = [{ name: appliance, quantity: "1" }];
  const descriptionSentences = splitDescription(description);

  return (
    <>
      <Header variant="compact" />

      <main className={styles.main}>
        <div className={styles.imageWrapper}>
          <Image
            src={`/images/${image}`}
            alt={name}
            width={606}
            height={738}
            sizes="(max-width: 768px) 100vw, 45vw"
            className={styles.image}
          />
        </div>

        <div className={styles.details}>
          <h1 className={styles.title}>{name}</h1>

          <div className={styles.prepTime}>
            <h2 className="sectionLabel">Temps de préparation</h2>
            <Tag variant="label">{time}min</Tag>
          </div>

          <RecipeItemList title="Ingrédients" items={ingredientItems} />
          <RecipeItemList
            title="Ustensiles nécessaires"
            items={ustensilItems}
          />
          <RecipeItemList
            title="Appareils nécessaires"
            items={applianceItems}
          />

          <div className={styles.section}>
            <h2 className="sectionLabel">Recette</h2>
            {descriptionSentences.map((sentence, index) => (
              <p key={index} className={styles.description}>
                {sentence}
              </p>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
