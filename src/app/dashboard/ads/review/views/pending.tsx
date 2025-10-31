"use client";
import { AppToast } from "@/app/_components/AppToast";
import { Button } from "@/app/_components/button";
import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import Badge from "@/app/_components/forms/badge";
import Input from "@/app/_components/input_fields";
import Modal from "@/app/_components/popups/modal";
import DefaultTable from "@/app/_components/table/defaultTable";
import NoData from "@/app/_components/table/NoData";
import TablePagination from "@/app/_components/table/tablePagination";
import ServiceDetails from "@/app/dashboard/services/components/service_details";
import EventDetails from "@/app/dashboard/users/components/user/event_details";
import {
  BoostStatus,
  useApproveBoost,
  useInfinitePendingBoostReviews,
  useRejectBoost,
} from "@/hooks/api/boosts/useAdminBoostReview";
import { UserAvatarV2 } from "@/v2/components/common/avatar.component";
import { profileToUser } from "@/v2/helpers/common.helpers";
import { Boost } from "@/v2/types/boost.types";
import { useMemo, useState } from "react";
import { BiCheckDouble, BiX } from "react-icons/bi";

const header = [
  "Owner",
  "Resource",
  "Objective",
  "Budget",
  "Status",
  "Dates",
  "Actions",
];

