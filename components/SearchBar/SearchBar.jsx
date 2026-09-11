"use client";

import { useRef, useState } from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const inputRef = useRef(/** @type {HTMLInputElement | null} */ (null));
  const [value, setValue] = useState("");
  const hasValue = value.length > 0;

  function handleClear() {
    setValue("");
    inputRef.current?.focus();
  }

  return (
    <div className={styles.searchBar}>
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Rechercher une recette, un ingrédient, ..."
        className={styles.input}
        aria-label="Rechercher une recette"
      />
      <button
        type="button"
        onClick={handleClear}
        tabIndex={hasValue ? 0 : -1}
        aria-hidden={!hasValue}
        className={`${styles.clearButton} ${hasValue ? styles.visible : ""}`}
        aria-label="Effacer la recherche"
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.0833 14.0833L7.58325 7.58334M7.58325 7.58334L1.08325 1.08334M7.58325 7.58334L14.0833 1.08334M7.58325 7.58334L1.08325 14.0833"
            stroke="currentColor"
            strokeWidth="2.16667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button type="button" className={styles.button} aria-label="Rechercher">
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.icon}
        >
          <circle cx="10" cy="10" r="9.5" stroke="currentColor" />
          <line
            x1="18.3536"
            y1="18.6464"
            x2="27.3536"
            y2="27.6464"
            stroke="currentColor"
          />
        </svg>
      </button>
    </div>
  );
}
