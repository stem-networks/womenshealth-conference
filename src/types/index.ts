export interface NavItem {
  id: string;
  title: string;
  link: string;
  icon?: string;
  children?: NavItem[];
}

export interface ApiData {
  display_features?: NavItem[];
}

// General conference data interface
export interface GeneralData {
  cid: string;
  site_url: string;
  clname: string;
  csname: string;
  clogotext: string;
  sdate: string;
  edate: string;
  month: string;
  year: string;
  venue_p1: string;
  location_name: string;
  loc_address: string;
  v1: string;
  v2: string;
  venue_p2: string;
  cemail: string;
  phone: string;
  whatsapp: string;
  full_length_dates: string;
  full_length_venue: string;
  startDate: string;
  endDate: string;
  main_keyword: string;
  confkeyword: string;
  offerPrice?: string;
  offerCurrency?: string;
}

// Page content interface
export interface PageContent {
  title: string;
  content: string;
  meta_keywords: string;
}

// Pages data structure
export interface PagesData {
  index: PageContent[];
  sessions_meta: PageContent[];
  planning_committee: PageContent[];
  organizing_committee: PageContent[];
  speakers: PageContent[];
  down_brochure: PageContent[];
  FAQ: PageContent[];
  submit_abstract: PageContent[];
  register: PageContent[];
  guidlines: PageContent[];
  terms: PageContent[];
  scientific_program: PageContent[];
  register_details: PageContent[];
  privacy_policy: PageContent[];
  venue: PageContent[];
}

// Navigation item interface
export interface NavItem {
  title: string;
  link: string;
  subItems?: SubItem[];
}

interface SubItem {
  title: string;
  link: string;
}

// Social links interface
export interface SocialLink {
  link: string;
  title: string;
}

export interface SocialLinks {
  facebook: SocialLink;
  linkedin: SocialLink;
  instagram: SocialLink;
}

// Complete API response interface
export interface ApiResponse {
  status: string;
  data: GeneralData;
  pages: PagesData;
  display_features: NavItem[];
  social_links: SocialLinks;
}

// Add these interfaces to your existing types file
export interface RegistrationPrice {
  "Standard Registration Fee": string;
  total: string;
  min: string;
  conference_dt: string;
}

export interface RegistrationDeadline {
  id: string;
  title: string;
  deadline_dt: string;
  page_url: string;
}

// export interface AccommodationPrice {
//   [key: string]: {
//     total: string;
//     min: string;
//     conference_dt: string;
//     "Standard Registration Fee"?: string;
//     id: string;
//     single: string;
//     doubl: string;
//     tri: string;
//     accompanying: string;
//     price: string;
//     type: string;
//   };
// }

import "iron-session";

declare module "iron-session" {
  interface IronSessionData {
    captchas?: Record<string, string>;
  }
}

export interface AccommodationPrice {
  single: string;
  doubl: string;
  tri: string;
  accompanying: string;
  [key: string]: string;
}

export interface RegistrationInfo {
  increment_price: Record<string, RegistrationPrice>;
  RegDeadline: RegistrationDeadline[];
  accommodation_prices: AccommodationPrice[];
  conference_date: string;
  days_difference: number;
  checkdates: {
    "1": string[];
    "2": string[];
  };
  registration_open_date: {
    id: string;
    register_dt: string;
    conference_date: string;
  };
}

// Oneliner Item
export interface OnelinerItem {
  category: string;
  content: string;
  headding: string; // Note: Typo in property name (should be 'heading'?)
}

// Offer Item
export interface OfferItem {
  category: string;
  content: string;
  headding: string;
}

// Oneliner Data
export interface OnelinerData {
  Be_A_Volunteer?: OnelinerItem;
  Explore_Our_Comprehensive_Networking_Services?: OnelinerItem;
  Submit_Your_Abstract?: OnelinerItem;
  download_brochure?: OnelinerItem;
  footer_content?: OnelinerItem;
  important_dates?: OnelinerItem;
  offers_content?: {
    [key: string]: OfferItem;
  };
  sessions?: OnelinerItem;
}

// Session Item
export interface SessionItem {
  text: string;
  link: string;
  session_short_name: string;
}

// Banner Content
export interface BannerContentItem {
  banner_conent_id: string; // Note: Typo in property name
  cid: string;
  content: string;
  headding: string; // Note: Typo
  image: string;
  page: string;
  status: string;
  tag_line: string;
}

export interface BannerContent {
  [key: string]: BannerContentItem;
}

// Venue Image
export interface VenueImage {
  image: string;
  alt_text: string;
}

export interface VenueImages {
  [key: string]: VenueImage;
}

// Important Date
export interface ImportantDate {
  text: string;
  date: string;
}

// Main Data Interface
export interface IndexPageData {
  oneliner?: OnelinerData;
  bannerContent?: BannerContent;
  sessions?: SessionItem[];
  importantDates?: ImportantDate[];
  venueImages?: VenueImages;
  title?: string;
  content?: string;
  meta_keywords?: string;
}

export interface FAQItem {
  faq_id: string;
  faq_question: string;
  faq_ans: string;
  priority: string;
  status: string;
  created_by: string;
  created_date: string;
  cid: string;
}

// export interface CommonContent {
//   phone: string;
//   importantDates: {
//     date: string;
//   }[];
//   faqs?: FAQItem[];
// }

// export interface CommonContent {
//   phone: string;
//   importantDates: {
//     date: string;
//   }[];
//   faq?: FAQItem[];
//   guidelines?: {
//     content: string;
//   };
// }

export interface CommonContent {
  data: {
    phone: string;
    importantDates: { date: string }[];
    faq?: FAQItem[];
    guidelines?: { content: string };
  };
}
