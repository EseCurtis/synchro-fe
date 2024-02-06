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