import Header from "@/components/Header/Header";
import RecipeItemList from "@/components/RecipeItemList/RecipeItemList";
import SectionLabel from "@/components/SectionLabel/SectionLabel";
import Tag from "@/components/Tag/Tag";
import recipes from "@/data/recipes.json";
import { formatIngredient } from "@/lib/formatIngredient";
import { formatUstensil } from "@/lib/formatUstensil";
import { splitDescription } from "@/lib/splitDescription";
import Image from "next/image";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

export async function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

/**
 * @param {Object} props
 * @param {Promise<{ slug: string }>} props.params
 */
export default async function RecipePage({ params }) {
  const { slug } = await params;
  const recipe = recipes.find((r) => r.slug === slug);

  if (!recipe) {
    notFound();
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
            <SectionLabel className={styles.prepTimeLabel}>
              Temps de préparation
            </SectionLabel>
            <Tag variant="label">{time} min</Tag>
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
            <SectionLabel>Recette</SectionLabel>
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
