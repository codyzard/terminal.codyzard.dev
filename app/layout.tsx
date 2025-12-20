import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Terminal Portfolio - Codyzard.dev',
  description: "Le Hoang Tu's developer portfolio presented as a command-line interface.",
  keywords: [
    'developer',
    'portfolio',
    'terminal',
    'software engineer',
    'react',
    'nextjs',
    'typescript',
    'web development',
  ],
  authors: [{name: 'Le Hoang Tu', url: 'https://terminal.codyzard.dev'}],
  creator: 'Le Hoang Tu',
  metadataBase: new URL('https://terminal.codyzard.dev'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://terminal.codyzard.dev',
    title: 'Le Hoang Tu | Terminal Portfolio',
    description: "Le Hoang Tu's developer portfolio presented as a command-line interface.",
    siteName: 'Codyzard.dev',
    images: [
      {
        url: '/assets/images/profile.jpg',
        width: 1200,
        height: 630,
        alt: 'Le Hoang Tu - Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Le Hoang Tu | Terminal Portfolio',
    description: "Le Hoang Tu's developer portfolio presented as a command-line interface.",
    images: ['/assets/images/profile.jpg'],
    creator: '@codyzard',
    site: '@codyzard',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Le Hoang Tu',
    url: 'https://terminal.codyzard.dev',
    image: 'https://terminal.codyzard.dev/assets/images/profile.jpg',
    sameAs: [
      'https://github.com/codyzard',
      'https://www.linkedin.com/in/l%C3%AA-ho%C3%A0ng-t%C3%BA-676b89136/',
    ],
    jobTitle: 'Software Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Codyzard.dev',
    },
    description: "Le Hoang Tu's developer portfolio presented as a command-line interface.",
  }

  return (
    <html lang='en'>
      <head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
        />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
