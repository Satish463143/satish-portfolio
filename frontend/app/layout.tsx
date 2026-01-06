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

const siteUrl = "https://msatish.com.np";
const siteTitle = "Satish Mahato | Full Stack Developer - MERN, Next.js, AI Integration - Nepal";
const siteDescription = "Full Stack Developer in Nepal specializing in MERN stack, Next.js, React, Node.js, Express, MongoDB, AI integrations (OpenAI, Gemini), AWS, DevOps, and modern web development. Building scalable web applications and REST APIs.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Satish Mahato",
  },
  description: siteDescription,
  keywords: [
    "Full Stack Developer Nepal",
    "MERN Stack Developer",
    "Next.js Developer Nepal",
    "React Developer",
    "Node.js Developer",
    "Frontend Developer Nepal",
    "Backend Developer",
    "AI Integration Developer",
    "OpenAI Developer",
    "Gemini AI Integration",
    "MongoDB Expert",
    "Express.js Developer",
    "REST API Development",
    "Web Developer Nepal",
    "AWS Developer",
    "DevOps Engineer",
    "Satish Mahato",
    "Satish",
  ],
  authors: [{ name: "Satish Mahato", url: siteUrl }],
  creator: "Satish Mahato",
  publisher: "Satish Mahato",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: "Satish Mahato Portfolio",
    images: [
      {
        url: `${siteUrl}/logo.png`,
        width: 1200,
        height: 630,
        alt: "Satish Mahato - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [`${siteUrl}/logo.png`],
    creator: "@satishmahato13",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
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
          <header>
            <Navbar />
          </header>
          <ThemeToggle />
          <main id="main-content" role="main" aria-label="Main content">
            {children}
          </main>
          <BottomDesktopNavbar />
          <Footer />
        </ThemeProvider>
        
        {/* Person Schema - Primary Entity */}
        <Script
          id="person-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Satish Mahato",
              "url": "https://msatish.com.np",
              "image": "https://msatish.com.np/logo.png",
              "jobTitle": "Full Stack Developer",
              "description": "Full Stack Developer specializing in MERN stack, Next.js, AI integrations, and modern web development",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "Nepal"
              },
              "email": "mahatosatish463@gmail.com",
              "knowsAbout": [
                "React",
                "Next.js",
                "Node.js",
                "Express",
                "MongoDB",
                "PostgreSQL",
                "TypeScript",
                "JavaScript",
                "Tailwind CSS",
                "REST API",
                "GraphQL",
                "Socket.io",
                "OpenAI",
                "Gemini AI",
                "AWS S3",
                "Google Cloud Storage",
                "Docker",
                "GitHub Actions",
                "CI/CD",
                "DevOps",
                "Redux",
                "Framer Motion",
                "Python",
                "Django",
                "JWT Authentication",
                "WebSockets"
              ],
              "sameAs": [
                "https://github.com/satish463143",
                "https://www.linkedin.com/in/satish-mahato-233151257/",
                "https://www.instagram.com/satishmahato13/"
              ],
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "Full Stack Web Development"
              },
              "hasOccupation": {
                "@type": "Occupation",
                "name": "Full Stack Developer",
                "occupationLocation": {
                  "@type": "Country",
                  "name": "Nepal"
                },
                "estimatedSalary": {
                  "@type": "MonetaryAmountDistribution",
                  "name": "Freelance",
                  "currency": "USD"
                },
                "skills": "MERN Stack, Next.js, AI Integration, REST APIs, Cloud Services, DevOps"
              }
            })
          }}
        />

        {/* Website Schema */}
        <Script
          id="website-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Satish Mahato Portfolio",
              "url": "https://msatish.com.np",
              "description": "Full Stack Developer portfolio showcasing web development projects and services",
              "author": {
                "@type": "Person",
                "name": "Satish Mahato"
              },
              "inLanguage": "en-US",
              "copyrightYear": new Date().getFullYear(),
              "copyrightHolder": {
                "@type": "Person",
                "name": "Satish Mahato"
              }
            })
          }}
        />

        {/* Organization Schema - Personal Brand */}
        <Script
          id="organization-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Satish Mahato",
              "description": "Full-stack web development services specializing in MERN stack, Next.js, AI integrations, and cloud solutions",
              "url": "https://msatish.com.np",
              "logo": "https://msatish.com.np/logo.png",
              "image": "https://msatish.com.np/logo.png",
              "telephone": "",
              "email": "mahatosatish463@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "Nepal"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "addressCountry": "Nepal"
              },
              "areaServed": {
                "@type": "Place",
                "name": "Worldwide"
              },
              "priceRange": "$$",
              "sameAs": [
                "https://github.com/satish463143",
                "https://www.linkedin.com/in/satish-mahato-233151257/",
                "https://www.instagram.com/satishmahato13/"
              ],
              "founder": {
                "@type": "Person",
                "name": "Satish Mahato"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Web Development Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Full-Stack Web Apps",
                      "description": "End-to-end MERN stack applications with modern architecture"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "REST APIs + WebSockets",
                      "description": "Real-time data communication and robust API design"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "AI Features Integration",
                      "description": "Intelligent features powered by OpenAI & Gemini"
                    }
                  }
                ]
              }
            })
          }}
        />

        {/* FAQPage Schema */}
        <Script
          id="faq-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is your typical project timeline?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Most projects take 4-8 weeks from kickoff to deployment, depending on complexity. I work in 2-week sprints with regular check-ins and demos. Rush projects can be accommodated with adjusted scope."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do you work with startups or only established companies?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "I work with both! I have experience with early-stage startups building MVPs and established companies scaling their platforms. Each project gets the same level of attention and quality."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is included in your full-stack development service?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Full-stack service includes frontend (React/Next.js), backend (Node.js/Express), database design (MongoDB/PostgreSQL), API development, authentication, deployment, and basic DevOps. AI integrations and cloud storage are available as add-ons."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do you handle project communication and updates?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "I use Slack/Discord for daily communication, weekly video calls for sprint reviews, and project management tools (Jira/Notion) for tracking. You'll have full visibility into progress with regular demos of working features."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What happens after the project is completed?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You receive complete source code, documentation, deployment guides, and a 30-day post-launch support period. Ongoing maintenance packages are available for continued updates, bug fixes, and feature additions."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can you integrate AI features into existing applications?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely! I specialize in adding OpenAI and Gemini AI capabilities to existing apps: chatbots, content generation, image processing, speech-to-text, and custom AI workflows. Integration typically takes 1-3 weeks."
                  }
                }
              ]
            })
          }}
        />

        {/* CreativeWork Schema - Portfolio Projects */}
        <Script
          id="portfolio-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": [
                {
                  "@type": "CreativeWork",
                  "position": 1,
                  "name": "Maya Wears",
                  "description": "Modern e-commerce website with smooth checkout and mobile-first design for improved sales and brand credibility",
                  "url": "https://maya-wears.com/",
                  "image": "https://msatish.com.np/project-1.png",
                  "author": {
                    "@type": "Person",
                    "name": "Satish Mahato"
                  },
                  "keywords": "React, Node.js, Express, MongoDB, E-commerce",
                  "datePublished": "2024",
                  "programmingLanguage": ["React", "Node.js", "Express", "MongoDB"]
                },
                {
                  "@type": "CreativeWork",
                  "position": 2,
                  "name": "Bleeding Tech",
                  "description": "High-performance service-based tech website with case studies and lead-focused contact flows",
                  "url": "https://bleeding-tech.vercel.app/",
                  "image": "https://msatish.com.np/project-1.png",
                  "author": {
                    "@type": "Person",
                    "name": "Satish Mahato"
                  },
                  "keywords": "React, Node.js, Framer Motion, Express, MongoDB",
                  "datePublished": "2024",
                  "programmingLanguage": ["React", "Node.js", "Framer Motion", "Express", "MongoDB"]
                },
                {
                  "@type": "CreativeWork",
                  "position": 3,
                  "name": "Unity For Change",
                  "description": "Inclusive, accessible portfolio website for community organization highlighting values, projects, and advocacy",
                  "url": "https://www.unity4change.org.np/",
                  "image": "https://msatish.com.np/project-1.png",
                  "author": {
                    "@type": "Person",
                    "name": "Satish Mahato"
                  },
                  "keywords": "React, Python, Django, PostgreSQL, Redux",
                  "datePublished": "2024",
                  "programmingLanguage": ["React", "Python", "Django", "PostgreSQL", "Redux"]
                },
                {
                  "@type": "CreativeWork",
                  "position": 4,
                  "name": "PTE Sathi",
                  "description": "AI-powered learning platform with mock tests, real-time feedback, and progress tracking for PTE exam preparation",
                  "image": "https://msatish.com.np/project-1.png",
                  "author": {
                    "@type": "Person",
                    "name": "Satish Mahato"
                  },
                  "keywords": "React, Socket.io, Express, Redis, OpenAI, Gemini, AI, Education",
                  "datePublished": "2024",
                  "programmingLanguage": ["React", "Socket.io", "Express", "Redis", "OpenAI", "Gemini"]
                }
              ]
            })
          }}
        />

        {/* BreadcrumbList Schema for Section Navigation */}
        <Script
          id="breadcrumb-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://msatish.com.np"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Services",
                  "item": "https://msatish.com.np#services"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Portfolio",
                  "item": "https://msatish.com.np#portfolio"
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": "Contact",
                  "item": "https://msatish.com.np#contact"
                }
              ]
            })
          }}
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXX"
          strategy="beforeInteractive"
        />
        <Script id="gtag" strategy="beforeInteractive">
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
