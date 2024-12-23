import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from "./components/layout/GlobalProvider";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Funmight-admin",
  description: "An admin dashboard for funmight.com",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientLayout>
        {children}

        </ClientLayout>
       
        
      </body>
    </html>
  );
}
