import type { Metadata } from "next";
import { AuthProvider } from "./Providers";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Used Cars Shop", // Title of the website
  description: "Technical test by Samuel Besson",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          <section className="w-full bg-white p-5 ">{children}</section>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
