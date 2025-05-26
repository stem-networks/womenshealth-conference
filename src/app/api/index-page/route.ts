import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST() {
  try {
    const apiUrl = process.env.API_URL;
    const cid = process.env.CID;

    if (!apiUrl || !cid) {
      return NextResponse.json(
        { error: 'API configuration error' },
        { status: 500 }
      );
    }

    const response = await axios.post(apiUrl, {
      module_name: 'index_page',
      keys: { data: [] },
      cid: cid,
    });

    return NextResponse.json({
      oneliner: response.data.oneliner,
      bannerContent: response.data.banner_conent,
      sessions: response.data.sessions,
      importantDates: response.data.important_dates,
      venueImages: response.data.venue_images || {},
    });
  } catch (error) {
    console.error('Error fetching index page data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch index page data' },
      { status: 500 }
    );
  }
}