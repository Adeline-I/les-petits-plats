import Header from "@/components/Header/Header";
import SearchBar from "@/components/SearchBar/SearchBar";
import recipes from "@/data/recipes.json";

export default function Home() {
  return (
    <>
      <Header variant="expanded">
        <h1>
          Découvrez nos recettes
          <br />
          du quotidien, simples et délicieuses
        </h1>
        <SearchBar />
      </Header>

      <main>
        <p>${recipes.length} recettes</p>
      </main>
    </>
  );
}
