import { Inter, DM_Serif_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar  from "@/components/common/Navbar/Navbar";
import BottomDesktopNavbar from "@/components/common/BottomDesktopNavbar/BottomDesktopNavbar";
import { ThemeProvider } from "next-themes";
import ThemeToggle from "@/components/common/ThemeToggle/ThemeToggle";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable}`} suppressHydrationWarning>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <body  className="bg-[var(--bg-main)] text-[var(--text-primary)]">
        <Script
          id="org-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
        />
        <Navbar />
        <ThemeToggle />
        <main className="pb-32 lg:pb-32">
          {children}
        </main>
        <BottomDesktopNavbar />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXX"
          strategy="afterInteractive"
        />
        <Script id="gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXX');
          `}
        </Script>
      </body>
      </ThemeProvider>
    </html>
  );
}
