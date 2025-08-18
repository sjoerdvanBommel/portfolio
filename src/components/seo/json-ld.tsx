interface JsonLdProps {
  data: object
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}

// Personal profile structured data
export function PersonJsonLd() {
  const personData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sjoerd van Bommel',
    jobTitle: 'Senior Software Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Cimpress Technology',
    },
    url: 'https://sjoerdvanbommel.nl',
    sameAs: [
      'https://www.linkedin.com/in/sjoerdvanbommel',
      'https://github.com/sjoerdvanbommel',
      'https://www.youtube.com/@sjoerdvanbommel',
    ],
    knowsAbout: [
      'TypeScript',
      'JavaScript',
      'React',
      'Web Development',
      'Software Engineering',
      'Frontend Development',
      'Backend Development',
    ],
    alumniOf: 'Software Engineering',
    nationality: 'Netherlands',
    description:
      'Senior Software Engineer at Cimpress Technology specializing in TypeScript, React, and web development. Creator of educational content about advanced programming concepts.',
  }

  return <JsonLd data={personData} />
}

// Website structured data
export function WebsiteJsonLd() {
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Sjoerd van Bommel Portfolio',
    url: 'https://sjoerdvanbommel.nl',
    description:
      'Portfolio website of Sjoerd van Bommel, Senior Software Engineer specializing in TypeScript and web development',
    author: {
      '@type': 'Person',
      name: 'Sjoerd van Bommel',
    },
    inLanguage: 'en-US',
  }

  return <JsonLd data={websiteData} />
}

// Professional service structured data
export function ProfessionalServiceJsonLd() {
  const serviceData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'TypeScript & Web Development Consulting',
    description: 'Expert TypeScript, React, and web development services',
    provider: {
      '@type': 'Person',
      name: 'Sjoerd van Bommel',
    },
    areaServed: 'Worldwide',
    serviceType: [
      'Software Development',
      'TypeScript Consulting',
      'React Development',
      'Web Development Training',
    ],
  }

  return <JsonLd data={serviceData} />
}
