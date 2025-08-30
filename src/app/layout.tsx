import { ChatProvider } from '@/contexts/ChatContext';

import type { Metadata } from 'next';

import './globals.css';

const title = 'Signal – A Portfolio You Can Talk To';
const description =
  'Signal is a conversational portfolio where you can explore my projects, career, and leadership style through an interactive chat.';
const url = 'https://signal.abruno.net';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: 'website',
    url,
    title,
    description,
    images: [
      {
        url: `${url}/og-share.png`,
        width: 1200,
        height: 630,
        alt: 'Signal preview image',
      },
    ],
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg width="138" height="150" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(%23a)" fill="%2300966d"><path d="M0 141.1v-.3a9 9 0 0 1 7.8-8.8 57.6 57.6 0 0 0 0-114A9 9 0 0 1 0 9.1v-.3C0 3.5 4.7-.6 10 0a75.6 75.6 0 0 1 0 149.8c-5.3.7-10-3.4-10-8.8Z"/><path d="m70.7 141.6-.2-.2a8.8 8.8 0 0 1-1-11.8 88.3 88.3 0 0 0 .2-109.2 8.8 8.8 0 0 1 1-11.8l.1-.3a8.8 8.8 0 0 1 13 1 106.3 106.3 0 0 1-.1 131.4 8.8 8.8 0 0 1-13 1Z"/><path d="m110 141.7-.2-.1a8.9 8.9 0 0 1-3.2-11.6 118.6 118.6 0 0 0 0-110A8.9 8.9 0 0 1 110 8.4l.2-.1a8.8 8.8 0 0 1 12.4 3.4 136.6 136.6 0 0 1 0 126.6 8.8 8.8 0 0 1-12.5 3.4ZM0 46.6a9.6 9.6 0 0 1 12.4-9.2 39.6 39.6 0 0 1 0 75.2A9.6 9.6 0 0 1 0 103.4V46.6Z"/></g><defs><clipPath id="a"><path fill="%23fff" d="M0 0h138v150H0z"/></clipPath></defs></svg>',
        type: 'image/svg+xml',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-tony-off-white dark:bg-tony-800 text-tony-700 dark:text-tony-100">
        <ChatProvider>{children}</ChatProvider>
      </body>
    </html>
  );
}
