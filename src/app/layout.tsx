import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./_component/navbars/navbar";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <div className="flex-1 max-w-screen-xl mx-auto">
          {children}
        </div>
      </body>
    </html >
  );
}
