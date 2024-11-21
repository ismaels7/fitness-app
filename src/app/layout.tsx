import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { ClientLayout } from "./custom-components/ClientLayout/ClientLayout";
import { ChakraProvider } from "@chakra-ui/react";

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
        <ChakraProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </ChakraProvider>
          </div>
        </div>
      </body>
    </html>
  );
}

