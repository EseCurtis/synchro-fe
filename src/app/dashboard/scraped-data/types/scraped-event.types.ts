export interface ScrapedEvent {
  id: string;
  source: string;
  sourceId: string;
  sourceUrl: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  startDate: string;
  endDate?: string;
  timezone: string;
  location: {
    type: "physical" | "online";
    venueName: string;
    address?: string;
    latitude?: number;
    longitude?: number;
  };
  organizer: {
    name: string;
    email: string;
    phone: string;
  };
  pricing: {
    isFree: boolean;
    priceRange: string;
    ticketPrice?: number;
    currency?: string;
  };
  images: {
    thumbnail?: string;
    banner?: string;
  };
  isOnline: boolean;
  isFeatured: boolean;
  status: "upcoming" | "ongoing" | "completed";
  scrapedAt: string;
}

export interface CreateEventPayload {
  name: string;
  description: string;
  categoryId: string;
  banner?: string;
  latitude: number;
  longitude: number;
  address: string;
  startDateTime: string;
  endDateTime: string;
  timezone: string;
  ticketType: "free" | "paid";
  ticketPrice?: number;
  currency?: string;
  maxAttendees?: number;
  isPublic: boolean;
  canViewMembers: boolean;
  metadata?: any;
}

