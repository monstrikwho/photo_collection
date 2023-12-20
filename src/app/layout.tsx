import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Container } from "@mui/material";
import { Providers } from "./_providers";
import Navbar from "./_components/Navbar/Navbar";
import "./_styles/global.sass";

const interSans = Inter({
  subsets: ["cyrillic"],
});

export const metadata: Metadata = {
  title: "Photo Collection",
  description: "Your favorite photo collection.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
      </head>
      <body className={interSans.className}>
        <Providers>
          <Container maxWidth="md" sx={{ padding: "20px 16px 100px 16px" }}>
            {children}
            <Navbar />
          </Container>
        </Providers>
      </body>
    </html>
  );
}
