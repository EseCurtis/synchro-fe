"use client";
import PendingBoostsView from "./pending";
import { BoostStatus } from "@/hooks/api/boosts/useAdminBoostReview";

export default function InReviewBoostsView() {
  return <PendingBoostsView status={BoostStatus.IN_REVIEW} />;
}


