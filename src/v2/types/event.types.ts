import { Ticket, UserTicket } from "./ticket.types";

export interface Metadata {
  [key: string]: any;
}

export interface Service {
  name: string;
  description: string;
  price: number;
  duration: number;
  currency: string;
}

export interface ServiceHours {
  monday: { isOpen: boolean; openTime?: string; closeTime?: string };
  tuesday: { isOpen: boolean; openTime?: string; closeTime?: string };
  wednesday: { isOpen: boolean; openTime?: string; closeTime?: string };
  thursday: { isOpen: boolean; openTime?: string; closeTime?: string };
  friday: { isOpen: boolean; openTime?: string; closeTime?: string };
  saturday: { isOpen: boolean; openTime?: string; closeTime?: string };
  sunday: { isOpen: boolean; openTime?: string; closeTime?: string };
}

export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  email: string;
  phoneNumber: string;
  phoneVerified: boolean;
  authProvider: string;
  providerId: string;
  dateOfBirth: string;
  gender: string;
  pushToken: string | null;
  ipAddress: string | null;
  timezone: string;
  countryCode: string;
  defaultCurrency: string;
  status: string;
  isSuspended: boolean;
  suspensionReason: string | null;
  suspensionDuration: string | null;
  suspendedAt: string | null;
  lastLoginAt: string | null;
  role: string;
  isAdmin: boolean;
  adminPermissions: string[] | null;
  metadata: Metadata;
}

export interface Creator {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  userId: string;
  type: string;
  firstName: string;
  lastName: string;
  username: string;
  bio: string;
  avatar: string;
  bannerUrl: string | null;
  isActive: boolean;
  isDefault: boolean;
  businessName: string;
  businessDescription: string;
  businessImages: string[] | null;
  services: Service[];
  serviceHours: ServiceHours;
  serviceType: string;
  hourlyRate: string;
  dailyRate: string;
  currency: string;
  location: string;
  latitude: string;
  longitude: string;
  metadata: Metadata;
  businessCategoryId: string;
  status: string;
  user: User;
}

export interface EventGuest {
  eventId: string;
  profileId: string;
  profile: Creator;
  status: string;
  paymentStatus: string;
  amountPaid?: number;
  transactionId?: string;
  registeredAt?: string;
  checkedInAt?: string;
  metadata?: any;
}

export interface Category {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  name: string;
  description: string;
  icon: string;
  color: string;
  image: string;
  isActive: boolean;
  sortOrder: number;
  metadata: Metadata | null;
}

export interface Event {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  creatorId: string;
  categoryId: string;
  name: string;
  description: string;
  banner: string;
  latitude: string;
  longitude: string;
  address: string;
  startDateTime: string;
  endDateTime: string;
  timezone: string;
  ticketType: string;
  ticketPrice: number | null;
  currency: string;
  maxAttendees: number | null;
  isPublic: boolean;
  canViewMembers: boolean;
  status: string;
  classifiedInterests: string[] | null;
  attendeesCount: number;
  metadata: { city: string };
  creator: Creator;
  category: Category;
  collaborators: Creator[];
  attendees: Creator[]

  tickets: Ticket[]
  userTickets: UserTicket[]
}