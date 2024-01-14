import Badge from "@/app/_components/forms/badge";
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

const BookingDetails = () => {
  const bookingDetails = [
    { label: "Start date & time", value: "11:32pm, May 3rd, 2021" },
    { label: "End date & time", value: "11:32pm, May 5th, 2021" },
    { label: "Event title", value: "Jake`s birthday party" },
    { label: "No attendees", value: "1,243 guests" },
    { label: "Chosen package", value: "Wedding package" },
    { label: "Subtotal", value: "$1,258" },
    { label: "Processing fee", value: "$6.31" },
    { label: "Total amount", value: "$1,253.31" },
    { label: "Booking status", value: <Badge status="Active" /> },
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
