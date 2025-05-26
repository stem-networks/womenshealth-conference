// types/registration.ts
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

export interface AccommodationPrice {
  id: string;
  single: string;
  doubl: string;
  tri: string;
  accompanying: string;
}

export interface RegistrationInfo {
  increment_price: Record<string, RegistrationPrice>;
  RegDeadline: RegistrationDeadline[];
  accommodation_prices: AccommodationPrice[];
  conference_date: string;
  days_difference: number;
  registration_open_date: {
    id: string;
    register_dt: string;
    conference_date: string;
  };
}
