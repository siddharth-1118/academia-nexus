import type { Metadata } from 'next';
import { Providers } from '@/app/providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Academia Nexus',
  description: 'A futuristic, interactive dashboard for SRM Academia with 3D elements, real-time analytics, and creative visualizations.',
  keywords: 'SRM, academia, dashboard, 3D, analytics, visualization',
  authors: [{ name: 'Siddharth' }],
  creator: 'Siddharth',
  publisher: 'Academia Nexus',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="bg-black text-white overflow-x-hidden">
        <Providers>
          <main className="min-h-screen w-full">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
