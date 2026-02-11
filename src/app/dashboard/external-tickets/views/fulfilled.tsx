"use client";
import PendingTicketsView from "./pending";

export default function FulfilledTicketsView() {
  return <PendingTicketsView status="active" viewMode="fulfilled" />;
}
