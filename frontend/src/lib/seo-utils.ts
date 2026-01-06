/**
 * SEO Utilities for Satish Mahato Portfolio
 * Centralized SEO configuration and structured data generation
 */

export const siteConfig = {
  name: "Satish Mahato",
  url: "https://msatish.com.np",
  title: "Satish Mahato | Full Stack Developer - MERN, Next.js, AI Integration - Nepal",
  description: "Full Stack Developer in Nepal specializing in MERN stack, Next.js, React, Node.js, Express, MongoDB, AI integrations (OpenAI, Gemini), AWS, DevOps, and modern web development. Building scalable web applications and REST APIs.",
  email: "mahatosatish463@gmail.com",
  twitter: "@satishmahato13",
  social: {
    github: "https://github.com/satish463143",
    linkedin: "https://www.linkedin.com/in/satish-mahato-233151257/",
    instagram: "https://www.instagram.com/satishmahato13/",
  },
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
  ],
};

// Skills and technologies
export const skills = [
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
  "WebSockets",
];

// Generate Person JSON-LD Schema
export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}/logo.png`,
    jobTitle: "Full Stack Developer",
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressCountry: "Nepal",
    },
    email: siteConfig.email,
    knowsAbout: skills,
    sameAs: Object.values(siteConfig.social),
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Full Stack Web Development",
    },
    hasOccupation: {
      "@type": "Occupation",
      name: "Full Stack Developer",
      occupationLocation: {
        "@type": "Country",
        name: "Nepal",
      },
      estimatedSalary: {
        "@type": "MonetaryAmountDistribution",
        name: "Freelance",
        currency: "USD",
      },
      skills: "MERN Stack, Next.js, AI Integration, REST APIs, Cloud Services, DevOps",
    },
  };
}

// Generate Website JSON-LD Schema
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${siteConfig.name} Portfolio`,
    url: siteConfig.url,
    description: "Full Stack Developer portfolio showcasing web development projects and services",
    author: {
      "@type": "Person",
      name: siteConfig.name,
    },
    inLanguage: "en-US",
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      "@type": "Person",
      name: siteConfig.name,
    },
  };
}

// Generate Organization/ProfessionalService JSON-LD Schema
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description: "Full-stack web development services specializing in MERN stack, Next.js, AI integrations, and cloud solutions",
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    image: `${siteConfig.url}/logo.png`,
    telephone: "",
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressCountry: "Nepal",
    },
    geo: {
      "@type": "GeoCoordinates",
      addressCountry: "Nepal",
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    priceRange: "$$",
    sameAs: Object.values(siteConfig.social),
    founder: {
      "@type": "Person",
      name: siteConfig.name,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Full-Stack Web Apps",
            description: "End-to-end MERN stack applications with modern architecture",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "REST APIs + WebSockets",
            description: "Real-time data communication and robust API design",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Features Integration",
            description: "Intelligent features powered by OpenAI & Gemini",
          },
        },
      ],
    },
  };
}

// Generate FAQ JSON-LD Schema
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// Generate CreativeWork/Portfolio JSON-LD Schema
export function generatePortfolioSchema(
  projects: Array<{
    name: string;
    description?: string;
    url?: string;
    image: string;
    technologies: string[];
    datePublished?: string;
  }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: projects.map((project, index) => ({
      "@type": "CreativeWork",
      position: index + 1,
      name: project.name,
      description: project.description || "",
      url: project.url || "",
      image: project.image.startsWith("http") ? project.image : `${siteConfig.url}${project.image}`,
      author: {
        "@type": "Person",
        name: siteConfig.name,
      },
      keywords: project.technologies.join(", "),
      datePublished: project.datePublished || new Date().getFullYear().toString(),
      programmingLanguage: project.technologies,
    })),
  };
}

// Generate BreadcrumbList JSON-LD Schema
export function generateBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${siteConfig.url}#services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Portfolio",
        item: `${siteConfig.url}#portfolio`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Contact",
        item: `${siteConfig.url}#contact`,
      },
    ],
  };
}

// Helper function to generate all schemas at once
export function generateAllSchemas(data?: {
  faqs?: Array<{ question: string; answer: string }>;
  projects?: Array<{
    name: string;
    description?: string;
    url?: string;
    image: string;
    technologies: string[];
  }>;
}) {
  return {
    person: generatePersonSchema(),
    website: generateWebsiteSchema(),
    organization: generateOrganizationSchema(),
    faq: data?.faqs ? generateFAQSchema(data.faqs) : null,
    portfolio: data?.projects ? generatePortfolioSchema(data.projects) : null,
    breadcrumb: generateBreadcrumbSchema(),
  };
}

// Open Graph image dimensions
export const ogImageDimensions = {
  width: 1200,
  height: 630,
};

// Twitter card config
export const twitterConfig = {
  card: "summary_large_image" as const,
  creator: siteConfig.twitter,
};

