import Badge from "@/app/_components/forms/badge";
import { Spinner } from "@/app/_components/spinner/Spinner";
import NoData from "@/app/_components/table/NoData";
import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";
import { BookingV2 } from "@/utils/types";
import { BusinessProfile } from "@/v2/types/service.types";
import moment from "moment";
import { Fragment, useState } from "react";

// Reusable Item component for key-value pairs
const Item = ({ label, value }: { label: string; value: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-between gap-4 py-2 border-b last:border-b-0">
      <span className="font-semibold text-sm text-gray-700">{label}</span>
      <p className="text-sm text-gray-900">{value}</p>
    </div>
  );
};

// Improved BookingItem with collapsible details for better modal UX
const BookingItem = ({ booking }: { booking: BookingV2 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Map status to badge props for better extensibility
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in_progress":
        return <Badge label="In Progress" status="Pending" />;
      case "accepted":
        return <Badge label="Accepted" status="shiny" />;
      case "completed":
        return <Badge label="Completed" status="Active" />;
      case "cancelled":
        return <Badge label="Cancelled" status="Inactive" />;
      default:
        return <Badge label={status} status="Disabled" />;
    }
  };

  // Map payment status similarly if needed
  const getPaymentBadge = (paymentStatus: string) => {
    switch (paymentStatus) {
      case "paid":
        return <Badge label="Paid" status="Active" />;
      case "pending":
        return <Badge label="Pending" status="Pending" />;
      case "failed":
        return <Badge label="Failed" status="Inactive" />;
      default:
        return <Badge label={paymentStatus} status="Disabled" />;
    }
  };

  // Extract relevant profiles for display
  const businessName = booking.businessProfile?.businessName || "N/A";
  const clientName =
    `${booking.clientProfile?.firstName || ""} ${
      booking.clientProfile?.lastName || ""
    }`.trim() || "N/A";

  const bookingDetails = [
    { label: "Service Name", value: booking.serviceName },
    { label: "Business", value: businessName },
    { label: "Client", value: clientName },
    {
      label: "Start Date & Time",
      value: moment(booking.startDateTime).format("h:mma, MMM Do, YYYY"),
    },
    {
      label: "End Date & Time",
      value: moment(booking.endDateTime).format("h:mma, MMM Do, YYYY"),
    },
    { label: "Event Description", value: booking.description },
    { label: "Location", value: booking.location || "N/A" },
    { label: "Notes", value: booking.notes || "None" },
    {
      label: "Requirements",
      value: booking.requirements?.join(", ") || "None",
    },
    { label: "Total Amount", value: `$${booking.totalAmount || "0.00"}` },
    { label: "Paid Amount", value: `$${booking.paidAmount || "0.00"}` },
    { label: "Currency", value: booking.currency },
    { label: "Payment Status", value: getPaymentBadge(booking.paymentStatus) },
  ];

  return (
    <div className="bg-white border-b mt-4 overflow-hidden">
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          <h3 className="text-md font-semibold">
            Booking ID: {booking.id.slice(0, 8)}...
          </h3>
          <span className="text-sm text-gray-600 whitespace-nowrap">
            {moment(booking.startDateTime).format("MMM Do, YYYY")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="scale-[0.7]">{getStatusBadge(booking.status)}</div>
          <span className="text-[7px] font-medium">
            {isExpanded ? "▲" : "▼"}
          </span>
        </div>
      </div>
      {isExpanded && (
        <div className="p-4 border-t">
          <div className="grid gap-2">
            {bookingDetails.map((item, index) => (
              <Item key={index} label={item.label} value={item.value} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Main BookingDetails component
// Now accepts bookings as prop for flexibility (e.g., pass fetched or static data)
// Fallback to fetching if not provided, but prefer prop injection for testing/reusability
const BookingDetails = ({
  data: service,
  bookings: propBookings,
}: {
  data: BusinessProfile;
  bookings?: BookingV2[]; // Optional prop for direct data injection
}) => {
  const {
    data: fetchedData,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = usePaginatedQuery({
    url: `/admin/users/${service.userId}/bookings?serviceId=${service.id}`,
    queryKey: ["service", String(service.id), "booking-details"],
  });

  // Use prop bookings if provided, else fallback to fetched
  const bookings =
    propBookings ||
    ((fetchedData?.pages?.flatMap((e: any) => e.data.data) ||
      []) as BookingV2[]);

  if (bookings.length === 0) {
    return (
      <NoData
        title="No Bookings Yet."
        description="All bookings will be listed here once created."
      />
    );
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="">
      <Fragment>
        {bookings.map((booking) => (
          <BookingItem booking={booking} key={booking.id} />
        ))}
      </Fragment>
      {hasNextPage && (
        <div className="text-center mt-7">
          <h3
            onClick={() => {
              fetchNextPage();
            }}
            className="w-[auto] flex justify-center font-bold p-3 px-2 cursor-pointer rounded border border-gray-300"
          >
            {isFetchingNextPage ? <Spinner /> : "Load more"}
          </h3>
        </div>
      )}
    </div>
  );
};

export default BookingDetails;
