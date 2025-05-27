import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { NavProvider } from "@/context/NavContext";
import { fetchDataServer } from "@/lib/api";
import Script from "next/script";
// import "./globals.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GeneralData, PagesData, NavItem, SocialLinks } from "@/types";
import { AppDataProvider } from "@/context/AppDataContext";
// import Header from "./components/Header/Header";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MediaCollaborators from "./components/MediaCollaborators";
import PartneredContent from "./components/PartneredContent";
// import { useAppData } from "../context/AppDataContext";


// const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchDataServer();
  const general = data?.data || ({} as GeneralData);
  const pageData = data?.pages || ({} as PagesData);
  const eventName = `${general?.clname || "Annual Tech Conference"} ${general?.year || ""
    }`.trim();

  return {
    title: eventName,
    description: pageData?.register?.[0]?.content || "",
    icons: {
      icon: `${general?.site_url || ""}/favicon.png`,
    },
    openGraph: {
      images: `${general?.site_url || ""}/images/images/opengraph_image.jpg`,
    },
  };
}

function formatDate(
  dateString: string | undefined,
  defaultTime: string
): string {
  if (!dateString) return "";

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    // Check if the date string includes time
    const hasTime = dateString.includes("T");
    const hours = hasTime
      ? String(date.getHours()).padStart(2, "0")
      : defaultTime.split(":")[0];
    const minutes = hasTime
      ? String(date.getMinutes()).padStart(2, "0")
      : defaultTime.split(":")[1];

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await fetchDataServer();
  const general: GeneralData = data?.data || ({} as GeneralData);
  const pageData: PagesData = data?.pages || ({} as PagesData);
  const navItems: NavItem[] = data?.display_features || [];
  const socialLinks: SocialLinks = data?.social_links || {
    facebook: { link: "", title: "" },
    linkedin: { link: "", title: "" },
    instagram: { link: "", title: "" }
  };

  const eventName = `${general?.clname || "Annual Tech Conference"} ${general?.year || ""
    }`.trim();
  const register = pageData?.register || [];

  // Format dates
  const formattedStartDate =
    formatDate(general?.startDate, "09:00") || "2024-05-01T09:00";
  const formattedEndDate =
    formatDate(general?.endDate, "17:00") || "2024-05-01T17:00";

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: eventName,
    startDate: formattedStartDate,
    endDate: formattedEndDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: `${general?.site_url || ""}/images/images/opengraph_image.jpg`,
    description: register[0]?.content || "",
    location: {
      "@type": "Place",
      name: general?.venue_p1,
      address: {
        "@type": "PostalAddress",
        streetAddress: `Location: ${general?.venue_p1 || ""}.`,
        addressLocality: general?.v1,
        addressRegion: general?.v2,
        postalCode: ".",
        addressCountry: general?.v2,
      },
    },
    offers: {
      "@type": "Offer",
      url: `${general?.site_url || ""}/register`,
      price: general?.offerPrice || "$449",
      priceCurrency: general?.offerCurrency || "USD",
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
    },
  };

  // console.log("layout data",data, "ooooooooooo");

  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-S9QFE3JLKN"
          strategy="afterInteractive"
        />
        <Script id="google-tag-manager-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S9QFE3JLKN');
          `}
        </Script>

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <AppDataProvider
          general={general}
          pages={pageData}
          navItems={navItems}
          socialLinks={socialLinks}
        >
          <NavProvider initialData={data}>
            <Header />
            {children}
            <MediaCollaborators />
            <PartneredContent />
            <Footer socialLinks={socialLinks} />
          </NavProvider>
        </AppDataProvider>
      </body>
    </html>
  );
}