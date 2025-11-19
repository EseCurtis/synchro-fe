import { UserData } from "./user.types";

export interface Service {
  name: string;
  description: string;
  price: number;
  duration: number;
  currency: string;
}

export interface ServiceHours {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: Partial<DaySchedule>;
}

export interface DaySchedule {
  isOpen: boolean;
  openTime?: string;
  closeTime?: string;
}

export interface Metadata {
  category?: string;
  source: string;
  createdAt?: string;
  tags?: string[];
}


export interface BusinessCategory {
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
  metadata: Metadata;
}

export interface BusinessProfile {
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
  user: UserData;
  businessCategory: BusinessCategory;
}