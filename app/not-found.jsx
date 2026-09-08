import Header from "@/components/Header/Header";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <Header variant="expanded" fullHeight>
      <h1>404 :(</h1>
      <p className={styles.message}>
        La page que vous demandez est introuvable.
      </p>
    </Header>
  );
}
