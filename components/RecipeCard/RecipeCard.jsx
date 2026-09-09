import Tag from "@/components/Tag/Tag";
import Image from "next/image";
import Link from "next/link";
import styles from "./RecipeCard.module.css";

/**
 * @typedef {Object} Ingredient
 * @property {string} ingredient
 * @property {number} [quantity]
 * @property {string} [unit]
 */

/**
 * @typedef {Object} Recipe
 * @property {string} slug
 * @property {string} image
 * @property {string} name
 * @property {number} time
 * @property {string} description
 * @property {Ingredient[]} ingredients
 */

/**
 * @param {Ingredient} ingredient
 */
function formatQuantity(ingredient) {
  const { quantity, unit } = ingredient;
  const parts = [];
  if (quantity !== undefined && quantity !== null) parts.push(quantity);
  if (unit) parts.push(unit);
  return parts.length > 0 ? parts.join(" ") : "-";
}

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
          <span className={styles.sectionLabel}>Recette</span>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionLabel}>Ingrédients</span>
          <ul className={styles.ingredientsList}>
            {ingredients.map((ingredient, index) => (
              <li key={index} className={styles.ingredientItem}>
                <span className={styles.ingredientName}>
                  {ingredient.ingredient}
                </span>
                <span className={styles.ingredientQuantity}>
                  {formatQuantity(ingredient)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
}
