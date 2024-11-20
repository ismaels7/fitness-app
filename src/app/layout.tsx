import type { Metadata } from "next";
import "./globals.css";
import Provider from "./provider"
import { CategoryBanner } from "./custom-components/CategoryBanner/CategoryBanner";

export const metadata: Metadata = {
  title: "Fitness App",
  description: "Check your favorites exercises",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categoryData = {
    name: "", url: ""
  }
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-400">
        <div className="global-container">
          <div className="content-container">
        <Provider>
        <CategoryBanner category={categoryData} />
          {children}
        </Provider>
          </div>
        </div>
      </body>
    </html>
  );
}
