"use client";
import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import Modal from "@/app/_components/popups/modal";
import DefaultTable from "@/app/_components/table/defaultTable";
import NoData from "@/app/_components/table/NoData";
import TablePagination from "@/app/_components/table/tablePagination";
import { Boost } from "@/types/boost";
import { useMemo, useState } from "react";
import EventDetails from "@/app/dashboard/users/components/user/event_details";
import ServiceDetails from "@/app/dashboard/services/components/service_details";
import { AppToast } from "@/app/_components/AppToast";
import Input from "@/app/_components/input_fields";
import { Button } from "@/app/_components/button";
import { BoostStatus, useApproveBoost, useInfinitePendingBoostReviews, useRejectBoost } from "@/hooks/api/boosts/useAdminBoostReview";
import Badge from "@/app/_components/forms/badge";

const header = ["Owner", "Resource", "Objective", "Budget", "Status", "Dates", "Actions"];

export default function PendingBoostsView({ status = BoostStatus.PENDING_REVIEW }: { status?: BoostStatus }) {
  const limit = 20;
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectingBoost, setRejectingBoost] = useState<Boost | null>(null);
  const [rejection, setRejection] = useState<{ rejectionReason?: string; rejectionCategory?: string; policyViolations?: string[]; internalNotes?: string }>({});
  const [resourceModalOpen, setResourceModalOpen] = useState(false);
  const [activeResource, setActiveResource] = useState<any>(null);

  const { mutate: approve, isLoading: approving } = useApproveBoost();
  const { mutate: reject, isLoading: rejecting } = useRejectBoost();

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching } = useInfinitePendingBoostReviews(limit, true, { status, search });
  const items = (data?.pages || []).flatMap((p: any) => p.data?.data ?? []);

  const columns = useMemo(() => header, []);

  function renderStatus(status: string) {
    const map: Record<string, { status: string; label?: string }> = {
      [BoostStatus.PENDING_REVIEW]: { status: "Pending" },
      [BoostStatus.IN_REVIEW]: { status: "under_review", label: "In Review" },
      [BoostStatus.REJECTED]: { status: "rejected", label: "Rejected" },
      [BoostStatus.PENDING_PAYMENT]: { status: "approved", label: "Pending Payment" },
      [BoostStatus.ACTIVE]: { status: "Active" },
      [BoostStatus.PAUSED]: { status: "Disabled", label: "Paused" },
      [BoostStatus.EXPIRED]: { status: "Disabled", label: "Expired" },
      [BoostStatus.CANCELLED]: { status: "Disabled", label: "Cancelled" },
      [BoostStatus.REFUNDED]: { status: "Disabled", label: "Refunded" },
      [BoostStatus.FAILED]: { status: "Disabled", label: "Failed" },
    } as any;
    const meta = map[status] || { status: "pending", label: status };
    return <Badge status={meta.status} label={meta.label} size="small" />;
  }

  function handleApprove(boost: Boost) {
    approve(boost.id, {
      onSuccess: () => setToast({ type: "success", message: "Ad approved" }),
      onError: (e: any) => setToast({ type: "error", message: e?.message ?? "Failed to approve" }),
    });
  }

  function openRejectModal(boost: Boost) {
    setRejectingBoost(boost);
    setRejection({});
    setShowRejectModal(true);
  }

  function openResource(boost: Boost) {
    setActiveResource(boost.resource);
    setResourceModalOpen(true);
  }

  function handleReject() {
    if (!rejectingBoost || !rejection.rejectionReason) return;
    reject(
      { boostId: rejectingBoost.id, payload: { action: "reject", ...rejection } as any },
      {
        onSuccess: () => {
          setToast({ type: "success", message: "Ad rejected" });
          setShowRejectModal(false);
          setRejectingBoost(null);
        },
        onError: (e: any) => setToast({ type: "error", message: e?.message ?? "Failed to reject" }),
      }
    );
  }

  if (isLoading) {
    return <div className="px-6 py-10 text-center">Loading...</div>;
  }

  return (
    <div>
      {toast && (
        <AppToast toastProps={{ type: toast.type }} closeToast={() => setToast(null)}>
          {toast.message}
        </AppToast>
      )}

      {items.length > 0 ? (
        <>
          <DashboardAction isLoading={isFetching} onChangeText={setSearch} textValue={search} />
          <DefaultTable header={columns as any}>
            {items.map((b: Boost) => {
              const resource = `${b.resourceType}:${b.resourceId}`;
              const budget = b.budget ? `$${b.budget}` : "-";
              const dates = `${new Date(b.startAt).toLocaleDateString()} → ${new Date(b.endAt).toLocaleDateString()}`;
              return (
                <tr key={b.id}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">{b.ownerId}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                    <button className="underline" onClick={() => openResource(b)}>
                      {resource}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">{b.objective}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">{budget}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">{renderStatus(b.status as any)}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">{dates}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                    <div className="flex items-center gap-3">
                      <img src="/images/icons/dashboard/table/tick.svg" width={28} height={28} alt="approve" onClick={() => handleApprove(b)} style={{ cursor: approving ? "not-allowed" : "pointer", opacity: approving ? 0.5 : 1 }} />
                      <img src="/images/icons/dashboard/table/times.svg" width={28} height={28} alt="reject" onClick={() => openRejectModal(b)} style={{ cursor: rejecting ? "not-allowed" : "pointer", opacity: rejecting ? 0.5 : 1 }} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </DefaultTable>
          {hasNextPage && (
            <TablePagination loading={isFetchingNextPage} onFetchMore={fetchNextPage} />
          )}
        </>
      ) : (
        <NoData />
      )}

      <Modal isOpen={showRejectModal} onClose={() => setShowRejectModal(false)} title="Reject Ad">
        <div className="space-y-4">
          <Input label="Reason" placeholder="Provide human-readable reason" onChange={(e: any) => setRejection((r) => ({ ...r, rejectionReason: e.target.value }))} />
          <Input label="Category" placeholder="e.g., policy_violation" onChange={(e: any) => setRejection((r) => ({ ...r, rejectionCategory: e.target.value }))} />
          <Input label="Policy Violations (comma-separated)" placeholder="policy_1.2, policy_2.5" onChange={(e: any) => setRejection((r) => ({ ...r, policyViolations: (e.target.value as string).split(",").map((s) => s.trim()).filter(Boolean) }))} />
          <Input label="Internal Notes" placeholder="Visible to admins only" onChange={(e: any) => setRejection((r) => ({ ...r, internalNotes: e.target.value }))} />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setShowRejectModal(false)}>Cancel</Button>
            <Button onClick={handleReject} disabled={rejecting || !rejection.rejectionReason}>Submit</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={resourceModalOpen} onClose={() => setResourceModalOpen(false)}>
        {activeResource?.type === "event" ? (
          <EventDetails event={activeResource.data} />
        ) : activeResource?.type === "business" ? (
          <ServiceDetails data={activeResource.data} onDecline={() => {}} onApprove={() => {}} />
        ) : null}
      </Modal>
    </div>
  );
}


