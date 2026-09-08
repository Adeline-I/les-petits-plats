import Tag from "@/components/Tag/Tag";
import Image from "next/image";
import Link from "next/link";
import styles from "./RecipeCard.module.css";

/**
 * @param {Object} ingredient
 */
function formatQuantity(ingredient) {
  const { quantity, unit } = ingredient;
  return [quantity, unit].filter(Boolean).join(" ");
}

/**
 * @param {Object} props
 * @param {Object} props.recipe - objet recette complet (voir recipes.json)
 */
export default function RecipeCard({ recipe }) {
  const { slug, image, name, time, description, ingredients } = recipe;

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
                {formatQuantity(ingredient) && (
                  <span className={styles.ingredientQuantity}>
                    {formatQuantity(ingredient)}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
}
