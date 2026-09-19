import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { HeaderNav } from '@/components/navigation/HeaderNav';
import { Footer } from '@/components/layout/Footer';
// Load Inter for body/UI text
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});
// Load Playfair Display for headings
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: 'swap',
});
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0f2c3f',
};

export const metadata = {
  title: "Tours & Travels — Kashmir & International Packages",
  description: "Discover premium Kashmir valley tours, international luxury packages and custom travel experiences. Chat directly on WhatsApp to book your dream trip.",
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/apple-touch-icon-precomposed.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    title: 'Tours & Travels',
    statusBarStyle: 'default',
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
};
export default function RootLayout({ children }) {
    return (<html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-primaryText font-sans overflow-x-hidden max-w-full">
        <HeaderNav />
        <main className="grow w-full overflow-hidden">{children}</main>
        <Footer />
      </body>
    </html>);
}
