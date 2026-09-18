"use client";

import { normalizeText } from "@/lib/normalizeText";
import { useEffect, useRef, useState } from "react";
import styles from "./FilterSelect.module.css";

/**
 * @param {Object} props
 * @param {string} props.label - libellé affiché (ex: "Ingrédients")
 * @param {string[]} props.tags - tags disponibles pour ce filtre (sélectionnés inclus)
 * @param {string[]} props.selectedTags - tags actuellement sélectionnés pour ce filtre
 * @param {(value: string) => void} props.onToggle - appelé quand un tag est coché/décoché
 */
export default function FilterSelect({ label, tags, selectedTags, onToggle }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const wrapperRef = useRef(/** @type {HTMLDivElement | null} */ (null));

  const normalizedSearch = normalizeText(searchText);
  const visibleTags = tags.filter((tag) =>
    normalizeText(tag).includes(normalizedSearch),
  );
  const hasSearchText = searchText.length > 0;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    /**
     * @param {MouseEvent} event
     */
    function handleClickOutside(event) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(/** @type {Node} */ (event.target))
      ) {
        setIsOpen(false);
        setSearchText("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  function handleToggleOpen() {
    setIsOpen((current) => !current);
    setSearchText("");
  }

  function handleClearSearch() {
    setSearchText("");
  }

  /**
   * @param {string} tag
   */
  function handleToggleTag(tag) {
    onToggle(tag);
    setSearchText("");
  }

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}>
        <button
          type="button"
          className={styles.header}
          aria-label={`Filtrer par ${label}`}
          aria-expanded={isOpen}
          onClick={handleToggleOpen}
        >
          {label}
          {isOpen ? (
            <svg
              width="13"
              height="6"
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.5 6.68045L7 0.68045L13.5 6.68045"
                stroke="#1B1B1B"
                strokeLinecap="round"
              />
            </svg>
          ) : (
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
          )}
        </button>

        {isOpen && (
          <>
            <div className={styles.searchBar}>
              <input
                type="search"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                className={styles.searchInput}
                aria-label={`Rechercher dans ${label}`}
                autoFocus
              />
              <button
                type="button"
                onClick={handleClearSearch}
                className={`${styles.clearButton} ${hasSearchText ? styles.visible : ""}`}
                aria-label="Effacer la recherche"
              >
                <svg
                  width="8"
                  height="8"
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
              <span className={styles.searchIcon} aria-hidden="true">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
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
              </span>
            </div>

            <ul className={styles.list} role="list">
              {visibleTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <li key={tag}>
                    <button
                      type="button"
                      className={`${styles.option} ${isSelected ? styles.selected : ""}`}
                      aria-pressed={isSelected}
                      onClick={() => handleToggleTag(tag)}
                    >
                      {tag}
                      {isSelected && (
                        <span className={styles.removeIcon} aria-hidden="true">
                          <svg
                            width="17"
                            height="17"
                            viewBox="0 0 17 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="8.5" cy="8.5" r="8.5" fill="black" />
                            <path
                              d="M11 11L8.5 8.5M8.5 8.5L6 6M8.5 8.5L11 6M8.5 8.5L6 11"
                              stroke="#FFD15B"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
