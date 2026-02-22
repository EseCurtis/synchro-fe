"use client";
import { FC, useState } from "react";
import { ScrapedVenue } from "../types/scraped-venue.types";
import Image from "next/image";
import { useTMutation } from "@/hooks/api/useTMutation";
import { toast } from "react-toastify";
import { AppToast } from "@/app/_components/AppToast";
import { useQueryClient } from "@tanstack/react-query";
import EditVenueModal from "./edit-venue-modal";
import { mapScrapedVenueToPayload } from "../utils/venue-mapper";

interface VenuesListManagerProps {
  venues: ScrapedVenue[];
  onRemove: (index: number) => void;
  onUpdate: (index: number, updatedVenue: ScrapedVenue) => void;
  onClose: () => void;
}

const VenuesListManager: FC<VenuesListManagerProps> = ({
  venues,
  onRemove,
  onUpdate,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const { mutate: bulkCreate, isLoading: isCreating } = useTMutation({
    url: "/admin/venues/create-venues-bulk",
    method: "post",
    config: {
      timeout: 120000, // 2 minutes for bulk operations
    },
    options: {
      onSuccess: (response: any) => {
        console.log("Bulk create response:", response);
        const responseData = response?.data || response;
        const successCount = responseData?.created || 0;
        const failedCount = responseData?.failed || 0;

        if (failedCount > 0) {
          toast(
            <AppToast>
              Created {successCount} venue(s). {failedCount} failed.
            </AppToast>,
            { type: "warning" }
          );
        } else {
          toast(
            <AppToast>
              Successfully created {successCount} venue(s)!
            </AppToast>,
            { type: "success" }
          );
        }

        onClose();
        setTimeout(() => {
          queryClient.invalidateQueries(["synchro-ai-venues"]);
        }, 300);
      },
      onError: (error: any) => {
        console.error("Bulk create error:", error);
        const isTimeout =
          error?.code === "ECONNABORTED" ||
          error?.message?.includes("timeout");

        if (isTimeout) {
          toast(
            <AppToast>
              Request timed out. Venues may still be creating. Please refresh to
              check.
            </AppToast>,
            { type: "warning" }
          );
          setTimeout(() => {
            onClose();
            queryClient.invalidateQueries(["synchro-ai-venues"]);
          }, 2000);
        } else {
          toast(
            <AppToast>
              {error?.response?.data?.message || "Failed to create venues"}
            </AppToast>,
            { type: "error" }
          );
        }
      },
    },
  });

  const handleBulkCreate = () => {
    console.log(`Preparing to send ${venues.length} venues to bulk create API`);

    const venuesPayload = venues.map((venue) => {
      return mapScrapedVenueToPayload(venue);
    });

    console.log(`Sending ${venuesPayload.length} venues to bulk create API`);
    console.log("First venue sample:", venuesPayload[0]);

    bulkCreate({ venues: venuesPayload });
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[55] flex items-center justify-center p-4">
        <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold">
              Review Venues ({venues.length})
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Review, edit, or remove venues before creating them
            </p>
          </div>

          {/* Scrollable List */}
          <div className="flex-1 overflow-y-auto p-6">
            {venues.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  All venues have been removed. Upload a new JSON file or close
                  this dialog.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {venues.map((venue, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-4">
                      {/* Image */}
                      <div className="flex-shrink-0">
                        {venue.images && venue.images.length > 0 ? (
                          <Image
                            src={venue.images[0]}
                            alt={venue.name}
                            width={120}
                            height={120}
                            className="rounded object-cover"
                          />
                        ) : (
                          <div className="w-30 h-30 bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-gray-400">No image</span>
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg truncate">
                              {venue.name}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {venue.description ||
                                "No description available"}
                            </p>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            <button
                              onClick={() => setEditingIndex(index)}
                              className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => onRemove(index)}
                              className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        {/* Venue Info Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                          <div>
                            <p className="text-xs text-gray-500">City</p>
                            <p className="text-sm font-medium">
                              {venue.location.city}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Capacity</p>
                            <p className="text-sm font-medium">
                              {venue.capacity.max} guests
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Pricing</p>
                            <p className="text-sm font-medium">
                              {venue.pricing.hourly
                                ? `${venue.pricing.currency} ${venue.pricing.hourly}/hr`
                                : venue.pricing.daily
                                ? `${venue.pricing.currency} ${venue.pricing.daily}/day`
                                : "N/A"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Rating</p>
                            <p className="text-sm font-medium flex items-center gap-1">
                              <span className="text-yellow-500">★</span>
                              {venue.rating?.score || "N/A"}
                              {venue.rating?.count ? (
                                <span className="text-xs text-gray-400">
                                  ({venue.rating.count})
                                </span>
                              ) : null}
                            </p>
                          </div>
                        </div>

                        {/* Source Info */}
                        <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                            {venue.source}
                          </span>
                          {venue.amenities.length > 0 && (
                            <span>• {venue.amenities.length} amenities</span>
                          )}
                          {venue.images.length > 1 && (
                            <span>• {venue.images.length} images</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center p-6 border-t bg-gray-50">
            <button
              onClick={onClose}
              disabled={isCreating}
              className="px-6 py-3 text-gray-700 rounded-xl border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleBulkCreate}
              disabled={venues.length === 0 || isCreating}
              className="px-6 py-3 text-white rounded-xl bg-gradient-to-r from-blue-900 to-red-600 hover:from-blue-800 hover:to-red-500 disabled:opacity-50"
            >
              {isCreating
                ? "Creating..."
                : `Create All Venues (${venues.length})`}
            </button>
          </div>
        </div>
      </div>

      {/* Edit Venue Modal */}
      {editingIndex !== null && (
        <EditVenueModal
          isOpen={editingIndex !== null}
          onClose={() => setEditingIndex(null)}
          venueData={venues[editingIndex]}
          onSave={(updatedVenue) => {
            onUpdate(editingIndex, updatedVenue);
            setEditingIndex(null);
          }}
        />
      )}
    </>
  );
};

export default VenuesListManager;

