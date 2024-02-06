export type TStringIndexObject = {
    [key: string]: any;
};

export interface Booking {
    id: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    serviceId: string | null;
    venueId: string;
    businessUserId: string;
    fromDate: string;
    toDate: string;
    fromTime: string;
    toTime: string;
    description: string;
    transactionId: string;
    totalAmount: string;
    bookType: "service" | "venue"; // Assuming these are the only two possible types
    package: string | null;
    status: "accepted" | "rejected" | "pending"; // You can add other possible statuses
    cancelReason: string | null;
    userPaid: boolean;
    eventTitle: string;
    attendees: number;
    reviewed: boolean;
}
export interface Review {
    id: string;
    createdAt: string;
    updatedAt: string;
    content: string;
    rating: string; // Assuming rating can be a string, can be adjusted to number if needed
    userId: string;
    revieweeId: string;
    venueId: string | null;
    serviceId: string | null;
    bookingId: string;
    user: {
        id: string;
        firstName: string;
        lastName: string;
        username: string;
        profileImage: string;
        coverImage: string | null;
        bio: string | null;
        location: string | null;
        website: string | null;
        private: boolean;
        isBusiness: boolean;
        showActivity: boolean;
        showLocation: boolean;
        followingCount: number;
        followerCount: number;
        appType: string; // Assuming this can be a string, can be enum if types are limited
        userState: string;
        postCount: number;
        lastSeen: string | null;
    };
    reviewee: {
        id: string;
        firstName: string;
        lastName: string;
        username: string;
        profileImage: string;
        coverImage: string | null;
        bio: string | null;
        location: string | null;
        website: string | null;
        private: boolean;
        isBusiness: boolean;
        showActivity: boolean;
        showLocation: boolean;
        followingCount: number;
        followerCount: number;
        appType: string; // Assuming this can be a string, can be enum if types are limited
        userState: string;
        postCount: number;
        lastSeen: string | null;
    };
}