import type { Metadata } from "next";
import "./globals.css";
import Provider from "./provider"
import React from "react";
import { ClientLayout } from "./custom-components/ClientLayout/ClientLayout";

export const metadata: Metadata = {
  title: "Fitness App",
  description: "Check your favorites exercises",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-400">
        <div className="global-container">
          <div className="content-container">
        <Provider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </Provider>
          </div>
        </div>
      </body>
    </html>
  );
}
