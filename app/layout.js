import { Anton, Manrope } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata = {
  title: "Les Petits Plats",
  description:
    "Trouvez des recettes de cuisine à partir des ingrédients que vous avez",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${anton.variable} ${manrope.variable}`}>
      <body>
        <div className="pageContent">{children}</div>
      </body>
    </html>
  );
}
