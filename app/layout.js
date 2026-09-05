import "./globals.css";

export const metadata = {
  title: "Les Petits Plats",
  description:
    "Trouvez des recettes de cuisine à partir des ingrédients que vous avez",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
