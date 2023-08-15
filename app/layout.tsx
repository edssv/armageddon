import clsx from 'clsx';

import './globals.css';

import type { Metadata } from 'next';
import { Passion_One } from 'next/font/google';
import localFont from 'next/font/local';

import { siteConfig } from '@/config/site';
import { ContextProvider } from '@/components/providers/context-provider';
import { QueryProvider } from '@/components/providers/query-provider';

const fontSans = localFont({
  src: [
    { path: '../assets/fonts/Helvetica.woff2', weight: '400' },
    { path: '../assets/fonts/Helvetica-Bold.woff2', weight: '700' },
  ],
  variable: '--font-sans',
});

export const fontHeading = Passion_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['Space', 'Asteroids', 'Nasa'],
  authors: [
    {
      name: 'Eduard Sysoev',
      url: 'https://vk.com/sysoeev',
    },
  ],
  creator: 'Eduard Sysoev',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={clsx(
          fontSans.className,
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <ContextProvider>
          {' '}
          <QueryProvider>{children}</QueryProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
