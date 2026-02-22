"use client";
import { AppToast } from "@/app/_components/AppToast";
import { Button } from "@/app/_components/button";
import { SecondaryButton } from "@/app/_components/button/secondaryButton";
import Badge from "@/app/_components/forms/badge";
import Input from "@/app/_components/input_fields";
import { Spinner } from "@/app/_components/spinner/Spinner";
import { useAuthContext } from "@/contexts/AuthContext";
import { useChatMessages, useSendChatMessage } from "@/hooks/api/v2/chat";
import {
  ExternalBookingStatus,
  useFulfillExternalBooking,
  useUpdateExternalBookingStatus,
} from "@/hooks/api/v2/external-bookings";
import { UserAvatarV2 } from "@/v2/components/common/avatar.component";
import { profileToUser } from "@/v2/helpers/common.helpers";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import {
  FiCopy,
  FiExternalLink,
  FiMessageCircle,
  FiSend,
  FiX,
} from "react-icons/fi";
import { toast as $toast } from "react-toastify";

interface BookingDetailDrawerProps {
  booking: any;
  onClose: () => void;
  onFulfilled?: () => void;
  onStatusUpdated?: () => void;
}

export default function BookingDetailDrawer({
  booking,
  onClose,
  onFulfilled,
  onStatusUpdated,
}: BookingDetailDrawerProps) {
  const { user: adminUser } = useAuthContext();
  const [activeTab, setActiveTab] = useState<"details" | "chat">("details");
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const [fulfillmentData, setFulfillmentData] = useState<{
    externalBookingCode?: string;
    adminNotes?: string;
  }>({});
  const [statusUpdateData, setStatusUpdateData] = useState<{
    status?: string;
    adminNotes?: string;
    externalBookingCode?: string;
  }>({
    status: booking.status,
    externalBookingCode: booking.externalBookingCode || "",
  });
  const [showStatusForm, setShowStatusForm] = useState(false);

  const { mutate: fulfill, isLoading: fulfilling } =
    useFulfillExternalBooking();
  const { mutate: updateStatus, isLoading: updatingStatus } =
    useUpdateExternalBookingStatus();

  const venue = booking.venue;
  const profile = booking.clientProfile;
  const user = profile?.user;
  const proxyEmail = user?.mailslurpEmail || user?.email;

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

  function handleFulfill() {
    if (!fulfillmentData.externalBookingCode) {
      setToast({ type: "error", message: "External booking code is required" });
      return;
    }

    fulfill(
      {
        bookingId: booking.id,
        externalBookingCode: fulfillmentData.externalBookingCode,
        adminNotes: fulfillmentData.adminNotes,
      },
      {
        onSuccess: () => {
          setToast({
            type: "success",
            message: "Booking fulfilled successfully",
          });
          setFulfillmentData({});
          onFulfilled?.();
        },
        onError: (e: any) =>
          setToast({
            type: "error",
            message: e?.message ?? "Failed to fulfill booking",
          }),
      }
    );
  }

  function handleStatusUpdate() {
    if (!statusUpdateData.status) {
      setToast({ type: "error", message: "Please select a status" });
      return;
    }

    updateStatus(
      {
        bookingId: booking.id,
        status: statusUpdateData.status,
        adminNotes: statusUpdateData.adminNotes,
        externalBookingCode: statusUpdateData.externalBookingCode,
      },
      {
        onSuccess: () => {
          setToast({
            type: "success",
            message: "Booking status updated successfully",
          });
          setShowStatusForm(false);
          onStatusUpdated?.();
        },
        onError: (e: any) =>
          setToast({
            type: "error",
            message: e?.message ?? "Failed to update booking status",
          }),
      }
    );
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
      setToast(null);
    }
  }, [toast]);

  return (
    <div className="fixed inset-0 z-[100] flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Drawer Panel */}
      <div className="relative ml-auto w-full max-w-[640px] bg-white shadow-xl flex flex-col h-full animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="flex overflow-hidden w-10 h-10 bg-gray-300 rounded-lg">
              <img
                src={
                  venue?.banner ||
                  venue?.images?.[0] ||
                  "/images/placeholder-event.jpg"
                }
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold">{venue?.title}</h2>
              <div className="flex items-center gap-2">
                {renderStatus(booking.status)}
                {venue?.externalPlatformName && (
                  <Badge
                    status="shiny"
                    label={venue.externalPlatformName}
                    size="small"
                  />
                )}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b px-6">
          <button
            onClick={() => setActiveTab("details")}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "details"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Booking Details
          </button>
          <button
            onClick={() => setActiveTab("chat")}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "chat"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <FiMessageCircle size={16} />
            Chat with User
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === "details" ? (
            <DetailsTab
              booking={booking}
              venue={venue}
              profile={profile}
              proxyEmail={proxyEmail}
              fulfillmentData={fulfillmentData}
              setFulfillmentData={setFulfillmentData}
              statusUpdateData={statusUpdateData}
              setStatusUpdateData={setStatusUpdateData}
              showStatusForm={showStatusForm}
              setShowStatusForm={setShowStatusForm}
              fulfilling={fulfilling}
              updatingStatus={updatingStatus}
              handleFulfill={handleFulfill}
              handleStatusUpdate={handleStatusUpdate}
              copyToClipboard={copyToClipboard}
              formatDateRange={formatDateRange}
              renderStatus={renderStatus}
            />
          ) : (
            <ChatTab
              chatId={booking.chatId}
              adminUserId={adminUser?.id}
              customerName={
                profile?.firstName
                  ? `${profile.firstName} ${profile.lastName || ""}`
                  : profile?.username
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

function DetailsTab({
  booking,
  venue,
  profile,
  proxyEmail,
  fulfillmentData,
  setFulfillmentData,
  statusUpdateData,
  setStatusUpdateData,
  showStatusForm,
  setShowStatusForm,
  fulfilling,
  updatingStatus,
  handleFulfill,
  handleStatusUpdate,
  copyToClipboard,
  formatDateRange,
  renderStatus,
}: any) {
  return (
    <div className="p-6 space-y-6">
      {/* Venue Info */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Venue
        </h3>
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex gap-3 items-start">
            <div className="flex overflow-hidden w-16 h-16 bg-gray-300 rounded-lg shrink-0">
              <img
                src={
                  venue?.banner ||
                  venue?.images?.[0] ||
                  "/images/placeholder-event.jpg"
                }
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-base font-medium">{venue?.title}</h4>
              {venue?.type && (
                <span className="text-sm text-gray-500 capitalize">
                  {venue.type}
                </span>
              )}
            </div>
          </div>

          {venue?.externalVenueUrl && (
            <a
              href={venue.externalVenueUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
            >
              View on {venue.externalPlatformName || "external platform"}
              <FiExternalLink size={14} />
            </a>
          )}
        </div>
      </section>

      {/* Booking Info */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Booking Info
        </h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-gray-500">Status</span>
              <div className="mt-1">{renderStatus(booking.status)}</div>
            </div>
            {booking.startDateTime && booking.endDateTime && (
              <div>
                <span className="text-xs text-gray-500">Date & Time</span>
                <div className="text-sm mt-1">
                  {formatDateRange(
                    booking.startDateTime,
                    booking.endDateTime
                  )}
                </div>
              </div>
            )}
            <div>
              <span className="text-xs text-gray-500">Created</span>
              <div className="text-sm mt-1">
                {moment(booking.createdAt).format("MMM DD, YYYY h:mm A")}
              </div>
            </div>
            {booking.attendeesCount && (
              <div>
                <span className="text-xs text-gray-500">Attendees</span>
                <div className="text-sm mt-1">{booking.attendeesCount}</div>
              </div>
            )}
            {booking.eventName && (
              <div className="col-span-2">
                <span className="text-xs text-gray-500">Event Name</span>
                <div className="text-sm mt-1">{booking.eventName}</div>
              </div>
            )}
            {booking.externalBookingCode && (
              <div className="col-span-2">
                <span className="text-xs text-gray-500">Booking Code</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-mono font-medium text-green-700">
                    {booking.externalBookingCode}
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        booking.externalBookingCode,
                        "Booking code"
                      )
                    }
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FiCopy size={14} />
                  </button>
                </div>
              </div>
            )}
            {booking.adminNotes && (
              <div className="col-span-2">
                <span className="text-xs text-gray-500">Admin Notes</span>
                <div className="text-sm mt-1 text-gray-700">
                  {booking.adminNotes}
                </div>
              </div>
            )}
            {booking.confirmedAt && (
              <div>
                <span className="text-xs text-gray-500">Confirmed</span>
                <div className="text-sm mt-1">
                  {moment(booking.confirmedAt).format("MMM DD, YYYY h:mm A")}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* User Info */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Customer
        </h3>
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
              <UserAvatarV2 user={profileToUser(profile)} />
            </div>
            <div>
              <div className="text-sm font-medium">
                {profile?.firstName || profile?.lastName
                  ? `${profile?.firstName} ${profile?.lastName}`
                  : profile?.username}
              </div>
              <div className="text-xs text-gray-500">
                @{profile?.username}
              </div>
            </div>
          </div>

          {profile?.user?.email && (
            <div className="flex items-center justify-between py-2 border-t">
              <div>
                <span className="text-xs text-gray-500">Email</span>
                <div className="text-sm">{profile.user.email}</div>
              </div>
              <button
                onClick={() =>
                  copyToClipboard(profile.user.email, "User email")
                }
                className="text-gray-400 hover:text-gray-600"
              >
                <FiCopy size={14} />
              </button>
            </div>
          )}

          {/* Proxy Email - Highlighted */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="text-xs text-blue-700 font-semibold mb-1">
              PROXY EMAIL (Use this to book)
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono text-blue-900 font-medium break-all">
                {proxyEmail}
              </span>
              <button
                onClick={() => copyToClipboard(proxyEmail, "Proxy email")}
                className="text-blue-600 hover:text-blue-700 shrink-0"
              >
                <FiCopy size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Actions */}
      {booking.status === "pending" && (
        <section className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Fulfill Booking
          </h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <Input
              label="External Booking Code *"
              placeholder="Enter booking code from external platform"
              value={fulfillmentData.externalBookingCode || ""}
              onChange={(e: any) =>
                setFulfillmentData((prev: any) => ({
                  ...prev,
                  externalBookingCode: e.target.value,
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
                placeholder="e.g., Booked via Peerspace using proxy email"
                value={fulfillmentData.adminNotes || ""}
                onChange={(e) =>
                  setFulfillmentData((prev: any) => ({
                    ...prev,
                    adminNotes: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex justify-end">
              {fulfilling ? (
                <Spinner />
              ) : (
                <Button
                  onClick={handleFulfill}
                  disabled={!fulfillmentData.externalBookingCode}
                  className="p-3 rounded-full text-white py-2"
                >
                  Fulfill Booking
                </Button>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Status Update */}
      {booking.status !== "pending" && (
        <section className="space-y-3">
          {!showStatusForm ? (
            <SecondaryButton
              onClick={() => setShowStatusForm(true)}
              className="p-3 rounded-full py-2 w-full"
            >
              Update Status
            </SecondaryButton>
          ) : (
            <>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Update Status
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Status *
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    value={statusUpdateData.status || ""}
                    onChange={(e) =>
                      setStatusUpdateData((prev: any) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                  >
                    {Object.values(ExternalBookingStatus).map((s) => (
                      <option key={s} value={s}>
                        {s
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (c: string) => c.toUpperCase())}
                      </option>
                    ))}
                  </select>
                </div>
                <Input
                  label="External Booking Code"
                  placeholder="Booking code from external platform"
                  value={statusUpdateData.externalBookingCode || ""}
                  onChange={(e: any) =>
                    setStatusUpdateData((prev: any) => ({
                      ...prev,
                      externalBookingCode: e.target.value,
                    }))
                  }
                />
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Admin Notes (optional)
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    rows={2}
                    placeholder="e.g., Event completed successfully"
                    value={statusUpdateData.adminNotes || ""}
                    onChange={(e) =>
                      setStatusUpdateData((prev: any) => ({
                        ...prev,
                        adminNotes: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex justify-end gap-3">
                  {updatingStatus ? (
                    <Spinner />
                  ) : (
                    <>
                      <SecondaryButton
                        onClick={() => setShowStatusForm(false)}
                        className="p-3 rounded-full py-2"
                      >
                        Cancel
                      </SecondaryButton>
                      <Button
                        onClick={handleStatusUpdate}
                        disabled={!statusUpdateData.status}
                        className="p-3 rounded-full text-white py-2"
                      >
                        Update Status
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </section>
      )}
    </div>
  );
}

function ChatTab({
  chatId,
  adminUserId,
  customerName,
}: {
  chatId?: string | null;
  adminUserId?: string;
  customerName?: string;
}) {
  const { data, isLoading } = useChatMessages(chatId);
  const { mutate: sendMessage, isLoading: sending } = useSendChatMessage();
  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const messages: any[] = data?.data || data?.messages || [];
  const sortedMessages = [...messages].sort(
    (a: any, b: any) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sortedMessages.length]);

  function handleSend() {
    if (!chatId || !messageText.trim()) return;

    sendMessage(
      { chatId, message: messageText.trim() },
      {
        onSuccess: () => {
          setMessageText("");
          inputRef.current?.focus();
        },
      }
    );
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  if (!chatId) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20 text-gray-400">
        <FiMessageCircle size={48} className="mb-4 opacity-50" />
        <p className="text-sm">No chat available for this booking</p>
        <p className="text-xs mt-1">
          A chat is created when the user makes a booking
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {sortedMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <FiMessageCircle size={36} className="mb-3 opacity-50" />
            <p className="text-sm">No messages yet</p>
            <p className="text-xs mt-1">
              Send a message to start the conversation
            </p>
          </div>
        ) : (
          sortedMessages.map((msg: any) => {
            const isAdmin =
              msg.senderId === adminUserId ||
              msg.sender?.role === "admin" ||
              msg.isAdmin;
            return (
              <div
                key={msg.id}
                className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                    isAdmin
                      ? "bg-blue-600 text-white rounded-br-md"
                      : "bg-gray-100 text-gray-900 rounded-bl-md"
                  }`}
                >
                  {!isAdmin && (
                    <div className="text-xs font-medium mb-1 text-gray-500">
                      {customerName}
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-wrap break-words">
                    {msg.message || msg.content || msg.text}
                  </p>
                  <div
                    className={`text-[10px] mt-1 ${
                      isAdmin ? "text-blue-200" : "text-gray-400"
                    }`}
                  >
                    {moment(msg.createdAt).format("MMM DD, h:mm A")}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t p-4 bg-white">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={1}
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={handleKeyDown}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
            }}
          />
          <button
            onClick={handleSend}
            disabled={sending || !messageText.trim()}
            className={`p-2.5 rounded-xl transition-colors ${
              messageText.trim()
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            {sending ? <Spinner /> : <FiSend size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}
