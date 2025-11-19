import { Event } from "./event.types";
import { BusinessProfile, Service } from "./service.types";
import { UserData } from "./user.types";

export enum ReportType {
    USER = "user",
    FEED = "feed",
    COMMENT = "comment",
    EVENT = "event",
    MESSAGE = "message",
    BOOKING = "booking",
}

export type ReportV2 = {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: null;
    reporterId: string;
    reportedEntityType: ReportType;
    reportedEntityId: string;
    reason: string;
    description: string;
    status: string;
    moderatorId: null;
    moderatorNotes: null;
    evidence: string[];
    reviewedAt: null;
    resolvedAt: null;
    daysSinceReported: number;
    isOverdue: boolean;

    reporter: UserData;
    moderator: BusinessProfile;
    reportedEntity: UserData | BusinessProfile | Event | Service
}