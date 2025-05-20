import React, { useEffect } from 'react';

// This component adds structured data to help search engines understand the business information
const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "name": "Ekdant Multi Speciality and Implant Center",
    "image": "/images/brand/logo-ekdant-new.jpg",
    "url": "https://www.ekdantclinic.com",
    "telephone": "+917900139417",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Office No 8 and 9, 1st Floor, Gami Terra, Sector-6",
      "addressLocality": "Sanpada",
      "addressRegion": "Navi Mumbai",
      "postalCode": "400705",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 19.0631,
      "longitude": 73.0095
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "09:00",
        "closes": "21:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "10:00",
        "closes": "14:00"
      }
    ],
    "sameAs": [
      "https://g.page/ekdant-multi-speciality-implant-center",
      "https://www.facebook.com/ekdantclinic",
      "https://www.instagram.com/ekdantclinic"
    ]
  };

  useEffect(() => {
    // Add structured data to the document head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      // Clean up when component unmounts
      document.head.removeChild(script);
    };
  }, []);

  // This component doesn't render anything visible
  return null;
};

export default StructuredData;