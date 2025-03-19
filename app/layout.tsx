import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OrderIt",
  description: "AI Powered Order Management Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
