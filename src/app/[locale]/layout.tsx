import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import CustomCursor from "@/components/ui/CustomCursor";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const satoshi = localFont({
  src: "/../../../public/fonts/Satoshi-Variable.woff2",
  variable: "--font-title",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("Metadata");

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `https://dasfax.3034.tech/${locale}`,
      languages: routing.locales.reduce((acc, curr) => {
        acc[curr] = `https://dasfax.3034.tech/${curr}`;
        return acc;
      }, {} as Record<string, string>),
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `https://dasfax.3034.tech/${locale}`,
      siteName: "Dasfax3034",
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      creator: "@dasfax3034",
    },
    metadataBase: new URL("https://dasfax.3034.tech"),
  };
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} ${satoshi.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
                <CustomCursor />
          <NextIntlClientProvider locale={locale}>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
