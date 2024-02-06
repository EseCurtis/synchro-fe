import Badge from "@/app/_components/forms/badge";
import NoData from "@/app/_components/table/NoData";
import { useTQuery } from "@/hooks/api/useTQuery";
import { Booking } from "@/utils/types";
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
  const { data: bookingResponse }: any = useTQuery({
    url: `/booking/by-venue-id/${venue.id}?type=venue`,
    queryKey: ["service", "booking-detail", String(venue.id)],
  });

  const booking: Booking = bookingResponse?.data;


  const bookingDetails = [
    {
      label: "Start date & time",
      value: moment(booking?.fromDate).format("h:mma, MMM Do, YYYY"),
    },
    {
      label: "End date & time",
      value: moment(booking?.toDate).format("h:mma, MMM Do, YYYY"),
    },
    { label: "Event title", value: venue.name },
    { label: "No attendees", value: `${booking?.attendees} Guests` },
    { label: "Chosen package", value: booking?.package || "N/A" },
    // { label: "Subtotal", value: `$${booking.userPaid || "00"}` },
    // { label: "Processing fee", value: `$${booking.totalAmount || "00"}` },
    { label: "Total amount", value: `$${booking?.totalAmount || "00"}` },
    {
      label: "Booking status",
      value: (
        <Badge
          label={booking?.status}
          status={booking?.status === "accepted" ? "Active" : "Inactive"}
        />
      ),
    },
  ];

  return (
    <div className="grid mt-9 gap-4">
      {booking?.status && bookingDetails.map((i, j) => (
        <Fragment key={j}>
          <Item label={i.label} value={i.value} />
        </Fragment>
      ))}

      {!booking?.status && <NoData
        title="No Bookings Yet."
        description="All Bookings get listed here."
      />}
    </div>
  );
};

export default BookingDetails;
