"use client";
import Badge from "@/app/_components/forms/badge";
import Input from "@/app/_components/input_fields";
import { Spinner } from "@/app/_components/spinner/Spinner";
import DefaultTable from "@/app/_components/table/defaultTable";
import TablePagination from "@/app/_components/table/tablePagination";
import { useSearchQuery } from "@/hooks/api/useSearchQuery";
import { Event } from "@/v2/types/event.types";
import moment from "moment";
import Image from "next/image";
import { useState } from "react";
import UploadJsonButton from "../components/upload-json-button";
import EventsListManager from "../components/events-list-manager";
import { ScrapedEvent } from "../types/scraped-event.types";
import EditAIEventModal from "../components/edit-ai-event-modal";
import DeleteConfirmationModal from "../components/delete-confirmation-modal";
import { useTMutation } from "@/hooks/api/useTMutation";
import { toast } from "react-toastify";
import { AppToast } from "@/app/_components/AppToast";
import { useQueryClient } from "@tanstack/react-query";

const style = "px-6 py-4 whitespace-no-wrap border-b border-gray-300";

const EventsView = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrapedEvents, setScrapedEvents] = useState<ScrapedEvent[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    type: "single" | "bulk";
    eventId?: string;
    eventIds?: string[];
  } | null>(null);

  const {
    isLoading,
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    updateSearch,
    searchParams,
    isRefetching,
    isFetching,
  } = useSearchQuery({
    baseUrl: "/admin/events/synchro-ai-events",
    queryKey: ["synchro-ai-events"],
    enabled: true,
    initialSearchParams: {},
  });

  const events = data?.pages?.map((e: any) => e.data.data).flat() as Event[];

  // Update event mutation - uses pathParams for dynamic eventId
  const { mutate: updateEventMutation, isLoading: isUpdating } = useTMutation({
    url: "/admin/events",
    method: "put",
    pathParams: ["eventId"],
    options: {
      onSuccess: () => {
        toast(<AppToast>Event updated successfully!</AppToast>, {
          type: "success",
        });
        queryClient.invalidateQueries(["synchro-ai-events"]);
        setEditingEvent(null);
      },
      onError: (error: any) => {
        toast(
          <AppToast>
            {error?.response?.data?.message || "Failed to update event"}
          </AppToast>,
          { type: "error" }
        );
      },
    },
  });

  // Delete single event mutation - uses pathParams for dynamic eventId
  const { mutate: deleteEventMutation, isLoading: isDeletingSingle } =
    useTMutation({
      url: "/admin/events",
      method: "delete",
      pathParams: ["eventId"],
      options: {
        onSuccess: () => {
          toast(<AppToast>Event deleted successfully!</AppToast>, {
            type: "success",
          });
          queryClient.invalidateQueries(["synchro-ai-events"]);
          setDeleteTarget(null);
          setSelectedEvents([]);
        },
        onError: (error: any) => {
          toast(
            <AppToast>
              {error?.response?.data?.message || "Failed to delete event"}
            </AppToast>,
            { type: "error" }
          );
        },
      },
    });

  // Bulk delete mutation
  const { mutate: bulkDeleteEvents, isLoading: isDeletingBulk } = useTMutation({
    url: "/admin/events/bulk-delete",
    method: "post",
    options: {
      onSuccess: (response: any) => {
        const deleted = response.data?.deleted || 0;
        const failed = response.data?.failed || 0;

        if (failed > 0) {
          toast(
            <AppToast>
              Deleted {deleted} event(s). {failed} failed.
            </AppToast>,
            { type: "warning" }
          );
        } else {
          toast(<AppToast>Successfully deleted {deleted} event(s)!</AppToast>, {
            type: "success",
          });
        }

        queryClient.invalidateQueries(["synchro-ai-events"]);
        setDeleteTarget(null);
        setSelectedEvents([]);
      },
      onError: (error: any) => {
        toast(
          <AppToast>
            {error?.response?.data?.message || "Failed to delete events"}
          </AppToast>,
          { type: "error" }
        );
      },
    },
  });

  // Handlers
  const handleJsonUpload = (events: ScrapedEvent[]) => {
    setScrapedEvents(events);
    setIsModalOpen(true);
  };

  const handleRemoveEvent = (index: number) => {
    setScrapedEvents((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateEvent = (index: number, updatedEvent: ScrapedEvent) => {
    setScrapedEvents((prev) =>
      prev.map((event, i) => (i === index ? updatedEvent : event))
    );
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setScrapedEvents([]);
  };

  const handleEditEvent = (eventId: string, updates: any) => {
    // Include eventId in the request body for pathParams to extract
    updateEventMutation({ ...updates, eventId: `${eventId}/update` });
  };

  const handleDeleteSingle = (eventId: string) => {
    setDeleteTarget({ type: "single", eventId });
  };

  const handleBulkDelete = () => {
    if (selectedEvents.length === 0) return;
    setDeleteTarget({ type: "bulk", eventIds: selectedEvents });
  };

  const confirmDelete = () => {
    if (deleteTarget?.type === "single" && deleteTarget.eventId) {
      // Include eventId in the request body for pathParams to extract
      deleteEventMutation({ eventId: deleteTarget.eventId });
    } else if (deleteTarget?.type === "bulk" && deleteTarget.eventIds) {
      bulkDeleteEvents({ eventIds: deleteTarget.eventIds });
    }
  };

  const toggleSelectEvent = (eventId: string) => {
    setSelectedEvents((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedEvents.length === events?.length) {
      setSelectedEvents([]);
    } else {
      setSelectedEvents(events?.map((e) => e.id) || []);
    }
  };

  const isAllSelected =
    events?.length > 0 && selectedEvents.length === events?.length;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3 items-center">
          <Input
            name="search"
            type="search"
            placeholder="Search events..."
            onChange={(e) => updateSearch({ search: e.target.value })}
            style={{
              width: "300px",
              border: "1px solid #EEE",
            }}
          />
          <button
            onClick={() => updateSearch({ search: "" })}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Clear
          </button>
          {selectedEvents.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete Selected ({selectedEvents.length})
            </button>
          )}
          {(isRefetching || isFetching) && <Spinner />}
        </div>

        <UploadJsonButton onUpload={handleJsonUpload} />
      </div>

      {events?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Image
            src="/images/noData/events.svg"
            alt="No events"
            width={200}
            height={200}
          />
          <p className="mt-4 text-gray-500">No Synchro AI events found</p>
          <p className="text-sm text-gray-400 mt-2">
            Upload a JSON file to create events
          </p>
        </div>
      ) : (
        <>
          <DefaultTable
            // @ts-ignore
            header={[
              <input
                type="checkbox"
                key="checkbox-header"
                className="rounded"
                checked={isAllSelected}
                onChange={toggleSelectAll}
              />,
              "Event Name",
              "Category",
              "Date & Time",
              "Location",
              "Attendees",
              "Status",
              "Actions",
            ]}
          >
            {events?.map((event: Event, key: number) => {
              const isSelected = selectedEvents.includes(event.id);
              return (
                <tr key={key} className="text-sm hover:bg-slate-50">
                  <td className={style}>
                    <input
                      type="checkbox"
                      className="rounded"
                      checked={isSelected}
                      onChange={() => toggleSelectEvent(event.id)}
                    />
                  </td>
                  <td className={style}>
                    <div className="flex gap-3 items-center">
                      {event.banner && (
                        <div className="w-12 h-12 relative rounded overflow-hidden">
                          <Image
                            src={event.banner}
                            alt={event.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold">{event.name}</h3>
                        <p className="text-xs text-gray-500">
                          {event.category?.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className={style}>
                    <h3>{event.category?.name || "—"}</h3>
                  </td>
                  <td className={style}>
                    <div>
                      <h3>
                        {moment(event.startDateTime).format("MMM DD, YYYY")}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {moment(event.startDateTime).format("hh:mm A")} -{" "}
                        {moment(event.endDateTime).format("hh:mm A")}
                      </p>
                    </div>
                  </td>
                  <td className={style}>
                    <h3 className="max-w-[200px] truncate">{event.address}</h3>
                  </td>
                  <td className={style}>
                    <h3>
                      {event.attendeesCount || 0}
                      {event.maxAttendees ? ` / ${event.maxAttendees}` : ""}
                    </h3>
                  </td>
                  <td className={style}>
                    <Badge status={event.status} />
                  </td>
                  <td className={style}>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingEvent(event)}
                        className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteSingle(event.id)}
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

          {hasNextPage && (
            <TablePagination
              loading={isFetchingNextPage}
              onFetchMore={() => {
                fetchNextPage();
              }}
            />
          )}
        </>
      )}

      {isModalOpen && scrapedEvents.length > 0 && (
        <EventsListManager
          events={scrapedEvents}
          onRemove={handleRemoveEvent}
          onUpdate={handleUpdateEvent}
          onClose={closeModal}
        />
      )}

      {/* Edit Event Modal */}
      {editingEvent && (
        <EditAIEventModal
          isOpen={!!editingEvent}
          onClose={() => setEditingEvent(null)}
          event={editingEvent}
          onSave={handleEditEvent}
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
              ? "Delete Event"
              : "Delete Multiple Events"
          }
          message={
            deleteTarget.type === "single"
              ? "Are you sure you want to delete this event?"
              : `Are you sure you want to delete ${deleteTarget.eventIds?.length} events?`
          }
          itemCount={
            deleteTarget.type === "bulk"
              ? deleteTarget.eventIds?.length
              : undefined
          }
        />
      )}
    </div>
  );
};

export default EventsView;
