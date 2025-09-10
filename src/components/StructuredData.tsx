export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Job Application Dashboard",
    "description": "A modern, intuitive dashboard to track and manage your job applications. Add, edit, filter, and organize all your job applications in one place with a clean, professional interface.",
    "url": "https://job-application-dashboard.vercel.app/",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "permissions": "No special permissions required",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Organization",
      "name": "Job Application Dashboard"
    },
    "screenshot": {
      "@type": "ImageObject",
      "url": "https://job-application-dashboard.vercel.app/Image/screenshot.png",
      "description": "Job Application Dashboard Screenshot"
    },
    "featureList": [
      "Job Application Tracking",
      "Application Status Management",
      "Search and Filter Applications", 
      "Export Application Data",
      "Responsive Design",
      "Modern UI/UX"
    ],
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "softwareVersion": "1.0.0",
    "datePublished": "2025-09-10"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  );
}
