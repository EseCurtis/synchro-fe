import { UserData } from "./user.types";

export type AuditGroup = {
    title: string;
    data: Audit;
    trails: Audit[];
    createdAt: number;
};

export type Audit = {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: null;
    action: string;
    entityType: string;
    entityId: string;
    performedById: string;
    description: string;
    oldValues: null;
    newValues: null;
    metadata: {
        reportType: string;
        reason: string;
        resolution: string;
    };
    ipAddress: string;
    userAgent: string;
    performedBy: UserData;
    timeAgo: string;
    performedByName: string;
    actionDescription: string;
}