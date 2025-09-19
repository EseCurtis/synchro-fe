import { Creator } from "./event.types";

enum TicketStatus {
    ACTIVE = "active",
    SOLD_OUT = "sold_out",
    INACTIVE = "inactive",
}

export interface Ticket {
    id: string; // Inherited from BaseEntity
    createdAt: Date; // Inherited from BaseEntity
    updatedAt: Date; // Inherited from BaseEntity
    deletedAt: Date | null; // Inherited from BaseEntity
    eventId: string;
    name: string;
    description?: string | null;
    price: number;
    currency: string;
    totalAvailable: number;
    sold: number;
    status: TicketStatus;
    minQuantity: number;
    maxQuantity?: number | null;
    saleStartDate?: Date | null;
    saleEndDate?: Date | null;
    metadata?: any;
    event: Event; // Reference to Event entity (not fully defined here)
    userTickets: UserTicket[]; // Reference to UserTicket entity (not fully defined here)
    available: number; // Computed property
    isSoldOut: boolean; // Computed property
    isOnSale: boolean; // Computed property
}

export enum UserTicketStatus {
    ACTIVE = "active",
    USED = "used",
    CANCELLED = "cancelled",
    REFUNDED = "refunded",
}

export interface UserTicket {
    id: string; // Inherited from BaseEntity
    createdAt: Date; // Inherited from BaseEntity
    updatedAt: Date; // Inherited from BaseEntity
    deletedAt: Date | null; // Inherited from BaseEntity
    profileId: string;
    eventId: string;
    ticketId: string;
    status: UserTicketStatus;
    paidAmount: number;
    currency: string;
    qrCode?: string | null;
    ticketNumber?: string | null;
    usedAt?: Date | null;
    metadata?: any;
    profile: Creator; // Reference to Profile entity
    event: Event; // Reference to Event entity
    ticket: Ticket; // Reference to Ticket entity
}