
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MAGMAYONHBITAW DINING | Restaurant & Cafe",
  description:
    "Order delicious meals online with MAGMAYONHBITAW DINING. Enjoy fresh ingredients, quality food, and exceptional service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
