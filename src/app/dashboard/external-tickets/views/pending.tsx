"use client";
import { AppToast } from "@/app/_components/AppToast";
import { Button } from "@/app/_components/button";
import { SecondaryButton } from "@/app/_components/button/secondaryButton";
import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import Badge from "@/app/_components/forms/badge";
import Input from "@/app/_components/input_fields";
import Modal from "@/app/_components/popups/modal";
import { Spinner } from "@/app/_components/spinner/Spinner";
import DefaultTable from "@/app/_components/table/defaultTable";
import NoData from "@/app/_components/table/NoData";
import TablePagination from "@/app/_components/table/tablePagination";
import {
  useFulfillExternalTicket,
  useInfiniteExternalTickets
} from "@/hooks/api/v2/external-tickets";
import { UserAvatarV2 } from "@/v2/components/common/avatar.component";
import { profileToUser } from "@/v2/helpers/common.helpers";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { useEffect, useState } from "react";
import { FiCopy, FiExternalLink } from "react-icons/fi";
import { toast as $toast } from "react-toastify";

export default function PendingTicketsView({
  status,
  viewMode,
}: {
  status?: string;
  viewMode?: "pending" | "fulfilled" | "all";
}) {
  // Determine header based on view mode
  const getHeader = () => {
    if (viewMode === "all") {
      return ["Event", "Platform", "User",  "Status", "Ticket Code"];
    }
    if (viewMode === "fulfilled") {
      return ["Event", "Platform", "User", "Ticket Code", "Fulfilled Date", "Actions"];
    }
    return ["Event", "Platform", "User", "Proxy Email", "Created", "Actions"];
  };

  const header = getHeader();
  const limit = 20;
  const [instaDelete, setInstaDelete] = useState<any[]>([]);
  const [modifying, setModifying] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [showFulfillModal, setShowFulfillModal] = useState(false);
  const [activeTicket, setActiveTicket] = useState<any | null>(null);
  const [fulfillmentData, setFulfillmentData] = useState<{
    externalTicketCode?: string;
    adminNotes?: string;
  }>({});

  const queryClient = useQueryClient();

  const { mutate: fulfill, isLoading: fulfilling } = useFulfillExternalTicket();

  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteExternalTickets(limit, true, { status, search });

  const items = (data?.pages || []).flatMap((p: any) => p.data?.data ?? []);

  function renderStatus(status: string) {
    const map: Record<string, { status: string; label?: string }> = {
      pending: { status: "Pending" },
      active: { status: "Active" },
      used: { status: "Disabled", label: "Used" },
      cancelled: { status: "Disabled", label: "Cancelled" },
      refunded: { status: "Disabled", label: "Refunded" },
    } as any;
    const meta = map[status] || { status: "pending", label: status };
    return <Badge status={meta.status} label={meta.label} size="small" />;
  }

  function openFulfillModal(ticket: any) {
    setActiveTicket(ticket);
    setFulfillmentData({});
    setShowFulfillModal(true);
  }

  function handleFulfill() {
    if (!activeTicket || !fulfillmentData.externalTicketCode) {
      setToast({
        type: "error",
        message: "External ticket code is required",
      });
      return;
    }

    setModifying((prev: any) => [...prev, activeTicket.id]);
    fulfill(
      {
        ticketId: activeTicket.id,
        externalTicketCode: fulfillmentData.externalTicketCode,
        adminNotes: fulfillmentData.adminNotes,
      },
      {
        onSuccess: () => {
          setToast({ type: "success", message: "Ticket fulfilled successfully" });
          setShowFulfillModal(false);
          setInstaDelete((prev: any) => [...prev, activeTicket.id]);
          setActiveTicket(null);
          setFulfillmentData({});
        },
        onError: (e: any) =>
          setToast({
            type: "error",
            message: e?.message ?? "Failed to fulfill ticket",
          }),
        onSettled() {
          setModifying((prev: any) =>
            prev.filter((i: any) => i !== activeTicket.id)
          );
        },
      }
    );
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
              .filter((ticket: any) => !instaDelete.includes(ticket.id))
              .map((ticket: any) => {
                const pending = fulfilling && modifying.includes(ticket.id);
                const event = ticket.event;
                const profile = ticket.profile;
                const user = profile?.user;
                const proxyEmail = user?.mailslurpEmail || user?.email;

                return (
                  <tr key={ticket.id} className="border-b">
                    {/* Event Column */}
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                      <button
                        className="flex gap-2 items-center text-left"
                        onClick={() => openFulfillModal(ticket)}
                      >
                        <div className="flex overflow-hidden w-[3em] h-[3em] bg-gray-500 rounded-lg">
                          <img
                            src={event?.banner || "/images/placeholder-event.jpg"}
                            className="w-[100%] h-[100%] object-cover"
                            alt=""
                            width={50}
                            height={50}
                          />
                        </div>
                        <div className="flex flex-col">
                          <h3 className="text-sm font-medium">{event?.name}</h3>
                          <span className="text-xs text-gray-500">
                            {ticket.ticketNumber}
                          </span>
                        </div>
                      </button>
                    </td>

                    {/* Platform Column */}
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                      {event?.externalPlatformName ? (
                        <Badge status="shiny" label={event.externalPlatformName} size="small" />
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

                    {/* Dynamic Columns Based on View Mode */}
                    {viewMode === "all" ? (
                      <>
                        {/* Status Column */}
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                          {renderStatus(ticket.status)}
                        </td>
                        {/* Ticket Code Column */}
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                          {ticket.externalTicketCode ? (
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-mono text-gray-700">
                                {ticket.externalTicketCode}
                              </span>
                              <button
                                onClick={() => copyToClipboard(ticket.externalTicketCode, "Ticket code")}
                                className="text-gray-400 hover:text-gray-600"
                                title="Copy ticket code"
                              >
                                <FiCopy size={14} />
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400">Pending</span>
                          )}
                        </td>
                      </>
                    ) : viewMode === "fulfilled" ? (
                      <>
                        {/* Ticket Code Column */}
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-mono text-gray-700">
                              {ticket.externalTicketCode}
                            </span>
                            <button
                              onClick={() => copyToClipboard(ticket.externalTicketCode, "Ticket code")}
                              className="text-gray-400 hover:text-gray-600"
                              title="Copy ticket code"
                            >
                              <FiCopy size={14} />
                            </button>
                          </div>
                        </td>
                        {/* Fulfilled Date Column */}
                        <td className="px-6 py-4 whitespace-no-wrap text-sm border-b border-gray-300 text-gray-500">
                          {moment(ticket.updatedAt).format("MMM DD, YYYY")}
                        </td>
                        {/* Actions Column - View Info */}
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                          <button
                            onClick={() => openFulfillModal(ticket)}
                            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                          >
                            View Info
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        {/* Proxy Email Column - Pending only */}
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-mono text-blue-600">
                              {proxyEmail }
                            </span>
                            <button
                              onClick={() => copyToClipboard(proxyEmail, "Email")}
                              className="text-gray-400 hover:text-gray-600"
                              title="Copy email"
                            >
                              <FiCopy size={14} />
                            </button>
                          </div>
                        </td>
                        {/* Created Date Column - Pending only */}
                        <td className="px-6 py-4 whitespace-no-wrap text-sm border-b border-gray-300 text-gray-500">
                          {moment(ticket.createdAt).format("MMM DD, YYYY")}
                        </td>
                        {/* Actions Column - Fulfill button */}
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                          {pending ? (
                            <Spinner />
                          ) : (
                            <button
                              onClick={() => openFulfillModal(ticket)}
                              className="text-green-600 hover:text-green-700 font-medium text-sm"
                            >
                              Fulfill
                            </button>
                          )}
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

      {/* Fulfill Modal */}
      <Modal isOpen={showFulfillModal} onClose={() => setShowFulfillModal(false)}>
        {activeTicket && (
          <div className="space-y-4">
            {/* Event Details */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex gap-3 items-start mb-3">
                <div className="flex overflow-hidden w-[4em] h-[4em] bg-gray-500 rounded-lg">
                  <img
                    src={activeTicket.event?.banner || "/images/placeholder-event.jpg"}
                    className="w-[100%] h-[100%] object-cover"
                    alt=""
                    width={64}
                    height={64}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-medium mb-1">
                    {activeTicket.event?.name}
                  </h3>
                  {activeTicket.event?.externalPlatformName && (
                    <Badge
                      status="shiny"
                      label={activeTicket.event.externalPlatformName}
                      size="small"
                    />
                  )}
                </div>
              </div>

              {/* External Event URL */}
              {activeTicket.event?.externalEventUrl && (
                <a
                  href={activeTicket.event.externalEventUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm mb-3"
                >
                  <span>View on {activeTicket.event.externalPlatformName || "external platform"}</span>
                  <FiExternalLink size={14} />
                </a>
              )}

              {/* User Info */}
              <div className="border-t pt-3">
                <div className="text-xs text-gray-500 mb-2">User</div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-[2em] aspect-square bg-gray-500 rounded-full">
                    <UserAvatarV2 user={profileToUser(activeTicket.profile)} />
                  </div>
                  <div className="text-sm">
                    {activeTicket.profile?.firstName ||
                    activeTicket.profile?.lastName
                      ? `${activeTicket.profile?.firstName} ${activeTicket.profile?.lastName}`
                      : activeTicket.profile?.username}
                  </div>
                </div>

                {/* Proxy Email - Highlighted */}
                <div className="bg-blue-50 border border-blue-200 rounded p-3">
                  <div className="text-xs text-blue-700 font-semibold mb-1">
                    PROXY EMAIL (Use this to register)
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono text-blue-900 font-medium">
                      {activeTicket.profile?.user?.mailslurpEmail ||
                        activeTicket.profile?.user?.email}
                    </span>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          activeTicket.profile?.user?.mailslurpEmail ||
                            activeTicket.profile?.user?.email,
                          "Proxy email"
                        )
                      }
                      className="text-blue-600 hover:text-blue-700"
                      title="Copy proxy email"
                    >
                      <FiCopy size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Inputs - Only show for pending tickets */}
            {viewMode !== "fulfilled" && activeTicket.status === "pending" && (
              <>
                <div className="space-y-3">
                  <Input
                    label="External Ticket Code *"
                    placeholder="Enter ticket code from external platform"
                    value={fulfillmentData.externalTicketCode || ""}
                    onChange={(e: any) =>
                      setFulfillmentData((prev) => ({
                        ...prev,
                        externalTicketCode: e.target.value,
                      }))
                    }
                  />
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Admin Notes (optional)
                    </label>
                    <textarea
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                      rows={3}
                      placeholder="e.g., Registered via Eventbrite using proxy email"
                      value={fulfillmentData.adminNotes || ""}
                      onChange={(e) =>
                        setFulfillmentData((prev) => ({
                          ...prev,
                          adminNotes: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  {modifying.includes(activeTicket?.id) ? (
                    <Spinner />
                  ) : (
                    <>
                      <SecondaryButton
                        onClick={() => {
                          setShowFulfillModal(false);
                          setActiveTicket(null);
                          setFulfillmentData({});
                        }}
                        disabled={fulfilling}
                        className="p-3 rounded-full py-2"
                      >
                        Cancel
                      </SecondaryButton>
                      <Button
                        onClick={handleFulfill}
                        disabled={fulfilling || !fulfillmentData.externalTicketCode}
                        className="p-3 rounded-full text-white py-2"
                      >
                        Fulfill Ticket
                      </Button>
                    </>
                  )}
                </div>
              </>
            )}

            {/* Fulfilled ticket info - Read only */}
            {(viewMode === "fulfilled" || (viewMode === "all" && activeTicket.status === "active")) && (
              <>
                <div className="space-y-3 bg-green-50 border border-green-200 rounded-lg p-4">
                  <div>
                    <label className="block text-sm font-medium text-green-800 mb-1">
                      External Ticket Code
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-mono text-green-900 font-semibold">
                        {activeTicket.externalTicketCode}
                      </span>
                      <button
                        onClick={() => copyToClipboard(activeTicket.externalTicketCode, "Ticket code")}
                        className="text-green-600 hover:text-green-700"
                        title="Copy ticket code"
                      >
                        <FiCopy size={16} />
                      </button>
                    </div>
                  </div>
                  {activeTicket.adminNotes && (
                    <div>
                      <label className="block text-sm font-medium text-green-800 mb-1">
                        Admin Notes
                      </label>
                      <p className="text-sm text-green-900">{activeTicket.adminNotes}</p>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-green-800 mb-1">
                      Fulfilled Date
                    </label>
                    <p className="text-sm text-green-900">
                      {moment(activeTicket.updatedAt).format("MMM DD, YYYY h:mm A")}
                    </p>
                  </div>
                </div>

                {/* Close button */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <Button
                    onClick={() => {
                      setShowFulfillModal(false);
                      setActiveTicket(null);
                    }}
                    className="p-3 rounded-full text-white py-2"
                  >
                    Close
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
