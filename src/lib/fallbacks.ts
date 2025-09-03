import {
  ApiResponse,
  GeneralData,
  PagesData,
  IndexPageData,
  RegistrationInfo,
  CommonContent,
} from "@/types";

// Fallbacks for all your types – ensure every required property is present!

export const emptyGeneralData: GeneralData = {
  cid: "",
  site_url: "",
  clname: "",
  csname: "",
  clogotext: "",
  sdate: "",
  edate: "",
  month: "",
  year: "",
  venue_p1: "",
  location_name: "",
  loc_address: "",
  v1: "",
  v2: "",
  venue_p2: "",
  cemail: "",
  phone: "",
  whatsapp: "",
  full_length_dates: "",
  full_length_venue: "",
  startDate: "",
  endDate: "",
  main_keyword: "",
  confkeyword: "",
  offerPrice: "",
  offerCurrency: "",
};

export const emptyPagesData: PagesData = {
  index: [],
  sessions_meta: [],
  planning_committee: [],
  organizing_committee: [],
  speakers: [],
  down_brochure: [],
  FAQ: [],
  submit_abstract: [],
  register: [],
  guidlines: [],
  terms: [],
  scientific_program: [],
  register_details: [],
  privacy_policy: [],
  venue: [],
  galleryEvent: [],
  previous_conference: [],
};

export const emptyRegisterInfo: RegistrationInfo = {
  increment_price: {},
  RegDeadline: [],
  accommodation_prices: [],
  conference_date: "",
  days_difference: 0,
  checkdates: { "1": [], "2": [] },
  registration_open_date: { id: "", register_dt: "", conference_date: "" },
};

export const emptyCommonContent: CommonContent = {
  data: {
    phone: "",
    importantDates: [],
    // Add these only if they're required (uncomment if not optional):
    // faq: [],
    // guidelines: { content: "" },
  },
};

export const emptyApiResponse: ApiResponse = {
  status: "",
  data: emptyGeneralData,
  pages: emptyPagesData,
  display_features: [],
  social_links: {
    facebook: { link: "", title: "" },
    linkedin: { link: "", title: "" },
    instagram: { link: "", title: "" },
  },
};

export const emptyIndexPageData: IndexPageData = {};
