"use client";

import { AppToast } from "@/app/_components/AppToast";
import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import Badge from "@/app/_components/forms/badge";
import Modal from "@/app/_components/popups/modal";
import { Spinner } from "@/app/_components/spinner/Spinner";
import DefaultTable from "@/app/_components/table/defaultTable";
import NoData from "@/app/_components/table/NoData";
import TablePagination from "@/app/_components/table/tablePagination";
import {
  useAdminVenues,
  useDeleteAdminVenue,
  useSynchroVenues,
  useUpdateAdminVenue,
} from "@/hooks/api/v2/venues";
import { UserAvatarV2 } from "@/v2/components/common/avatar.component";
import { profileToUser } from "@/v2/helpers/common.helpers";
import { AdminVenue, VenueStatus } from "@/v2/types/venue.types";
import { useEffect, useMemo, useState } from "react";
import { BiCheckDouble, BiPauseCircle, BiTrash } from "react-icons/bi";
import { toast as $toast } from "react-toastify";
import VenueDetails from "../components/venue_details";

const TABLE_HEADERS = [
  "Venue",
  "Rates",
  "Capacity",
  "Status",
  "Created",
  "Actions",
];

type ToastPayload = {
  type: "success" | "error";
  message: string;
};

type Props = {
  status?: VenueStatus;
  title: string;
  variant?: "global" | "synchro";
};

export function VenueStatusView({ status, title, variant = "global" }: Props) {
  const [search, setSearch] = useState("");
  const [selectedVenue, setSelectedVenue] = useState<AdminVenue | null>(null);
  const [pendingRows, setPendingRows] = useState<string[]>([]);
  const [toastState, setToastState] = useState<ToastPayload | null>(null);

  const limit = 10;
  const venuesQuery =
    variant === "synchro"
      ? useSynchroVenues({ status, limit })
      : useAdminVenues({ status, limit });
  const { mutate: updateVenue } = useUpdateAdminVenue();
  const { mutate: deleteVenue } = useDeleteAdminVenue();


  useEffect(() => {
      
  }, [status])

  const venues = useMemo<AdminVenue[]>(() => {
    const { data } = venuesQuery;
    const items = (data?.pages || []).flatMap((p: any) => p.data?.data ?? []);

    if (!search.trim()) {
      return items;
    }
    const term = search.toLowerCase();
    return items.filter((venue) => {
      const searchable = [
        venue.title,
        venue.city,
        venue.region,
        venue.owner?.username,
        venue.owner?.businessName,
      ]
        .filter(Boolean)
        .map((val) => val!.toLowerCase());
      return searchable.some((field) => field.includes(term));
    });
  }, [venuesQuery.data?.pages, search]);

  useEffect(() => {
    if (!toastState) return;
    $toast(
      <AppToast
        toastProps={{ type: toastState.type }}
        closeToast={() => setToastState(null)}
      >
        {toastState.message}
      </AppToast>
    );
  }, [toastState]);

  function setRowPending(venueId: string, isPending: boolean) {
    setPendingRows((prev) =>
      isPending ? [...prev, venueId] : prev.filter((id) => id !== venueId)
    );
  }

  function handleStatusChange(venue: AdminVenue, nextStatus: VenueStatus) {
    setRowPending(venue.id, true);
    updateVenue(
      { venueId: venue.id, payload: { status: nextStatus } },
      {
        onSuccess: () => {
          setToastState({
            type: "success",
            message: `${venue.title} marked as ${humanizeStatus(nextStatus)}`,
          });
        },
        onError: (error: any) => {
          setToastState({
            type: "error",
            message:
              error?.response?.data?.message ?? "Failed to update venue status",
          });
        },
        onSettled: () => setRowPending(venue.id, false),
      }
    );
  }

  function handleDelete(venue: AdminVenue) {
    const confirmed = window.confirm(
      `Delete ${venue.title}? This cancels active bookings.`
    );
    if (!confirmed) return;

    setRowPending(venue.id, true);
    deleteVenue(venue.id, {
      onSuccess: () => {
        setToastState({
          type: "success",
          message: `${venue.title} deleted`,
        });
      },
      onError: (error: any) => {
        setToastState({
          type: "error",
          message: error?.response?.data?.message ?? "Failed to delete venue",
        });
      },
      onSettled: () => setRowPending(venue.id, false),
    });
  }

  if (venuesQuery.isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-4" key={status}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <DashboardAction
          isLoading={venuesQuery.isFetching}
          onChangeText={setSearch}
          textValue={search}
        />


      </div>

      {venues.length > 0 ? (
        <>
          <DefaultTable header={TABLE_HEADERS as any}>
            {venues.map((venue) => (
              <VenueRow
                key={venue.id}
                venue={venue}
                onViewDetails={setSelectedVenue}
                onActivate={() => handleStatusChange(venue, "active")}
                onPause={() => handleStatusChange(venue, "inactive")}
                onDelete={() => handleDelete(venue)}
                isPending={pendingRows.includes(venue.id)}
              />
            ))}
          </DefaultTable>
          {venuesQuery.hasNextPage && (
            <TablePagination
              loading={venuesQuery.isFetchingNextPage}
              onFetchMore={() => venuesQuery.fetchNextPage()}
            />
          )}
        </>
      ) : (
        <NoData />
      )}

      <Modal
        isOpen={Boolean(selectedVenue)}
        onClose={() => setSelectedVenue(null)}
      >
        {selectedVenue && <VenueDetails venue={selectedVenue} />}
      </Modal>
    </div>
  );
}

