import Logo from "@/components/Logo/Logo";
import Image from "next/image";
import styles from "./Header.module.css";

/**
 * @typedef {"expanded" | "compact"} HeaderVariant
 */

/**
 * @param {Object} props
 * @param {HeaderVariant} [props.variant="expanded"]
 * @param {boolean} [props.fullHeight=false] - pertinent uniquement si variant="expanded" (667px fixe sur Home vs 100vh sur la 404) ; ignoré en "compact"
 * @param {import("react").ReactNode} [props.children] - contenu affiché uniquement en variant="expanded"
 */
export default function Header({
  variant = "expanded",
  fullHeight = false,
  children,
}) {
  const resolvedVariant = variant === "compact" ? "compact" : "expanded";
  const isExpanded = resolvedVariant === "expanded";
  const variantClass = styles[resolvedVariant];

  return (
    <header
      className={`${styles.header} ${variantClass} ${isExpanded && fullHeight ? styles.fullHeight : ""}`}
    >
      <Image
        src="/images/header.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className={styles.backgroundImage}
      />
      <div className={styles.overlay} />
      <div className={styles.logoWrapper}>
        <Logo />
      </div>
      {isExpanded && children && (
        <div className={styles.content}>{children}</div>
      )}
    </header>
  );
}
