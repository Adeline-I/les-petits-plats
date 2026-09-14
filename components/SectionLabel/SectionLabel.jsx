import styles from "./SectionLabel.module.css";

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {"h2" | "span"} [props.as]
 * @param {string} [props.className]
 */
export default function SectionLabel({ children, as: Tag = "h2", className }) {
  return (
    <Tag className={[styles.label, className].filter(Boolean).join(" ")}>
      {children}
    </Tag>
  );
}
