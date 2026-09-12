import styles from "./FilterSelect.module.css";

/**
 * @param {Object} props
 * @param {string} props.label - libellé affiché (ex: "Ingrédients")
 */
export default function FilterSelect({ label }) {
  return (
    <button
      type="button"
      className={styles.select}
      aria-label={`Filtrer par ${label}`}
    >
      {label}
      <svg
        width="13"
        height="6"
        viewBox="0 0 14 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.5 0.5L7 6.5L13.5 0.5"
          stroke="currentColor"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
