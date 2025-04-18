// app/layout.jsx
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { Providers } from "./providers";
import "bootstrap/dist/css/bootstrap.min.css";

// Tối ưu hóa font loading với preload
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
});

export const metadata = {
  title: {
    default: "Hoa Van - Thời trang cao cấp",
    template: "%s | Hoa Van"
  },
  description: "Hoa Van - Thương hiệu thời trang cao cấp, mang đến những thiết kế độc đáo và chất lượng. Chuyên cung cấp quần áo, phụ kiện thời trang cho nam và nữ.",
  keywords: ["thời trang", "quần áo", "phụ kiện", "thời trang nam", "thời trang nữ"],
  authors: [{ name: "Hoa Van" }],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Hoa Van - Thời trang cao cấp",
    description: "Hoa Van - Thương hiệu thời trang cao cấp, mang đến những thiết kế độc đáo và chất lượng",
    url: 'https://hoavan.com',
    siteName: 'Hoa Van',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hoa Van',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={inter.variable}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <Providers>
          <Header />
          <main className="min-vh-100">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
