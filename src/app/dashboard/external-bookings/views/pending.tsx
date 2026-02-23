"use client";
import { AppToast } from "@/app/_components/AppToast";
import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import Badge from "@/app/_components/forms/badge";
import { Spinner } from "@/app/_components/spinner/Spinner";
import DefaultTable from "@/app/_components/table/defaultTable";
import NoData from "@/app/_components/table/NoData";
import TablePagination from "@/app/_components/table/tablePagination";
import { useInfiniteExternalBookings } from "@/hooks/api/v2/external-bookings";
import { UserAvatarV2 } from "@/v2/components/common/avatar.component";
import { profileToUser } from "@/v2/helpers/common.helpers";
import moment from "moment";
import { useEffect, useState } from "react";
import { FiCopy, FiMessageCircle } from "react-icons/fi";
import { toast as $toast } from "react-toastify";
import BookingDetailDrawer from "../components/booking-detail-drawer";

export default function PendingBookingsView({
  status,
  viewMode,
}: {
  status?: string;
  viewMode?: "pending" | "confirmed" | "all";
}) {
  const getHeader = () => {
    if (viewMode === "all") {
      return ["Venue", "Platform", "User", "Date", "Status", "Booking Code"];
    }
    if (viewMode === "confirmed") {
      return ["Venue", "Platform", "User", "Date", "Booking Code", "Actions"];
    }
    return ["Venue", "Platform", "User", "Date", "Proxy Email", "Actions"];
  };

  const header = getHeader();
  const limit = 20;
  const [instaDelete, setInstaDelete] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [activeBooking, setActiveBooking] = useState<any | null>(null);

  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteExternalBookings(limit, true, { status, search });

  const items = (data?.pages || []).flatMap((p: any) => p.data?.data ?? []);

  function renderStatus(status: string) {
    const map: Record<string, { status: string; label?: string }> = {
      pending: { status: "Pending" },
      confirmed: { status: "Active", label: "Confirmed" },
      in_progress: { status: "Active", label: "In Progress" },
      completed: { status: "approved", label: "Completed" },
      cancelled: { status: "Disabled", label: "Cancelled" },
      no_show: { status: "Disabled", label: "No Show" },
    };
    const meta = map[status] || { status: "Pending", label: status };
    return <Badge status={meta.status} label={meta.label} size="small" />;
  }

  function formatDateRange(start: string, end: string) {
    const s = moment(start);
    const e = moment(end);
    if (s.isSame(e, "day")) {
      return `${s.format("MMM DD, YYYY")} ${s.format("h:mm A")} - ${e.format("h:mm A")}`;
    }
    return `${s.format("MMM DD")} - ${e.format("MMM DD, YYYY")}`;
  }

  function copyToClipboard(text: string, label: string) {
    navigator.clipboard.writeText(text).then(() => {
      setToast({ type: "success", message: `${label} copied to clipboard` });
    });
  }

  useEffect(() => {
    if (toast) {
      $toast(
        <AppToast
          toastProps={{ type: toast.type }}
          closeToast={() => setToast(null)}
        >
          {toast.message}
        </AppToast>
      );
    }
  }, [toast]);

  if (isLoading) {
    return <div className="px-6 py-10 text-center">Loading...</div>;
  }

  return (
    <div>
      <DashboardAction
        isLoading={isFetching}
        onChangeText={setSearch}
        textValue={search}
      />
      {items.length > 0 ? (
        <>
          <DefaultTable header={header as any}>
            {items
              .filter((booking: any) => !instaDelete.includes(booking.id))
              .map((booking: any) => {
                const venue = booking.venue;
                const profile = booking.clientProfile;
                const user = profile?.user;
                const proxyEmail = user?.mailslurpEmail || user?.email;

                return (
                  <tr
                    key={booking.id}
                    className="border-b cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setActiveBooking(booking)}
                  >
                    {/* Venue Column */}
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                      <div className="flex gap-2 items-center text-left">
                        <div className="flex overflow-hidden w-[3em] h-[3em] bg-gray-500 rounded-lg">
                          <img
                            src={
                              venue?.banner ||
                              venue?.images?.[0] ||
                              "/images/placeholder-event.jpg"
                            }
                            className="w-[100%] h-[100%] object-cover"
                            alt=""
                            width={50}
                            height={50}
                          />
                        </div>
                        <div className="flex flex-col">
                          <h3 className="text-sm font-medium">
                            {venue?.title}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {venue?.type}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Platform Column */}
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                      {venue?.externalPlatformName ? (
                        <Badge
                          status="shiny"
                          label={venue.externalPlatformName}
                          size="small"
                        />
                      ) : (
                        <span className="text-gray-400 text-xs">External</span>
                      )}
                    </td>

                    {/* User Column */}
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                      <div className="flex items-center gap-2">
                        <div className="w-[2em] aspect-square bg-gray-500 rounded-full">
                          <UserAvatarV2 user={profileToUser(profile)} />
                        </div>
                        <div>
                          <div className="text-sm">
                            {profile?.firstName || profile?.lastName
                              ? `${profile?.firstName} ${profile?.lastName}`
                              : profile?.username}
                          </div>
                          <div className="text-xs text-gray-500">
                            @{profile?.username}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Date Column */}
                    <td className="px-6 py-4 whitespace-no-wrap text-sm border-b border-gray-300 text-gray-600">
                      {booking.startDateTime && booking.endDateTime
                        ? formatDateRange(
                            booking.startDateTime,
                            booking.endDateTime
                          )
                        : moment(booking.createdAt).format("MMM DD, YYYY")}
                    </td>

                    {/* Dynamic Columns Based on View Mode */}
                    {viewMode === "all" ? (
                      <>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                          {renderStatus(booking.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                          {booking.externalBookingCode ? (
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-mono text-gray-700">
                                {booking.externalBookingCode}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyToClipboard(
                                    booking.externalBookingCode,
                                    "Booking code"
                                  );
                                }}
                                className="text-gray-400 hover:text-gray-600"
                                title="Copy booking code"
                              >
                                <FiCopy size={14} />
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400">
                              Pending
                            </span>
                          )}
                        </td>
                      </>
                    ) : viewMode === "confirmed" ? (
                      <>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                          {booking.externalBookingCode ? (
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-mono text-gray-700">
                                {booking.externalBookingCode}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyToClipboard(
                                    booking.externalBookingCode,
                                    "Booking code"
                                  );
                                }}
                                className="text-gray-400 hover:text-gray-600"
                                title="Copy booking code"
                              >
                                <FiCopy size={14} />
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400">--</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                          <div className="flex items-center gap-3">
                            <span className="text-blue-600 font-medium text-sm">
                              View
                            </span>
                            {booking.chatId && (
                              <FiMessageCircle
                                size={16}
                                className="text-gray-400"
                              />
                            )}
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-mono text-blue-600">
                              {proxyEmail}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(proxyEmail, "Email");
                              }}
                              className="text-gray-400 hover:text-gray-600"
                              title="Copy email"
                            >
                              <FiCopy size={14} />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                          <div className="flex items-center gap-2">
                            <span className="text-green-600 font-medium text-sm">
                              Fulfill
                            </span>
                            {booking.chatId && (
                              <FiMessageCircle
                                size={16}
                                className="text-gray-400"
                              />
                            )}
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
          </DefaultTable>
          {hasNextPage && (
            <TablePagination
              loading={isFetchingNextPage}
              onFetchMore={fetchNextPage}
            />
          )}
        </>
      ) : (
        <NoData />
      )}

      {/* Booking Detail Drawer */}
      {activeBooking && (
        <BookingDetailDrawer
          booking={activeBooking}
          onClose={() => setActiveBooking(null)}
          onFulfilled={() => {
            setInstaDelete((prev) => [...prev, activeBooking.id]);
            setActiveBooking(null);
          }}
          onStatusUpdated={() => {
            setActiveBooking(null);
          }}
        />
      )}
    </div>
  );
}
