"use client";
import PendingBoostsView from "./pending";
import { BoostStatus } from "@/hooks/api/boosts/useAdminBoostReview";

export default function RejectedBoostsView() {
  return <PendingBoostsView status={BoostStatus.REJECTED} />;
}



