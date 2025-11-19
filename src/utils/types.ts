import { BusinessProfile } from "@/v2/types/service.types";
import { BusinessTypeV2, Profile } from "@/v2/types/user.types";

export type TStringIndexObject = {
    [key: string]: any;
};

const x = {
    "id": "95ecfee0-0066-4d21-a71d-5fb9d8574641",
    "createdAt": "2025-10-08T00:21:56.105Z",
    "updatedAt": "2025-10-08T00:21:56.105Z",
    "deletedAt": null,
    "businessProfileId": "4ecf4183-305b-4a92-8798-c96b48bd83f7",
    "clientProfileId": "3fd858f9-262f-4f1a-94ca-19ccca8fb436",
    "serviceName": "Tutoring Session",
    "description": "Academic tutoring in mathematics and science",
    "startDateTime": "2025-11-09T00:21:55.532Z",
    "endDateTime": "2025-11-09T01:51:55.532Z",
    "totalAmount": "88.00",
    "paidAmount": "88.00",
    "currency": "USD",
    "status": "in_progress",
    "paymentStatus": "paid",
    "location": "Virtual Meeting",
    "latitude": null,
    "longitude": null,
    "notes": "We'll provide all necessary equipment",
    "requirements": [],
    "confirmedAt": null,
    "completedAt": null,
    "metadata": {
        "seededBy": "generate-user-booking-data",
        "generatedAt": "2025-10-08T00:21:55.532Z"
    },
    "businessProfile": {
        "id": "4ecf4183-305b-4a92-8798-c96b48bd83f7",
        "createdAt": "2025-09-02T16:42:47.735Z",
        "updatedAt": "2025-09-19T09:54:59.245Z",
        "deletedAt": null,
        "userId": "8665c44e-0060-44a8-87e1-87401df3d232",
        "type": "business",
        "firstName": "TravelWise",
        "lastName": "Nigeria",
        "username": "travelwisenigeria",
        "bio": "Professional travel planning and tourism services",
        "avatar": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070",
        "bannerUrl": null,
        "isActive": true,
        "isDefault": true,
        "businessName": "TravelWise Nigeria",
        "businessDescription": "Professional travel planning and tourism services",
        "businessImages": null,
        "services": [
            {
                "name": "Travel Planning",
                "description": "Professional travel planning and tour services",
                "price": 15000,
                "duration": 90,
                "currency": "NGN"
            }
        ],
        "serviceHours": {
            "monday": {
                "isOpen": true,
                "openTime": "09:00",
                "closeTime": "17:00"
            },
            "tuesday": {
                "isOpen": true,
                "openTime": "09:00",
                "closeTime": "17:00"
            },
            "wednesday": {
                "isOpen": true,
                "openTime": "09:00",
                "closeTime": "17:00"
            },
            "thursday": {
                "isOpen": true,
                "openTime": "09:00",
                "closeTime": "17:00"
            },
            "friday": {
                "isOpen": true,
                "openTime": "09:00",
                "closeTime": "17:00"
            },
            "saturday": {
                "isOpen": true,
                "openTime": "10:00",
                "closeTime": "15:00"
            },
            "sunday": {
                "isOpen": false
            }
        },
        "serviceType": "hourly",
        "hourlyRate": "7000.00",
        "dailyRate": "55000.00",
        "currency": "NGN",
        "location": "Gombe, Nigeria",
        "latitude": "10.289700",
        "longitude": "11.167300",
        "metadata": {
            "category": "Travel & Tourism",
            "source": "seed_script",
            "createdAt": "2025-09-02T16:42:47.268Z"
        },
        "businessCategoryId": "dc4532cb-385c-4e9b-9643-3501248cae7d",
        "status": "approved",
        "user": {
            "id": "8665c44e-0060-44a8-87e1-87401df3d232",
            "createdAt": "2025-09-02T16:42:46.787Z",
            "updatedAt": "2025-09-02T16:42:46.787Z",
            "deletedAt": null,
            "email": "business24@example.com",
            "phoneNumber": "+234845808624",
            "phoneVerified": true,
            "authProvider": "google",
            "providerId": "google_vyx190wm6",
            "dateOfBirth": "1981-08-16",
            "gender": "other",
            "pushToken": null,
            "ipAddress": null,
            "timezone": "Africa/Lagos",
            "countryCode": "NG",
            "defaultCurrency": "NGN",
            "status": "active",
            "isSuspended": false,
            "suspensionReason": null,
            "suspensionDuration": null,
            "suspendedAt": null,
            "lastLoginAt": null,
            "role": "user",
            "isAdmin": false,
            "adminPermissions": null,
            "metadata": {
                "source": "seed_script"
            }
        }
    },
    "clientProfile": {
        "id": "3fd858f9-262f-4f1a-94ca-19ccca8fb436",
        "createdAt": "2025-09-02T16:42:23.365Z",
        "updatedAt": "2025-09-02T16:42:23.365Z",
        "deletedAt": null,
        "userId": "86c5724a-7078-47bf-8f4e-057ac0f1938e",
        "type": "business",
        "firstName": "HomeCare",
        "lastName": "Services",
        "username": "homecareservices",
        "bio": "Professional home cleaning and maintenance services",
        "avatar": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2070",
        "bannerUrl": null,
        "isActive": true,
        "isDefault": true,
        "businessName": "HomeCare Services",
        "businessDescription": "Professional home cleaning and maintenance services",
        "businessImages": null,
        "services": [
            {
                "name": "Home Cleaning",
                "description": "Professional home cleaning and maintenance",
                "price": 8000,
                "duration": 180,
                "currency": "NGN"
            }
        ],
        "serviceHours": {
            "monday": {
                "isOpen": true,
                "openTime": "09:00",
                "closeTime": "17:00"
            },
            "tuesday": {
                "isOpen": true,
                "openTime": "09:00",
                "closeTime": "17:00"
            },
            "wednesday": {
                "isOpen": true,
                "openTime": "09:00",
                "closeTime": "17:00"
            },
            "thursday": {
                "isOpen": true,
                "openTime": "09:00",
                "closeTime": "17:00"
            },
            "friday": {
                "isOpen": true,
                "openTime": "09:00",
                "closeTime": "17:00"
            },
            "saturday": {
                "isOpen": true,
                "openTime": "10:00",
                "closeTime": "15:00"
            },
            "sunday": {
                "isOpen": false
            }
        },
        "serviceType": "hourly",
        "hourlyRate": "3000.00",
        "dailyRate": "25000.00",
        "currency": "NGN",
        "location": "Owerri, Nigeria",
        "latitude": "5.483800",
        "longitude": "7.033600",
        "metadata": {
            "category": "Home & Garden",
            "source": "seed_script",
            "createdAt": "2025-09-02T16:42:22.899Z"
        },
        "businessCategoryId": "ef1ab643-9960-4eab-ab48-7b82abfea811",
        "status": "pending",
        "user": {
            "id": "86c5724a-7078-47bf-8f4e-057ac0f1938e",
            "createdAt": "2025-09-02T16:42:22.418Z",
            "updatedAt": "2025-09-02T16:42:22.418Z",
            "deletedAt": null,
            "email": "business9@example.com",
            "phoneNumber": "+234579582979",
            "phoneVerified": true,
            "authProvider": "google",
            "providerId": "google_drncr1qwm",
            "dateOfBirth": "1989-11-19",
            "gender": "female",
            "pushToken": null,
            "ipAddress": null,
            "timezone": "Africa/Lagos",
            "countryCode": "NG",
            "defaultCurrency": "NGN",
            "status": "active",
            "isSuspended": false,
            "suspensionReason": null,
            "suspensionDuration": null,
            "suspendedAt": null,
            "lastLoginAt": null,
            "role": "user",
            "isAdmin": false,
            "adminPermissions": null,
            "metadata": {
                "source": "seed_script"
            }
        }
    }
}


export type BookingV2 = {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: null;
    businessProfileId: string;
    clientProfileId: string;
    serviceName: string;
    description: string;
    startDateTime: string;
    endDateTime: string;
    totalAmount: string;
    paidAmount: string;
    currency: string;
    status: string;
    paymentStatus: string;
    location: string;
    latitude: null;
    longitude: null;
    notes: string;
    requirements: never[];
    confirmedAt: null;
    completedAt: null;
    metadata: {
        seededBy: string;
        generatedAt: string;
    };

    businessProfile: BusinessTypeV2
    clientProfile: Profile
}
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
    package: {
        id: string, name: string, amount: string, description: string
    };
    status: "accepted" | "rejected" | "pending"; // You can add other possible statuses
    cancelReason: string | null;
    userPaid: boolean;
    eventTitle: string;
    attendees: number;
    reviewed: boolean;
}


export type ReviewV2 = {
    id: string;
    reviewerProfileId: string;
    businessProfileId: string;
    rating: number;
    comment: string;
    bookingId: null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    reviewerProfile: BusinessTypeV2;
    businessProfile: BusinessProfile
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