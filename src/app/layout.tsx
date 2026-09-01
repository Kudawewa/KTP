import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import LenisScroll from "@/components/LenisScroll";
import ScrollToTop from "@/components/ScrollToTop";

const dmSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
});

// Configure Inter for body text
const inter = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
});

// Configure Geist Sans for headers
const geistSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
});

// Configure Geist Mono for technical elements
const geistMono = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
});

// Configure Bebas Neue for accent elements
const bebasNeue = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Kewdale Tyrepower Perth's Trusted Tyre Specialists",
  description:
    "Fast, transparent, done-right-first-time tyre service in Kewdale, Perth. Upfront pricing, 90-min average service, 300+ 5-star Google reviews. Book online or call (08) 9359 1444.",
  keywords:
    "tyres, wheels, tyre shop, Kewdale, Perth, wheel alignment, tyre fitting, puncture repair, Tyrepower",
  openGraph: {
    title: "Kewdale Tyrepower — Back On The Road Before Lunch",
    description:
      "Perth's trusted tyre specialists. Fast service, honest pricing, done right first time. 300+ 5-star Google reviews.",
    type: "website",
    locale: "en_AU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${bebasNeue.variable} ${dmSans.className}  ${inter.variable} ${geistMono.variable} ${geistSans.variable} antialiased`}
      >
        <LenisScroll>{children}</LenisScroll>
        <ScrollToTop />
      </body>
    </html>
  );
}
