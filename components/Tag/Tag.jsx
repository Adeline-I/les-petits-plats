"use client";

import styles from "./Tag.module.css";

/**
 * @typedef {"label" | "filter"} TagVariant
 * @typedef {"none" | "remove"} TagAction
 */

const actionConfig = {
  none: null,
  remove: {
    label: "Retirer ce filtre",
    icon: (
      <svg
        width="13"
        height="13"
        viewBox="0 0 13 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.0833 11.0833L6.08325 6.08331M6.08325 6.08331L1.08325 1.08331M6.08325 6.08331L11.0833 1.08331M6.08325 6.08331L1.08325 11.0833"
          stroke="#1B1B1B"
          strokeWidth="2.16667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
};

/**
 * @param {Object} props
 * @param {TagVariant} [props.variant="label"]
 * @param {TagAction} [props.action="none"]
 * @param {() => void} [props.onAction] - requis si action !== "none"
 * @param {import("react").ReactNode} props.children
 */
export default function Tag({
  variant = "label",
  action = "none",
  onAction,
  children,
}) {
  const activeAction = actionConfig[action];

  return (
    <span className={`${styles.tag} ${styles[variant] ?? styles.label}`}>
      {children}
      {activeAction && onAction && (
        <button
          type="button"
          onClick={onAction}
          className={styles.actionButton}
          aria-label={activeAction.label}
        >
          {activeAction.icon}
        </button>
      )}
    </span>
  );
}
