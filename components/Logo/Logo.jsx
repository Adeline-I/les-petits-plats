import Image from "next/image";
import Link from "next/link";
import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <Link href="/" className={styles.logo}>
      <Image
        src="/images/logo.svg"
        alt="Les Petits Plats"
        width={207}
        height={25}
        unoptimized
      />
    </Link>
  );
}
