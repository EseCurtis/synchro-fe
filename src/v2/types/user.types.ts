export interface UserData {
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
  lastLoginAt: string;
  role: string;
  isAdmin: boolean;
  adminPermissions: string | null;
  metadata: any | null; // Flexible, as metadata could be any structure
  profiles: Profile[];
  interests: string[];
  wallets: Wallet[];
}

export interface Profile {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  userId: string;
  type: string;
  firstName: string;
  lastName: string;
  username: string;
  bio: string | null;
  avatar: string;
  bannerUrl: string | null;
  isActive: boolean;
  isDefault: boolean;
  businessName: string | null;
  businessDescription: string | null;
  businessImages: string[] | null;
  services: string[] | null;
  serviceHours: string | null;
  serviceType: string | null;
  hourlyRate: string | null;
  dailyRate: string | null;
  currency: string | null;
  location: string | null;
  latitude: number | null;
  longitude: number | null;
  metadata: any | null;
  businessCategoryId: string | null;
  status: string;
  businessCategory: string | null;
}

export interface Wallet {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  userId: string;
  name: string;
  type: string;
  currency: string;
  balance: string;
  lockedBalance: string;
  status: string;
  stripeAccountId: string;
  cryptoAddress: string | null;
  cryptoNetwork: string | null;
  isDefault: boolean;
  mainWalletId: string | null;
  metadata: any | null;
  subWallets: any[]; // Empty array in the data, so kept flexible
}


export interface UserStatsResponse {
  data: {
    userId: string;
    profileId: string;
    username: string;
    stats: {
      followers: number;
      following: number;
      blocked: number;
      mutualFollows: number;
      totalConnections: number;
    };
    generatedAt: string;
  };
}

