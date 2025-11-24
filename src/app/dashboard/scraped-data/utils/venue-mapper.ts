import { ScrapedVenue, CreateVenuePayload } from "../types/scraped-venue.types";

// Default venue type mapping based on keywords
export const inferVenueType = (name: string, description?: string): string => {
  const text = `${name} ${description || ""}`.toLowerCase();

  if (text.includes("studio") || text.includes("recording")) return "other";
  if (text.includes("ballroom") || text.includes("hall")) return "banquet_hall";
  if (text.includes("conference") || text.includes("meeting")) return "conference_center";
  if (text.includes("outdoor") || text.includes("garden") || text.includes("park"))
    return "outdoor_space";
  if (text.includes("restaurant") || text.includes("dining")) return "restaurant";
  if (text.includes("hotel")) return "hotel";

  return "other";
};

// Default coordinates for venues without location data (Los Angeles, CA)
const DEFAULT_LATITUDE = 34.0522;
const DEFAULT_LONGITUDE = -118.2437;

export function mapScrapedVenueToPayload(
  scrapedVenue: ScrapedVenue
): Partial<CreateVenuePayload> {
  const venueType = scrapedVenue.type || inferVenueType(scrapedVenue.name, scrapedVenue.description);

  // Determine rate type
  let rateType: "hourly" | "daily" | "both" = "hourly";
  if (scrapedVenue.pricing.hourly && scrapedVenue.pricing.daily) {
    rateType = "both";
  } else if (scrapedVenue.pricing.daily) {
    rateType = "daily";
  }

  // Generate a basic description if not provided
  const description =
    scrapedVenue.description ||
    `${scrapedVenue.name} - A versatile venue space with capacity for up to ${scrapedVenue.capacity.max} guests.`;

  return {
    title: scrapedVenue.name,
    type: venueType,
    description: description,
    address: scrapedVenue.location.address || "Address to be provided",
    city: scrapedVenue.location.city || "See details",
    region: scrapedVenue.location.region || scrapedVenue.location.city || "N/A",
    country: scrapedVenue.location.country || "United States",
    latitude: scrapedVenue.location.latitude || DEFAULT_LATITUDE,
    longitude: scrapedVenue.location.longitude || DEFAULT_LONGITUDE,
    capacity: scrapedVenue.capacity.max,
    rateType: rateType,
    hourlyRate: scrapedVenue.pricing.hourly,
    dailyRate: scrapedVenue.pricing.daily,
    currency: scrapedVenue.pricing.currency,
    amenities: scrapedVenue.amenities || [],
    images: scrapedVenue.images || [],
    suitableEventCategories: scrapedVenue.activities || [],
    status: "active",
    metadata: {
      source: scrapedVenue.source,
      sourceId: scrapedVenue.sourceId,
      sourceUrl: scrapedVenue.sourceUrl,
      scrapedAt: scrapedVenue.scrapedAt,
      rating: scrapedVenue.rating,
    },
  };
}

export function validateScrapedVenue(venue: any): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!venue.name || typeof venue.name !== "string") {
    errors.push("Name is required");
  }

  if (!venue.capacity?.max || typeof venue.capacity.max !== "number") {
    errors.push("Capacity is required");
  }

  if (!venue.pricing?.currency || typeof venue.pricing.currency !== "string") {
    errors.push("Currency is required");
  }

  if (!venue.pricing?.hourly && !venue.pricing?.daily) {
    errors.push("At least one pricing option (hourly or daily) is required");
  }

  if (!venue.images || !Array.isArray(venue.images) || venue.images.length === 0) {
    errors.push("At least one image is required");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateScrapedVenues(venues: any[]): {
  valid: ScrapedVenue[];
  invalid: Array<{ venue: any; errors: string[] }>;
} {
  const valid: ScrapedVenue[] = [];
  const invalid: Array<{ venue: any; errors: string[] }> = [];

  venues.forEach((venue) => {
    const validation = validateScrapedVenue(venue);
    if (validation.isValid) {
      valid.push(venue as ScrapedVenue);
    } else {
      invalid.push({ venue, errors: validation.errors });
    }
  });

  return { valid, invalid };
}

