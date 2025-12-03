"use client";

import { VenueStatusView } from "./venue-status-view";

export default function PendingVenues() {
  return <VenueStatusView status="draft" title="Pending Venues" />;
}
