"use client";
import PendingTicketsView from "./pending";

export default function AllTicketsView() {
  // Don't pass status prop to show all tickets regardless of status
  return <PendingTicketsView viewMode="all" />;
}
