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
