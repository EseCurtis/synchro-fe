import { Profile } from "@/v2/types/user.types";

export type VenueStatus =
  | "draft"
  | "active"
  | "inactive"
  | "under_maintenance";

export type VenueRateType = "hourly" | "daily" | "both";

export type AdminVenue = {
  id: string;
  ownerId: string;
  title: string;
  type: string;
  description: string;
  address: string;
  apartment?: string | null;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  latitude: number;
  longitude: number;
  capacity: number;
  size: number;
  suitableEventCategories: string[];
  venueRules?: string[];
  minAge?: number;
  maxAge?: number;
  wifiAvailable: boolean;
  arrivalInstructions?: string;
  images: string[];
  operatingHours: Record<
    string,
    {
      isOpen: boolean;
      openTime?: string;
      closeTime?: string;
    }
  >;
  availability?: Array<{
    day: number;
    startTime: string;
    endTime: string;
  }>;
  rateType: VenueRateType;
  hourlyRate?: number;
  minimumHours?: number;
  dailyRate?: number;
  cleaningFee?: number;
  currency: string;
  amenities: string[];
  status: VenueStatus;
  averageRating: number;
  reviewsCount: number;
  bookingsCount: number;
  metadata?: Record<string, unknown>;
  owner?: Profile & { user?: { id: string; email?: string } };
  createdAt: string;
  updatedAt: string;
};

export type AdminVenueResponse = {
  data: AdminVenue[];
  total: number;
  page: number;
  limit: number;
  totalPages?: number;
};

