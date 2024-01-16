import Badge from "@/app/_components/forms/badge";
import moment from "moment";
import React, { Fragment } from "react";

const Item = ({ label, value }: { label: any; value: any }) => {
  return (
    <div className="flex items-center gap-2 justify-between">
      <span className="rounded-full p-2">
        <b className="text-sm">{label}</b>
      </span>
      <p className="text-sm">{value}</p>
    </div>
  );
};

const BookingDetails = ({ venue }: { venue: any }) => {
  const date = JSON.parse(venue.hours[0]);

  const bookingDetails = [
    {
      label: "Start date & time",
      value: moment(date.day.from).format("h:mma, MMM Do, YYYY"),
    },
    {
      label: "End date & time",
      value: moment(date.day.to).format("h:mma, MMM Do, YYYY"),
    },
    { label: "Event title", value: venue.name },
    { label: "No attendees", value: `${venue.maxNumberOfGuests} Guests` },
    { label: "Chosen package", value: venue.chosenPackage || "N/A" },
    { label: "Subtotal", value: `$${venue.subtotal || "00"}` },
    { label: "Processing fee", value: `$${venue.processingFeee || "00"}` },
    { label: "Total amount", value: `$${venue.totalAmount || "00"}` },
    {
      label: "Booking status",
      value: (
        <Badge
          label={venue.status}
          status={venue.status === "approved" ? "Active" : "Inactive"}
        />
      ),
    },
  ];

  return (
    <div className="grid mt-9 gap-4">
      {bookingDetails.map((i, j) => (
        <Fragment key={j}>
          <Item label={i.label} value={i.value} />
        </Fragment>
      ))}
    </div>
  );
};

export default BookingDetails;
