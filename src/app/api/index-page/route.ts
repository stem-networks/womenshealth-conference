import { NextResponse } from "next/server";
import { getIndexPageData } from "@/lib/getIndexPageData";

export async function POST() {
  try {
    const jsonData = await getIndexPageData();
    return NextResponse.json({
      oneliner: jsonData.oneliner,
      bannerContent: jsonData.banner_conent, // note: spelling as in your JSON/file!
      sessions: jsonData.sessions,
      importantDates: jsonData.important_dates,
      venueImages: jsonData.venue_images || {},
    });
  } catch (error) {
    console.error("Error reading index_page.json:", error);
    return NextResponse.json(
      { error: "Failed to load index page data" },
      { status: 500 }
    );
  }
}
