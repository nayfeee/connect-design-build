import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Connect Design & Build | Cheshire Building Services",
  description:
    "Cheshire based multi-trade building services covering extensions, kitchens, bathrooms, full refurbishments and property development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}