type RowProps = {
  venue: AdminVenue;
  onViewDetails: (venue: AdminVenue) => void;
  onActivate: () => void;
  onPause: () => void;
  onDelete: () => void;
  isPending: boolean;
};

function VenueRow({
  venue,
  onViewDetails,
  onActivate,
  onPause,
  onDelete,
  isPending,
}: RowProps) {
  const owner = venue.owner ? profileToUser(venue.owner) : undefined;
  const created = new Date(venue.createdAt).toLocaleDateString();
  const rateSummary = formatRates(venue);
  const capacitySummary = `${Number(
    String(venue.capacity)
  ).toLocaleString()} guests`;

  return (
    <tr className="border-b border-gray-200 text-sm">
      <td className="px-6 py-4">
        <button
          className="flex items-center gap-3 text-left"
          onClick={() => onViewDetails(venue)}
        >
          <VenueThumbnail venue={venue} />
          <div className="space-y-1">
            <p className="font-medium">{venue.title}</p>
            <p className="text-xs text-gray-500">
              {venue.city}, {venue.country}
            </p>
            {owner && (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-[20px] h-[20px]">
                  <UserAvatarV2 user={owner} />
                </div>
                <span>@{owner.profiles?.[0].username}</span>
              </div>
            )}
          </div>
        </button>
      </td>
      <td className="px-6 py-4">{rateSummary}</td>
      <td className="px-6 py-4">{capacitySummary}</td>
      <td className="px-6 py-4">
        <StatusBadge status={venue.status} />
      </td>
      <td className="px-6 py-4 text-xs text-gray-500">{created}</td>
      <td className="px-6 py-4">
        {isPending ? (
          <Spinner />
        ) : (
          <div className="flex items-center gap-4 text-base">
            {venue.status !== "active" && (
              <button
                type="button"
                onClick={onActivate}
                className="text-green-500 transition hover:opacity-70"
                aria-label="Activate venue"
              >
                <BiCheckDouble size={20} />
              </button>
            )}
            {venue.status !== "inactive" && (
              <button
                type="button"
                onClick={onPause}
                className="text-orange-500 transition hover:opacity-70"
                aria-label="Pause venue"
              >
                <BiPauseCircle size={20} />
              </button>
            )}
            <button
              type="button"
              onClick={onDelete}
              className="text-red-500 transition hover:opacity-70"
              aria-label="Delete venue"
            >
              <BiTrash size={20} />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}

function VenueThumbnail({ venue }: { venue: AdminVenue }) {
  const image = venue.images?.[0];
  return (
    <div className="h-14 w-14 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
      {image ? (
        <img
          src={image}
          alt={venue.title}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
          Img
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: VenueStatus }) {
  const meta = statusMeta(status);
  return <Badge status={meta.badgeStatus} label={meta.label} size="small" />;
}

function statusMeta(status: VenueStatus): {
  label: string;
  badgeStatus: string;
} {
  switch (status) {
    case "active":
      return { label: "Active", badgeStatus: "Active" };
    case "inactive":
      return { label: "Inactive", badgeStatus: "Disabled" };
    case "under_maintenance":
      return { label: "Maintenance", badgeStatus: "shiny" };
    default:
      return { label: "Draft", badgeStatus: "Pending" };
  }
}

function humanizeStatus(status: VenueStatus): string {
  return statusMeta(status).label;
}

function formatRates(venue: AdminVenue): string {
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: venue.currency || "USD",
    maximumFractionDigits: 0,
  });

  if (venue.rateType === "hourly") {
    return `${formatter.format(venue.hourlyRate ?? 0)}/hr`;
  }

  if (venue.rateType === "daily") {
    return `${formatter.format(venue.dailyRate ?? 0)}/day`;
  }

  const hourly = formatter.format(venue.hourlyRate ?? 0);
  const daily = formatter.format(venue.dailyRate ?? 0);
  return `${hourly}/hr · ${daily}/day`;
}
