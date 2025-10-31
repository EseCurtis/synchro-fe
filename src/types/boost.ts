export type BoostStatus =
  | "draft"
  | "pending_review"
  | "in_review"
  | "rejected"
  | "pending_payment"
  | "active"
  | "paused"
  | "expired"
  | "cancelled"
  | "refunded"
  | "failed";

export type Boost = {
  id: string;
  ownerId: string;
  resourceType: "event" | "business";
  resourceId: string;
  resource?: {
    type: "event" | "business";
    data: any;
  };
  objective: "impressions" | "clicks";
  placement: string[];
  budget?: number;
  bid?: number;
  currency: string;
  status: BoostStatus;
  startAt: string;
  endAt: string;
  ctaType: string;
  ctaUrl?: string;
  targeting?: Record<string, unknown>;
  reviewedBy?: string;
  reviewedAt?: string;
  rejectionReason?: string;
  createdAt?: string;
};

export type BoostReviewRejectPayload = {
  action: "reject";
  rejectionCategory?: string;
  rejectionReason?: string;
  policyViolations?: string[];
  internalNotes?: string;
};


