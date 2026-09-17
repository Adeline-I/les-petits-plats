import SectionLabel from "@/components/SectionLabel/SectionLabel";
import Tag from "@/components/Tag/Tag";
import { formatIngredient } from "@/lib/formatIngredient";
import Image from "next/image";
import Link from "next/link";
import styles from "./RecipeCard.module.css";

/**
 * @typedef {import("@/lib/formatIngredient").Ingredient} Ingredient
 */

/**
 * @typedef {Object} Recipe
 * @property {number} id
 * @property {string} slug
 * @property {string} image
 * @property {string} name
 * @property {number} time
 * @property {string} description
 * @property {Ingredient[]} ingredients
 */

/**
 * @param {Object} props
 * @param {Recipe} props.recipe - objet recette complet (voir recipes.json)
 */
export default function RecipeCard({ recipe }) {
  const { slug, image, name, time, description, ingredients = [] } = recipe;

  return (
    <Link href={`/recette/${slug}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={`/images/${image}`}
          alt={name}
          fill
          sizes="380px"
          className={styles.image}
        />
        <div className={styles.timeTag}>
          <Tag variant="label">{time} min</Tag>
        </div>
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>{name}</h2>

        <div className={styles.section}>
          <SectionLabel as="span">Recette</SectionLabel>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.section}>
          <SectionLabel as="span">Ingrédients</SectionLabel>
          <ul className={styles.ingredientsList} role="list">
            {ingredients.map((ingredient, index) => {
              const { name: ingredientName, quantity } =
                formatIngredient(ingredient);
              return (
                <li key={index} className={styles.ingredientItem}>
                  <span className={styles.ingredientName}>
                    {ingredientName}
                  </span>
                  <span className={styles.ingredientQuantity}>{quantity}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Link>
  );
}
