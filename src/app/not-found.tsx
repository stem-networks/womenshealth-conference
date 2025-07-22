// app/not-found.tsx Page

import Link from "next/link";
import { Metadata } from "next";

import { getBaseUrl } from "@/lib/getBaseUrl";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = getBaseUrl() || "";
  const canonicalURL = `${baseUrl}/not-found`;

  return {
    title: "404 - Page Not Found",
    description: "The page you are looking for doesn't exist.",
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalURL,
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function NotFound() {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h2>404</h2>
        </div>
        <h2>Oops! Nothing was found</h2>
        <p>
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </p>
        <Link href="/" title="Return to homepage">
          Return to homepage
        </Link>
      </div>
    </div>
  );
}
