import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { HeaderNav } from '@/components/navigation/HeaderNav';
import { Footer } from '@/components/layout/Footer';
// Load Inter for body/UI text
const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});
// Load Playfair Display for headings
const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
});
export const metadata = {
    title: "Tours & Travels — Kashmir & International Packages",
    description: "Discover premium Kashmir valley tours, international luxury packages and custom travel experiences. Chat directly on WhatsApp to book your dream trip.",
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
