"use client";
import { FC, useState } from "react";
import { ScrapedEvent } from "../types/scraped-event.types";
import Image from "next/image";
import Badge from "@/app/_components/forms/badge";
import moment from "moment";
import { Button } from "@/app/_components/button";
import { useTMutation } from "@/hooks/api/useTMutation";
import { toast } from "react-toastify";
import { AppToast } from "@/app/_components/AppToast";
import { useQueryClient } from "@tanstack/react-query";
import EditEventModal from "./edit-event-modal";
import { useTQuery } from "@/hooks/api/useTQuery";
import { findMatchingCategory } from "../utils/event-mapper";

interface EventsListManagerProps {
  events: ScrapedEvent[];
  onRemove: (index: number) => void;
  onUpdate: (index: number, updatedEvent: ScrapedEvent) => void;
  onClose: () => void;
}

const EventsListManager: FC<EventsListManagerProps> = ({
  events,
  onRemove,
  onUpdate,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Helper to format location display
  const getLocationDisplay = (event: ScrapedEvent) => {
    const parts = [];
    if (event.location?.address && event.location.address.trim()) {
      parts.push(event.location.address.trim());
    }
    if (
      event.location?.venueName &&
      event.location.venueName.trim() &&
      event.location.venueName.toLowerCase() !== "tba"
    ) {
      parts.push(event.location.venueName.trim());
    }
    return parts.length > 0 ? parts.join(", ") : "Location TBD";
  };

  // Fetch event categories
  const { data: categoriesData, isLoading: categoriesLoading } = useTQuery<any>(
    {
      queryKey: ["event-categories"],
      url: "/events/categories",
      enabled: true,
    }
  );

  const categories = (categoriesData as any)?.data || [];

  // Bulk create mutation with extended timeout
  const { mutate: bulkCreate, isLoading: isCreating } = useTMutation({
    url: "/admin/events/create-events-bulk",
    method: "post",
    config: {
      timeout: 120000, // 2 minutes for bulk operations
    },
    options: {
      onSuccess: (response: any) => {
        console.log("Bulk create response:", response);

        // Handle both response formats: response.data or direct response
        const responseData = response?.data || response;
        const successCount = responseData?.events?.length || 0;
        const failedCount = responseData?.failed?.length || 0;

        if (failedCount > 0) {
          toast(
            <AppToast>
              Created {successCount} event(s). {failedCount} failed.
            </AppToast>,
            {
              type: "warning",
            }
          );
        } else {
          toast(
            <AppToast>Successfully created {successCount} event(s)!</AppToast>,
            {
              type: "success",
            }
          );
        }

        // Close modal first, then invalidate to prevent UI hanging
        onClose();

        // Invalidate queries after a short delay to allow modal to close
        setTimeout(() => {
          queryClient.invalidateQueries(["synchro-ai-events"]);
        }, 300);
      },
      onError: (error: any) => {
        console.error("Bulk create error:", error);

        // Check if it's a timeout error
        const isTimeout =
          error?.code === "ECONNABORTED" || error?.message?.includes("timeout");

        if (isTimeout) {
          toast(
            <AppToast>
              Request timed out. Events may still be creating. Please refresh to
              check.
            </AppToast>,
            {
              type: "warning",
            }
          );
          // Close modal and refresh after timeout
          setTimeout(() => {
            onClose();
            queryClient.invalidateQueries(["synchro-ai-events"]);
          }, 2000);
        } else {
          toast(
            <AppToast>
              {error?.response?.data?.message || "Failed to create events"}
            </AppToast>,
            {
              type: "error",
            }
          );
        }
      },
    },
  });

  const handleBulkCreate = () => {
    if (categoriesLoading || categories.length === 0) {
      toast(<AppToast>Categories are still loading. Please wait...</AppToast>, {
        type: "warning",
      });
      return;
    }

    // Log categories for debugging
    console.log("Available categories:", categories);

    // Find "Other" category as fallback
    const otherCategory = categories.find(
      (cat: any) => cat.name.toLowerCase() === "other"
    );
    const fallbackCategoryId = otherCategory?.id || categories[0]?.id;

    if (!fallbackCategoryId) {
      toast(
        <AppToast>
          No categories available. Please create categories first.
        </AppToast>,
        {
          type: "error",
        }
      );
      return;
    }

    // Transform events to API format with category mapping
    const eventsPayload = events.map((event) => {
      const categoryId = findMatchingCategory(event.category, categories);
      const finalCategoryId = categoryId || fallbackCategoryId;

      // Log if using fallback
      if (!categoryId) {
        console.log(
          `Event "${event.title}" category "${event.category}" not found, using fallback`
        );
      }

      // Build address from available location data
      const addressParts = [];
      if (event.location?.address && event.location.address.trim()) {
        addressParts.push(event.location.address.trim());
      }
      if (
        event.location?.venueName &&
        event.location.venueName.trim() &&
        event.location.venueName.toLowerCase() !== "tba"
      ) {
        addressParts.push(event.location.venueName.trim());
      }
      const fullAddress =
        addressParts.length > 0 ? addressParts.join(", ") : "Location TBD";

      // Default coordinates for Lagos, Nigeria if not provided
      const defaultLagosLat = 6.5244;
      const defaultLagosLng = 3.3792;

      return {
        name: event.title,
        description: event.description,
        categoryId: finalCategoryId,
        banner: event.images?.banner || event.images?.thumbnail,
        latitude: event.location?.latitude || defaultLagosLat,
        longitude: event.location?.longitude || defaultLagosLng,
        address: fullAddress,
        startDateTime: new Date(event.startDate).toISOString(),
        endDateTime: event.endDate
          ? new Date(event.endDate).toISOString()
          : new Date(
              new Date(event.startDate).getTime() + 3 * 60 * 60 * 1000
            ).toISOString(),
        timezone: event.timezone || "America/New_York",
        ticketType: event.pricing?.isFree ? "free" : "paid",
        ticketPrice: event.pricing?.isFree
          ? undefined
          : event.pricing?.priceRange === "Free"
          ? undefined
          : event.pricing?.ticketPrice || 0,
        currency: event.pricing?.currency || "USD",
        isPublic: true,
        canViewMembers: true,
        metadata: {
          source: event.source,
          sourceId: event.sourceId,
          sourceUrl: event.sourceUrl,
          tags: event.tags || [],
          organizer: event.organizer || {},
          scrapedAt: event.scrapedAt,
          isOnline: event.isOnline,
          isFeatured: event.isFeatured,
          status: event.status,
        },
      };
    });

    console.log(`Sending ${eventsPayload.length} events to bulk create API`);
    console.log("First event sample:", eventsPayload[0]);

    bulkCreate({ events: eventsPayload });
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-xl w-[90%] max-w-6xl max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <div>
              <h2 className="text-2xl font-bold">
                Events from JSON ({events.length})
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Review, edit, or remove events before bulk creation
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Events List */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {events.map((event, index) => (
                <div
                  key={`${event.id}-${index}`}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    {/* Event Image */}
                    {(event.images?.thumbnail || event.images?.banner) && (
                      <div className="w-24 h-24 relative rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={
                            event.images.thumbnail || event.images.banner || ""
                          }
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    {/* Event Info */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {event.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {event.description}
                          </p>
                        </div>
                        <div className="flex gap-2 ml-4">
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

                      <div className="flex flex-wrap gap-4 mt-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Badge
                            status={event.category}
                            label={event.category}
                            size="small"
                          />
                        </div>
                        <div className="text-gray-600">
                          📅{" "}
                          {moment(event.startDate).format(
                            "MMM DD, YYYY @ hh:mm A"
                          )}
                        </div>
                        <div className="text-gray-600">
                          📍 {getLocationDisplay(event)}
                        </div>
                        <div className="text-gray-600">
                          {event.pricing?.isFree
                            ? "🎟️ Free"
                            : `💰 ${event.pricing?.priceRange}`}
                        </div>
                        {event.organizer?.name && (
                          <div className="text-gray-600">
                            👤 {event.organizer.name}
                          </div>
                        )}
                      </div>

                      {event.tags && event.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {event.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {events.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No events to create. All events have been removed.
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex justify-between items-center p-6 border-t bg-gray-50">
            <div className="text-sm text-gray-600">
              {events.length} event{events.length !== 1 ? "s" : ""} ready to
              create
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100"
                disabled={isCreating}
              >
                Cancel
              </button>
              <Button
                onClick={handleBulkCreate}
                isLoading={isCreating}
                disabled={events.length === 0}
                className="px-6 text-white rounded-xl"
              >
                Create All Events ({events.length})
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingIndex !== null && (
        <EditEventModal
          isOpen={true}
          onClose={() => setEditingIndex(null)}
          eventData={events[editingIndex]}
          onSave={(updatedEvent) => {
            onUpdate(editingIndex, updatedEvent);
            setEditingIndex(null);
          }}
        />
      )}
    </>
  );
};

export default EventsListManager;
