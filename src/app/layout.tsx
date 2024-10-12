import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";



import { esES } from '@clerk/localizations'

import {
  ClerkProvider,
} from '@clerk/nextjs'
import QueryProvider from "@/providers/query-provider";

import { SheetProvider } from "@/providers/sheet-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.APP_URL
      ? `${process.env.APP_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : `http://localhost:${process.env.PORT || 3000}`
  ),
  title: "Thrift",
  description:
    "Thrift es una aplicación web para el registro y control de egresos e ingresos, diseñada para ayudarte a gestionar tus finanzas de manera sencilla y eficiente.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    url: "/",
    title: "Thrift",
    description:
      "Thrift es una aplicación web que te permite llevar un registro detallado de tus egresos e ingresos, facilitando el control de tus finanzas personales.",
    type: "website"
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={esES} >
      <html lang="en" suppressHydrationWarning>
        <body className={GeistSans.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toaster closeButton/>
            <QueryProvider>
              <SheetProvider />
              {children}
            </QueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