export default function PendingBoostsView({
  status = BoostStatus.PENDING_REVIEW,
}: {
  status?: BoostStatus;
}) {
  const limit = 20;
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectingBoost, setRejectingBoost] = useState<Boost | null>(null);
  const [rejection, setRejection] = useState<{
    rejectionReason?: string;
    rejectionCategory?: string;
    policyViolations?: string[];
    internalNotes?: string;
  }>({});
  const [resourceModalOpen, setResourceModalOpen] = useState(false);
  const [activeResource, setActiveResource] = useState<any>(null);

  const { mutate: approve, isLoading: approving } = useApproveBoost();
  const { mutate: reject, isLoading: rejecting } = useRejectBoost();

  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfinitePendingBoostReviews(limit, true, { status, search });
  const items = (data?.pages || []).flatMap((p: any) => p.data?.data ?? []);

  const columns = useMemo(() => header, []);

  function renderStatus(status: string) {
    const map: Record<string, { status: string; label?: string }> = {
      [BoostStatus.PENDING_REVIEW]: { status: "Pending" },
      [BoostStatus.IN_REVIEW]: { status: "under_review", label: "In Review" },
      [BoostStatus.REJECTED]: { status: "rejected", label: "Rejected" },
      [BoostStatus.PENDING_PAYMENT]: {
        status: "approved",
        label: "Pending Payment",
      },
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
      onError: (e: any) =>
        setToast({ type: "error", message: e?.message ?? "Failed to approve" }),
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
      {
        boostId: rejectingBoost.id,
        payload: { action: "reject", ...rejection } as any,
      },
      {
        onSuccess: () => {
          setToast({ type: "success", message: "Ad rejected" });
          setShowRejectModal(false);
          setRejectingBoost(null);
        },
        onError: (e: any) =>
          setToast({
            type: "error",
            message: e?.message ?? "Failed to reject",
          }),
      }
    );
  }

  if (isLoading) {
    return <div className="px-6 py-10 text-center">Loading...</div>;
  }

  return (
    <div>
      {toast && (
        <AppToast
          toastProps={{ type: toast.type }}
          closeToast={() => setToast(null)}
        >
          {toast.message}
        </AppToast>
      )}

      {items.length > 0 ? (
        <>
          <DashboardAction
            isLoading={isFetching}
            onChangeText={setSearch}
            textValue={search}
          />
          <DefaultTable header={columns as any}>
            {items.map((b: Boost) => {
              const Resource = () => {
                if (b.resourceType == "business") {
                  const business = b.resource?.data;
                  return (
                    <div className="flex gap-2">
                      <div className="flex overflow-hidden w-[3em] h-[3em] bg-gray-500 rounded-lg">
                        <img
                          src={business?.avatar}
                          className="w-[100%] h-[100%] object-fit"
                          alt=""
                          width={50}
                          height={50}
                        />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-sm whitespace-nowrap text-left">
                          {business.businessName}
                        </h3>
                        <u className="text-xs text-gray-400 text-left">
                          @{business.username}
                        </u>
                      </div>
                    </div>
                  );
                }

                if (b.resourceType == "event") {
                  const event = b.resource?.data;
                  return (
                    <div className="flex gap-2">
                      <div className="flex">
                        <div className="flex overflow-hidden w-[3em] h-[3em] bg-gray-500 rounded-lg">
                          <img
                            src={event?.banner}
                            className="w-[100%] h-[100%] object-fit"
                            alt=""
                            width={50}
                            height={50}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-sm whitespace-nowrap text-left">
                          {event.name}
                        </h3>
                      </div>
                    </div>
                  );
                }

                return null;
              };
              const budget = b.budget ? `$${b.budget}` : "-";
              const dates = `${new Date(
                b.startAt
              ).toLocaleDateString()} → ${new Date(
                b.endAt
              ).toLocaleDateString()}`;
              const profile = b?.owner;
              return (
                <tr key={b.id}>
                  <td className="px-6  flex gap-5 items-center  py-4 whitespace-no-wrap border-b border-gray-300">
                    <div className="w-[3em] h-[3em] bg-gray-500 rounded-full">
                      <UserAvatarV2 user={profileToUser(b.owner!)} />
                    </div>
                    <div>
                      <div className="flex items-center text-sm gap-2">
                        <h3>
                          {profile?.firstName || profile?.lastName
                            ? `${profile?.firstName} ${profile?.lastName}`
                            : profile?.username}
                        </h3>
                        {profile?.businessName && (
                          <Badge status="shiny" label="Business" size="small" />
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 !text-left ![&_*]:text-left whitespace-no-wrap border-b border-gray-300">
                    <button className="" onClick={() => openResource(b)}>
                      <Resource />
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                    {b.objective}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                    {budget}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                    {renderStatus(b.status as any)}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                    {dates}
                  </td>
                  <td className="px-0 py-4 whitespace-no-wrap border-b border-gray-300">
                    <div className="flex items-center gap-3">
                      <div
                        onClick={() => handleApprove(b)}
                        style={{
                          cursor: approving ? "not-allowed" : "pointer",
                          opacity: approving ? 0.5 : 1,
                        }}
                         className="hover:opacity-20"
                      >
                        <BiCheckDouble className="text-green-500 " size={24}/>
                      </div>

                       <div
                        onClick={() => openRejectModal(b)}
                       style={{
                          cursor: rejecting ? "not-allowed" : "pointer",
                          opacity: rejecting ? 0.5 : 1,
                        }}
                        className="hover:opacity-20"
                      >
                        <BiX className="text-red-500 " size={24}/>
                      </div>

                     
                    
                    </div>
                  </td>
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

      <Modal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        title="Reject Ad"
      >
        <div className="space-y-4">
          <Input
            label="Reason"
            placeholder="Provide human-readable reason"
            onChange={(e: any) =>
              setRejection((r) => ({ ...r, rejectionReason: e.target.value }))
            }
          />
          <Input
            label="Category"
            placeholder="e.g., policy_violation"
            onChange={(e: any) =>
              setRejection((r) => ({ ...r, rejectionCategory: e.target.value }))
            }
          />
          <Input
            label="Policy Violations (comma-separated)"
            placeholder="policy_1.2, policy_2.5"
            onChange={(e: any) =>
              setRejection((r) => ({
                ...r,
                policyViolations: (e.target.value as string)
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
              }))
            }
          />
          <Input
            label="Internal Notes"
            placeholder="Visible to admins only"
            onChange={(e: any) =>
              setRejection((r) => ({ ...r, internalNotes: e.target.value }))
            }
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="secondary"
              onClick={() => setShowRejectModal(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleReject}
              disabled={rejecting || !rejection.rejectionReason}
            >
              Submit
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={resourceModalOpen}
        onClose={() => setResourceModalOpen(false)}
      >
        {activeResource?.type === "event" ? (
          <EventDetails event={activeResource.data} />
        ) : activeResource?.type === "business" ? (
          <ServiceDetails
            data={activeResource.data}
            onDecline={() => {}}
            onApprove={() => {}}
          />
        ) : null}
      </Modal>
    </div>
  );
}
