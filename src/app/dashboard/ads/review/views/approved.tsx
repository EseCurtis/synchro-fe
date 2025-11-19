"use client";
import { BoostStatus } from "@/hooks/api/boosts/useAdminBoostReview";
import PendingBoostsView from "./pending";

export default function ApprovedBoostsView() {
  return <PendingBoostsView status={BoostStatus.ACTIVE} />;
}


