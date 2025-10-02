import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import "../styles/globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  display: "swap",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Nexo - Link Manager",
  description: "A link manager developed by IFCE students",
  icons: {
    icon: '/nexo-fav.ico'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bebasNeue.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
