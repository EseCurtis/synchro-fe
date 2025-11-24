"use client";
import Input from "@/app/_components/input_fields";
import { Spinner } from "@/app/_components/spinner/Spinner";
import DefaultTable from "@/app/_components/table/defaultTable";
import { useSearchQuery } from "@/hooks/api/useSearchQuery";
import { Venue, ScrapedVenue } from "../types/scraped-venue.types";
import Image from "next/image";
import { useState } from "react";
import UploadJsonButton from "../components/upload-json-button-venues";
import VenuesListManager from "../components/venues-list-manager";
import EditAIVenueModal from "../components/edit-ai-venue-modal";
import DeleteConfirmationModal from "../components/delete-confirmation-modal";
import { useTMutation } from "@/hooks/api/useTMutation";
import { toast } from "react-toastify";
import { AppToast } from "@/app/_components/AppToast";
import { useQueryClient } from "@tanstack/react-query";

const style = "px-6 py-4 whitespace-no-wrap border-b border-gray-300";

const VenuesView = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrapedVenues, setScrapedVenues] = useState<ScrapedVenue[]>([]);
  const [selectedVenues, setSelectedVenues] = useState<string[]>([]);
  const [editingVenue, setEditingVenue] = useState<Venue | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    type: "single" | "bulk";
    venueId?: string;
    venueIds?: string[];
  } | null>(null);

  const {
    isLoading,
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    updateSearch,
    searchParams,
  } = useSearchQuery<Venue>({
    baseUrl: "/admin/venues/synchro-ai-venues",
    queryKey: ["synchro-ai-venues"],
    enabled: true,
    initialSearchParams: {},
  });

  const venues = data?.pages?.map((page: any) => page.data.data).flat() as Venue[] || [];

  // Update venue mutation
  const { mutate: updateVenue, isLoading: isUpdating } = useTMutation({
    url: "/admin/venues",
    method: "put",
    options: {
      onSuccess: () => {
        toast(<AppToast>Venue updated successfully!</AppToast>, {
          type: "success",
        });
        queryClient.invalidateQueries(["synchro-ai-venues"]);
        setEditingVenue(null);
      },
      onError: (error: any) => {
        toast(
          <AppToast>
            {error?.response?.data?.message || "Failed to update venue"}
          </AppToast>,
          { type: "error" }
        );
      },
    },
  });

  // Delete single venue mutation
  const { mutate: deleteSingleVenue, isLoading: isDeletingSingle } =
    useTMutation({
      url: "/admin/venues",
      method: "delete",
      options: {
        onSuccess: () => {
          toast(<AppToast>Venue deleted successfully!</AppToast>, {
            type: "success",
          });
          queryClient.invalidateQueries(["synchro-ai-venues"]);
          setDeleteTarget(null);
          setSelectedVenues([]);
        },
        onError: (error: any) => {
          toast(
            <AppToast>
              {error?.response?.data?.message || "Failed to delete venue"}
            </AppToast>,
            { type: "error" }
          );
        },
      },
    });

  // Bulk delete mutation
  const { mutate: bulkDeleteVenues, isLoading: isDeletingBulk } = useTMutation(
    {
      url: "/admin/venues/bulk-delete",
      method: "post",
      options: {
        onSuccess: (response: any) => {
          const deleted = response.data?.deleted || response.deleted || 0;
          const failed = response.data?.failed || response.failed || 0;

          if (failed > 0) {
            toast(
              <AppToast>
                Deleted {deleted} venue(s). {failed} failed.
              </AppToast>,
              { type: "warning" }
            );
          } else {
            toast(
              <AppToast>Successfully deleted {deleted} venue(s)!</AppToast>,
              { type: "success" }
            );
          }

          queryClient.invalidateQueries(["synchro-ai-venues"]);
          setDeleteTarget(null);
          setSelectedVenues([]);
        },
        onError: (error: any) => {
          toast(
            <AppToast>
              {error?.response?.data?.message || "Failed to delete venues"}
            </AppToast>,
            { type: "error" }
          );
        },
      },
    }
  );

  const handleJsonUpload = (venues: ScrapedVenue[]) => {
    setScrapedVenues(venues);
    setIsModalOpen(true);
  };

  const handleRemoveVenue = (index: number) => {
    setScrapedVenues((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateVenue = (index: number, updatedVenue: ScrapedVenue) => {
    setScrapedVenues((prev) =>
      prev.map((venue, i) => (i === index ? updatedVenue : venue))
    );
  };

  const handleEditVenue = (venueId: string, updates: any) => {
    updateVenue(
      { ...updates },
      { dynamicUrl: `${venueId}/update` } as any
    );
  };

  const handleDeleteSingle = (venueId: string) => {
    setDeleteTarget({ type: "single", venueId });
  };

  const handleBulkDelete = () => {
    if (selectedVenues.length === 0) return;
    setDeleteTarget({ type: "bulk", venueIds: selectedVenues });
  };

  const confirmDelete = () => {
    if (deleteTarget?.type === "single" && deleteTarget.venueId) {
      deleteSingleVenue({}, { dynamicUrl: deleteTarget.venueId } as any);
    } else if (deleteTarget?.type === "bulk" && deleteTarget.venueIds) {
      bulkDeleteVenues({ venueIds: deleteTarget.venueIds });
    }
  };

  const toggleSelectVenue = (venueId: string) => {
    setSelectedVenues((prev) =>
      prev.includes(venueId)
        ? prev.filter((id) => id !== venueId)
        : [...prev, venueId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedVenues.length === venues?.length) {
      setSelectedVenues([]);
    } else {
      setSelectedVenues(venues?.map((v) => v.id) || []);
    }
  };

  const isAllSelected =
    venues?.length > 0 && selectedVenues.length === venues?.length;

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { color: string; text: string }> = {
      active: { color: "bg-green-100 text-green-700", text: "Active" },
      inactive: { color: "bg-gray-100 text-gray-700", text: "Inactive" },
      draft: { color: "bg-yellow-100 text-yellow-700", text: "Draft" },
      suspended: { color: "bg-red-100 text-red-700", text: "Suspended" },
    };
    const badge = statusMap[status] || statusMap.active;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${badge.color}`}>
        {badge.text}
      </span>
    );
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <div className="w-full lg:w-96">
          <Input
            type="text"
            placeholder="Search venues..."
            value={searchParams.search || ""}
            onChange={(e) => updateSearch({ search: e.target.value })}
            className="w-full"
          />
        </div>
        <div className="flex gap-3">
          {selectedVenues.length > 0 && (
            <button
              onClick={handleBulkDelete}
              disabled={isDeletingBulk}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            >
              {isDeletingBulk
                ? "Deleting..."
                : `Delete Selected (${selectedVenues.length})`}
            </button>
          )}
          <UploadJsonButton onUpload={handleJsonUpload} />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Spinner />
        </div>
      ) : venues.length === 0 ? (
        <div className="text-center py-20">
          <Image
            src="/images/noData/venues.svg"
            alt="No venues"
            width={200}
            height={200}
            className="mx-auto mb-4"
          />
          <p className="text-gray-500 text-lg">No Synchro AI venues found</p>
          <p className="text-gray-400 text-sm mt-2">
            Upload a JSON file to create venues
          </p>
        </div>
      ) : (
        <>
          <DefaultTable
            header={[
              <input
                type="checkbox"
                key="checkbox-header"
                className="rounded"
                checked={isAllSelected}
                onChange={toggleSelectAll}
              />,
              "Venue Name",
              "Type",
              "City",
              "Capacity",
              "Hourly Rate",
              "Rating",
              "Bookings",
              "Status",
              "Actions",
            ]}
          >
            {venues.map((venue: Venue, key: number) => {
              const isSelected = selectedVenues.includes(venue.id);
              return (
                <tr key={key} className="text-sm hover:bg-slate-50">
                  <td className={style}>
                    <input
                      type="checkbox"
                      className="rounded"
                      checked={isSelected}
                      onChange={() => toggleSelectVenue(venue.id)}
                    />
                  </td>
                  <td className={`${style} max-w-xs`}>
                    <div className="flex items-center gap-3">
                      {venue.images && venue.images.length > 0 ? (
                        <Image
                          src={venue.images[0]}
                          alt={venue.title}
                          width={50}
                          height={50}
                          className="rounded object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No img</span>
                        </div>
                      )}
                      <div className="truncate">
                        <p className="font-medium truncate">{venue.title}</p>
                        <p className="text-xs text-gray-500 truncate">
                          {venue.address}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className={style}>
                    <span className="capitalize">
                      {venue.type.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className={style}>{venue.city}</td>
                  <td className={style}>{venue.capacity} guests</td>
                  <td className={style}>
                    {venue.hourlyRate
                      ? `${venue.currency} ${venue.hourlyRate}/hr`
                      : venue.dailyRate
                      ? `${venue.currency} ${venue.dailyRate}/day`
                      : "N/A"}
                  </td>
                  <td className={style}>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span>
                        {venue.averageRating?.toFixed(1) || "N/A"}
                      </span>
                      <span className="text-gray-400 text-xs">
                        ({venue.reviewsCount || 0})
                      </span>
                    </div>
                  </td>
                  <td className={style}>{venue.bookingsCount || 0}</td>
                  <td className={style}>{getStatusBadge(venue.status)}</td>
                  <td className={style}>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingVenue(venue)}
                        className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteSingle(venue.id)}
                        className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </DefaultTable>

          {/* Load More Button for Infinite Scroll */}
          {hasNextPage && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {isFetchingNextPage ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      )}

      {/* Venues List Manager Modal */}
      {isModalOpen && (
        <VenuesListManager
          venues={scrapedVenues}
          onRemove={handleRemoveVenue}
          onUpdate={handleUpdateVenue}
          onClose={() => {
            setIsModalOpen(false);
            setScrapedVenues([]);
          }}
        />
      )}

      {/* Edit Venue Modal */}
      {editingVenue && (
        <EditAIVenueModal
          isOpen={!!editingVenue}
          onClose={() => setEditingVenue(null)}
          venue={editingVenue}
          onSave={handleEditVenue}
          isSaving={isUpdating}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <DeleteConfirmationModal
          isOpen={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={confirmDelete}
          isDeleting={isDeletingSingle || isDeletingBulk}
          title={
            deleteTarget.type === "single"
              ? "Delete Venue"
              : "Delete Multiple Venues"
          }
          message={
            deleteTarget.type === "single"
              ? "Are you sure you want to delete this venue? All associated bookings will be cancelled."
              : `Are you sure you want to delete ${deleteTarget.venueIds?.length} venues? All associated bookings will be cancelled.`
          }
          itemCount={
            deleteTarget.type === "bulk"
              ? deleteTarget.venueIds?.length
              : undefined
          }
        />
      )}
    </div>
  );
};

export default VenuesView;

