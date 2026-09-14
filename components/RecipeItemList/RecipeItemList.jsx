import styles from "./RecipeItemList.module.css";

/**
 * @typedef {Object} RecipeItem
 * @property {string} name
 * @property {string} quantity
 */

/**
 * @param {Object} props
 * @param {string} props.title
 * @param {RecipeItem[]} props.items
 */
export default function RecipeItemList({ title, items }) {
  return (
    <div className={styles.section}>
      <h2 className="sectionLabel">{title}</h2>
      <ul className={styles.list} role="list">
        {items.map((item, index) => (
          <li key={index} className={styles.item}>
            <span className={styles.name}>{item.name}</span>
            <span className={styles.quantity}>{item.quantity}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
