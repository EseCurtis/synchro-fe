import { ScrapedEvent, CreateEventPayload } from "../types/scraped-event.types";

// Category mapping from scraped data to system categories
export const categoryMapping: { [key: string]: string } = {
  business: "Business",
  music: "Music",
  arts: "Arts",
  food: "Food & Drink",
  nightlife: "Nightlife",
  sports: "Sports & Fitness",
  technology: "Technology",
  health: "Health & Wellness",
  education: "Education",
  community: "Community",
  other: "Other",
};

/**
 * Maps a scraped event to the create event API payload format
 */
export function mapScrapedEventToPayload(
  scrapedEvent: ScrapedEvent,
  categoryId: string
): Partial<CreateEventPayload> {
  // Calculate end time (default to 3 hours after start if not provided)
  const startDate = new Date(scrapedEvent.startDate);
  const endDate = scrapedEvent.endDate
    ? new Date(scrapedEvent.endDate)
    : new Date(startDate.getTime() + 3 * 60 * 60 * 1000);

  // Build address from available location data
  const addressParts = [];
  if (scrapedEvent.location?.address && scrapedEvent.location.address.trim()) {
    addressParts.push(scrapedEvent.location.address.trim());
  }
  if (
    scrapedEvent.location?.venueName &&
    scrapedEvent.location.venueName.trim() &&
    scrapedEvent.location.venueName.toLowerCase() !== "tba"
  ) {
    addressParts.push(scrapedEvent.location.venueName.trim());
  }
  const fullAddress =
    addressParts.length > 0 ? addressParts.join(", ") : "Location TBD";

  // Default coordinates for Lagos, Nigeria if not provided
  const defaultLagosLat = 6.5244;
  const defaultLagosLng = 3.3792;

  return {
    name: scrapedEvent.title,
    description: scrapedEvent.description,
    categoryId: categoryId,
    banner: scrapedEvent.images?.banner || scrapedEvent.images?.thumbnail,
    latitude: scrapedEvent.location?.latitude || defaultLagosLat,
    longitude: scrapedEvent.location?.longitude || defaultLagosLng,
    address: fullAddress,
    startDateTime: startDate.toISOString(),
    endDateTime: endDate.toISOString(),
    timezone: scrapedEvent.timezone || "America/New_York",
    ticketType: scrapedEvent.pricing?.isFree ? "free" : "paid",
    ticketPrice: scrapedEvent.pricing?.isFree
      ? undefined
      : scrapedEvent.pricing?.priceRange === "Free"
      ? undefined
      : scrapedEvent.pricing?.ticketPrice || 0,
    currency: scrapedEvent.pricing?.currency || "USD",
    maxAttendees: undefined, // Set manually as needed
    isPublic: true,
    canViewMembers: true,
    metadata: {
      source: scrapedEvent.source,
      sourceId: scrapedEvent.sourceId,
      sourceUrl: scrapedEvent.sourceUrl,
      tags: scrapedEvent.tags || [],
      organizer: scrapedEvent.organizer || {},
      scrapedAt: scrapedEvent.scrapedAt,
      isOnline: scrapedEvent.isOnline,
      isFeatured: scrapedEvent.isFeatured,
      status: scrapedEvent.status,
    },
  };
}

/**
 * Finds the best matching category ID from available categories
 */
export function findMatchingCategory(
  scrapedCategory: string,
  availableCategories: any[]
): string | null {
  if (!availableCategories || availableCategories.length === 0) {
    console.warn("No categories available for mapping");
    return null;
  }

  const normalizedScrapedCategory = scrapedCategory?.toLowerCase() || "other";
  const categoryName = categoryMapping[normalizedScrapedCategory] || "Other";

  console.log(
    `Mapping scraped category "${scrapedCategory}" → "${categoryName}"`
  );
  console.log(
    "Available category names:",
    availableCategories.map((c: any) => c.name)
  );

  // Try exact match first
  let matchedCategory = availableCategories.find(
    (cat: any) => cat.name && cat.name.toLowerCase() === categoryName.toLowerCase()
  );

  // If no match, try partial match
  if (!matchedCategory) {
    matchedCategory = availableCategories.find(
      (cat: any) =>
        cat.name &&
        (cat.name.toLowerCase().includes(categoryName.toLowerCase()) ||
          categoryName.toLowerCase().includes(cat.name.toLowerCase()))
    );
  }

  // Log result
  if (matchedCategory) {
    console.log(`✓ Matched to: ${matchedCategory.name} (${matchedCategory.id})`);
  } else {
    console.warn(`✗ No match found for "${categoryName}"`);
  }

  return matchedCategory?.id || null;
}

/**
 * Validates a scraped event has required fields
 */
export function validateScrapedEvent(event: any): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!event.title || event.title.trim() === "") {
    errors.push("Event title is required");
  }

  if (!event.startDate) {
    errors.push("Event start date is required");
  }

  if (!event.location) {
    errors.push("Event location is required");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Batch validate scraped events
 */
export function validateScrapedEvents(events: any[]): {
  valid: any[];
  invalid: Array<{ event: any; errors: string[] }>;
} {
  const valid: any[] = [];
  const invalid: Array<{ event: any; errors: string[] }> = [];

  events.forEach((event) => {
    const validation = validateScrapedEvent(event);
    if (validation.isValid) {
      valid.push(event);
    } else {
      invalid.push({ event, errors: validation.errors });
    }
  });

  return { valid, invalid };
}

