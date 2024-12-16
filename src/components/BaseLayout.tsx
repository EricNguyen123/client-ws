import localFont from "next/font/local";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {ReactNode} from 'react';
import Navigation from './Navigation';
import { ThemeProvider } from "./theme/ThemeProvider";
import { StoreProvider } from "@/store/StoreProvider";
import { Toaster } from "./ui/toaster";

const geistSans = localFont({
  src: "../app/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../app/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
type Props = {
  children: ReactNode;
  locale: string;
};

export default async function BaseLayout({children, locale}: Props) {
  const messages = await getMessages();

  return (
    <StoreProvider>
      <html className="h-full" lang={locale} suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex h-full flex-col`}>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <NextIntlClientProvider messages={messages}>
                <Navigation />
                {children}
                <Toaster />
              </NextIntlClientProvider>
            </ThemeProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
