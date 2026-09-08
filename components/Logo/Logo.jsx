import Link from "next/link";
import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <Link href="/" className={styles.logo}>
      <img
        src="/images/logo.svg"
        alt="Les Petits Plats"
        width={207}
        height={26}
      />
    </Link>
  );
}
