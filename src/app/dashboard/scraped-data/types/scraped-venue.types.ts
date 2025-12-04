export interface ScrapedVenue {
  id: string;
  source: string;
  sourceId: string;
  sourceUrl: string;
  name: string;
  location: {
    city: string;
    address?: string;
    region?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
  };
  capacity: {
    max: number;
    min?: number;
  };
  pricing: {
    hourly?: number;
    daily?: number;
    currency: string;
  };
  rating?: {
    score: number;
    count: number;
  };
  images: string[];
  amenities: string[];
  activities: string[];
  description?: string;
  type?: string;
  scrapedAt: string;
}

export interface CreateVenuePayload {
  ownerId?: string;
  title: string;
  type: string;
  description: string;
  address: string;
  apartment?: string;
  city: string;
  region: string;
  postalCode?: string;
  country: string;
  latitude: number;
  longitude: number;
  capacity: number;
  sizeSquareFeet?: number;
  rateType: "hourly" | "daily" | "both";
  hourlyRate?: number;
  dailyRate?: number;
  currency: string;
  amenities: string[];
  images: string[];
  suitableEventCategories?: string[];
  operatingHours?: {
    [key: string]: {
      isOpen: boolean;
      openTime?: string;
      closeTime?: string;
    };
  };
  venueRules?: string[];
  availability?: Array<{
    day: number;
    startTime: string;
    endTime: string;
  }>;
  status: "draft" | "active" | "inactive" | "suspended";
  metadata?: any;
}

export interface Venue {
  id: string;
  ownerId: string;
  title: string;
  type: string;
  description: string;
  address: string;
  apartment?: string;
  city: string;
  region: string;
  postalCode?: string;
  country: string;
  latitude: string;
  longitude: string;
  capacity: number;
  sizeSquareFeet?: number;
  rateType: string;
  hourlyRate?: number;
  dailyRate?: number;
  currency: string;
  amenities: string[];
  images: string[];
  suitableEventCategories?: string[];
  venueRules?: string[];
  status: string;
  averageRating?: number;
  reviewsCount: number;
  bookingsCount: number;
  owner?: {
    id: string;
    username: string;
    displayName: string;
  };
  createdAt: string;
  updatedAt: string;
}


