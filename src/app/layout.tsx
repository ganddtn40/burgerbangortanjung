import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import ClientProviders from '@/components/ClientProviders';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Burger Bangor Tanjung | Taste the Rebellion',
  description:
    'Smash burger terbaik di Tanjung. Dibuat segar, bahan lokal, dan di-smash sampai sempurna.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={outfit.variable}>
      <body className="antialiased bg-background text-foreground">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
