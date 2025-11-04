import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export const SEOManager: React.FC<SEOProps> = ({
  title = "Kapil Niure - Web Developer & Designer | Portfolio",
  description = "Kapil Niure - Professional Web Developer & Designer specializing in React, TypeScript, and modern web technologies. Based in Tokyo, Japan. View portfolio and get in touch.",
  keywords = "kapil niure, website, portfolio, web developer, designer, react, typescript, javascript, frontend, fullstack, tokyo, japan, freelance",
  image = "/images/profile.jpg",
  url = "https://kapilniure.dev",
  type = "website",
  author = "Kapil Niure",
  publishedTime,
  modifiedTime
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Kapil Niure",
    "alternateName": "Niure Kapil",
    "description": "Web Developer and Designer specializing in React and TypeScript",
    "jobTitle": "Web Developer & Designer",
    "url": url,
    "image": image,
    "sameAs": [
      "https://github.com/Kaepilz",
      "https://www.linkedin.com/in/kapil-niure",
      "https://www.facebook.com/niure.kapil"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kiyose",
      "addressRegion": "Tokyo",
      "addressCountry": "Japan"
    },
    "email": "kapilniure4@gmail.com",
    "telephone": "+81-70-2247-2273",
    "knowsAbout": [
      "Web Development",
      "React",
      "TypeScript",
      "JavaScript",
      "UI/UX Design",
      "Node.js",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Firebase"
    ],
    "workExample": [
      {
        "@type": "CreativeWork",
        "name": "E-Commerce Platform",
        "description": "Modern e-commerce platform with full shopping cart functionality and payment integration",
        "url": "/projects/ecommerce-platform"
      },
      {
        "@type": "CreativeWork", 
        "name": "Finance Dashboard",
        "description": "Comprehensive finance dashboard with data visualization and user analytics",
        "url": "/projects/finance-dashboard"
      },
      {
        "@type": "CreativeWork",
        "name": "Travel Agency Website",
        "description": "Beautiful travel agency website design with booking functionality",
        "url": "/projects/travel-agency-website"
      }
    ],
    "offers": {
      "@type": "Offer",
      "description": "Web Development and Design Services",
      "serviceType": [
        "Web Development",
        "UI/UX Design", 
        "Brand Identity Design",
        "Mobile-First Development"
      ]
    }
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="en" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Viewport and Mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#3b82f6" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Kapil Niure Portfolio" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="ja_JP" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      <meta property="article:author" content={author} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:creator" content="@kapilniure" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      
      {/* DNS Prefetch for performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//images.unsplash.com" />
      
      {/* Favicon and App Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Alternative languages */}
      <link rel="alternate" hrefLang="en" href={url} />
      <link rel="alternate" hrefLang="ja" href={`${url}?lang=jp`} />
      <link rel="alternate" hrefLang="x-default" href={url} />
      
      {/* Security Headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=(), interest-cohort=()" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Additional structured data for breadcrumbs */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": url
            },
            {
              "@type": "ListItem", 
              "position": 2,
              "name": "About",
              "item": `${url}#about`
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Projects", 
              "item": `${url}#projects`
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": "Contact",
              "item": `${url}#contact`
            }
          ]
        })}
      </script>
      
      {/* Website structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Kapil Niure Portfolio",
          "description": description,
          "url": url,
          "author": {
            "@type": "Person",
            "name": author
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${url}/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          }
        })}
      </script>
    </Helmet>
  );
};