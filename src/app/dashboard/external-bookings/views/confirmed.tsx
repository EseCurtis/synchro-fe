"use client";
import PendingBookingsView from "./pending";

export default function ConfirmedBookingsView() {
  return <PendingBookingsView status="confirmed" viewMode="confirmed" />;
}
