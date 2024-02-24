'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import 'rsuite/dist/rsuite-no-reset.min.css';
import { CustomProvider } from 'rsuite';

import SidenavComponent from "_components/Nav/nav";

const inter = Inter({ subsets: ["latin"] });

const RsuiteProvider = ({ children }: { children: React.ReactNode }) => (
  <CustomProvider>{children}</CustomProvider>
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <RsuiteProvider>
         <SidenavComponent >
         {children}
         </SidenavComponent>         
        </RsuiteProvider>
        </body>
    </html>
  );
}
