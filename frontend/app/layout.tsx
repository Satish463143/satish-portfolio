import { Inter, DM_Serif_Display } from "next/font/google";
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar  from "@/components/common/Navbar/Navbar";
import BottomDesktopNavbar from "@/components/common/BottomDesktopNavbar/BottomDesktopNavbar";
import { ThemeProvider } from "next-themes";
import ThemeToggle from "@/components/common/ThemeToggle/ThemeToggle";
import Footer from "@/components/common/Footer/Footer";
import ScrollProgress from "@/components/common/ScrollProgress/ScrollProgress";

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

export const metadata: Metadata = {
  title: "Satish Mahato | Full-Stack MERN + AI Developer",
  description: "Premium full-stack web development services specializing in MERN stack, Next.js, AI integrations (OpenAI/Gemini), DevOps/CI/CD, and cloud solutions (AWS S3/GCP).",
  keywords: ["Full-Stack Developer", "MERN Stack", "Next.js", "AI Integration", "OpenAI", "Gemini AI", "DevOps", "AWS", "GCP", "Web Development"],
  authors: [{ name: "Satish Mahato" }],
  creator: "Satish Mahato",
  publisher: "Satish Mahato",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://msatish.com.np",
    title: "Satish Mahato | Full-Stack MERN + AI Developer",
    description: "Building high-performance web products with AI integrations and modern technologies.",
    siteName: "Satish Mahato",
  },
  twitter: {
    card: "summary_large_image",
    title: "Satish Mahato | Full-Stack MERN + AI Developer",
    description: "Building high-performance web products with AI integrations and modern technologies.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/s-logo.png" />
        <meta name="theme-color" content="#ff7000" />
      </head>
      <body className="bg-[var(--bg-main)] text-[var(--text-primary)]">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <ScrollProgress />
          <Navbar />
          <ThemeToggle />
          <main className="">
            {children}
          </main>
          <BottomDesktopNavbar />
          <Footer />
        </ThemeProvider>
        
        <Script
          id="org-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Satish Mahato",
              "description": "Full-stack web development and AI integration services",
              "url": "https://msatish.com.np",
              "logo": "https://msatish.com.np/logo.png",
              "sameAs": [
                "https://github.com/satish463143",
                "https://www.linkedin.com/in/satish-mahato-233151257/"
              ]
            })
          }}
        />
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
    </html>
  );
}
