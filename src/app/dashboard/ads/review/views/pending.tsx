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
  BoostStatus,
  useApproveBoost,
  useInfinitePendingBoostReviews,
  useRefundBoost,
  useRejectBoost,
} from "@/hooks/api/boosts/useAdminBoostReview";
import { UserAvatarV2 } from "@/v2/components/common/avatar.component";
import { profileToUser } from "@/v2/helpers/common.helpers";
import { Boost } from "@/v2/types/boost.types";
import { useEffect, useMemo, useState } from "react";
import { BiCheckDouble, BiX } from "react-icons/bi";
import { toast as $toast } from "react-toastify";

const header = [
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
  const limit = 5;
  const [instaDelete, setInstaDelete] = useState<any[]>([]);
  const [modifying, setModifying] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectingBoost, setRejectingBoost] = useState<Boost | null>(null);
  const [rejection, setRejection] = useState<{
    reason?: string;
    amount?: number;
  }>({});
  const [resourceModalOpen, setResourceModalOpen] = useState(false);
  const [activeBoost, setActiveBoost] = useState<Boost | null>(null);

  const { mutate: approve, isLoading: approving } = useApproveBoost();
  const { mutate: reject, isLoading: rejecting } = useRejectBoost();
  const { mutate: refund, isLoading: refunding } = useRefundBoost();

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
    setModifying((prev: any) => [...prev, boost.id]);
    approve(boost.id, {
      onSuccess: () => {
        setToast({ type: "success", message: "Ad approved" });
        setInstaDelete((prev: any) => [...prev, boost.id]);
      },
      onError: (e: any) =>
        setToast({ type: "error", message: e?.message ?? "Failed to approve" }),
      onSettled() {
        setModifying((prev: any) => prev.filter((i: any) => i == boost.id));
        setResourceModalOpen(false);
      },
    });
  }

  function handleReject(boost: Boost) {
    setModifying((prev: any) => [...prev, boost.id]);
    approve(boost.id, {
      onSuccess: () => {
        setToast({ type: "success", message: "Ad rejected" });
        setInstaDelete((prev: any) => [...prev, boost.id]);
      },
      onError: (e: any) =>
        setToast({ type: "error", message: e?.message ?? "Failed to reject" }),
      onSettled() {
        setModifying((prev: any) => prev.filter((i: any) => i == boost.id));
        setResourceModalOpen(false);
      },
    });
  }

  function openRefundModal(boost: Boost) {
    setRejectingBoost(boost);
    setRejection({});
    setShowRejectModal(true);
  }

  function openResource(boost: Boost) {
    setActiveBoost(boost);
    setResourceModalOpen(true);
  }

  function handleRefund() {
    if (!rejectingBoost || !rejection.reason) return;

    setModifying((prev: any) => [...prev, rejectingBoost.id]);
    refund(
      {
        boostId: rejectingBoost.id,
        reason: rejection.reason!,
        amount: rejection.amount,
      },
      {
        onSuccess: () => {
          setToast({ type: "success", message: "Ad rejected" });
          setShowRejectModal(false);
          setRejectingBoost(null);
          setInstaDelete((prev: any) => [...prev, rejectingBoost.id]);
        },
        onError: (e: any) =>
          setToast({
            type: "error",
            message: e?.message ?? "Failed to reject",
          }),

        onSettled() {
          setModifying((prev: any) =>
            prev.filter((i: any) => i == rejectingBoost.id)
          );
          setResourceModalOpen(false);
        },
      }
    );
  }

  function onReject(boost: Boost) {
   // openRefundModal(boost);
    handleReject(boost);
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
      {items.length > 0 ? (
        <>
          <DashboardAction
            isLoading={isFetching}
            onChangeText={setSearch}
            textValue={search}
          />
          <DefaultTable header={columns as any}>
            {items
              .filter((i: any) => !instaDelete.includes(i.id))
              .map((b: Boost) => {
                const Author = () => (
                  <td className=" flex gap-1 items-center   whitespace-no-wrap border-gray-300">
                    <div className="w-[1em] aspect-square bg-gray-500 rounded-full">
                      <UserAvatarV2 user={profileToUser(b.owner!)} />
                    </div>
                    <div>
                      <div className="flex items-center text-xs gap-2">
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
                );
                const pending =
                  (approving || rejecting) && modifying.includes(b.id);

                const Resource = () => {
                  if (b.resourceType == "business") {
                    const business = b.resource?.data;
                    return (
                      <div className="flex gap-2 items-center">
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
                          <div className="flex items-center gap-1 mb-1">
                            <h3 className="text-sm whitespace-nowrap text-left">
                              {business?.businessName}
                            </h3>
                            <span>•</span>
                            <span className="text-xs normal-case text-gray-400 text-left">
                              @{business?.username}
                            </span>
                          </div>

                          <Author />
                        </div>
                      </div>
                    );
                  }

                  if (b.resourceType == "event") {
                    const event = b.resource?.data;
                    return (
                      <div className="flex gap-2  items-center">
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
                          <Author />
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
                  <tr key={b.id} className="border-b ">
                    <td className="px-6 !text-left ![&_*]:text-left whitespace-no-wrap boxrder-b border-gray-300">
                      <button className="py-2" onClick={() => openResource(b)}>
                        <Resource />
                      </button>
                    </td>

                    <td className="px-6 py-4 capitalize text-sm whitespace-no-wrap borxder-b border-gray-300">
                      {b.objective}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm bordxer-b border-gray-300">
                      {budget}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap bordxer-b border-gray-300">
                      {renderStatus(b.status as any)}
                    </td>
                    <td className="px-6 py-4 text-xs whitespace-no-wrap borxder-b border-gray-300">
                      {dates}
                    </td>
                    <td className="px-0 py-5 flex justify-center whitespace-no-wrap boxrder-b border-gray-300">
                      {pending ? (
                        <Spinner />
                      ) : (
                        <div className="flex items-center justify-center gap-3">
                          {b.status !== BoostStatus.ACTIVE && (
                            <div
                              onClick={() => handleApprove(b)}
                              style={{
                                cursor: approving ? "not-allowed" : "pointer",
                                opacity: approving ? 0.5 : 1,
                              }}
                              className="hover:opacity-20"
                            >
                              <BiCheckDouble
                                className="text-green-500 "
                                size={24}
                              />
                            </div>
                          )}
                          <div
                            onClick={() => onReject(b)}
                            style={{
                              cursor: rejecting ? "not-allowed" : "pointer",
                              opacity: rejecting ? 0.5 : 1,
                            }}
                            className="hover:opacity-20"
                          >
                            <BiX className="text-red-500 " size={24} />
                          </div>
                        </div>
                      )}
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

      <Modal isOpen={showRejectModal} onClose={() => setShowRejectModal(false)}>
        <div className="space-y-4">
          <Input
            label="Reason"
            placeholder="Provide human-readable reason"
            onChange={(e: any) =>
              setRejection((r) => ({ ...r, reason: e.target.value }))
            }
          />
          <Input
            label="Amount (optional)"
            placeholder="e.g., 25.00"
            onChange={(e: any) =>
              setRejection((r) => ({
                ...r,
                amount: parseFloat(e.target.value) || undefined,
              }))
            }
          />
          <div className="flex justify-end gap-2 pt-2">
            <SecondaryButton onClick={() => setShowRejectModal(false)}>
              Cancel
            </SecondaryButton>
            <Button
              onClick={handleRefund}
              disabled={rejecting || !rejection.reason}
              isLoading={rejecting && modifying.includes(rejectingBoost?.id)}
            >
              Submit
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={resourceModalOpen}
        onClose={() => setResourceModalOpen(false)}
        // title={
        //   activeBoost?.resource?.type === "event"
        //     ? "Event"
        //     : activeBoost?.resource?.type === "business"
        //     ? "Business"
        //     : undefined
        // }
      >
        {/* Resource preview */}
        {activeBoost?.resource?.type === "business" && (
          <div className="p-2">
            <div className="flex gap-3 items-start">
              <div className="flex overflow-hidden w-[4em] h-[4em] bg-gray-500 rounded-lg">
                <img
                  src={activeBoost.resource.data?.avatar}
                  className="w-[100%] h-[100%] object-fit"
                  alt=""
                  width={64}
                  height={64}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-medium">
                    {activeBoost.resource.data?.businessName}
                  </h3>
                  <span>•</span>
                  <span className="text-xs text-gray-500">
                    @{activeBoost.resource.data?.username}
                  </span>
                </div>
                <div className="text-sm text-gray-700 mb-3">
                  {activeBoost.resource.data?.bio}
                </div>
                <div className="text-xs text-gray-500">
                  {activeBoost.resource.data?.location}
                </div>
              </div>
            </div>

            <div className="mt-4 border-t pt-3">
              <div className="text-xs text-gray-500 mb-2">Owner</div>
              <div className="flex items-center gap-2">
                <div className="w-[2em] aspect-square bg-gray-500 rounded-full">
                  <UserAvatarV2 user={profileToUser(activeBoost.owner!)} />
                </div>
                <div className="text-sm">
                  {activeBoost.owner?.firstName || activeBoost.owner?.lastName
                    ? `${activeBoost.owner?.firstName} ${activeBoost.owner?.lastName}`
                    : activeBoost.owner?.username}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeBoost?.resource?.type === "event" && (
          <div className="p-2">
            <div className="flex gap-3 items-start">
              <div className="flex overflow-hidden w-[4em] h-[4em] bg-gray-500 rounded-lg">
                <img
                  src={activeBoost.resource.data?.banner}
                  className="w-[100%] h-[100%] object-fit"
                  alt=""
                  width={64}
                  height={64}
                />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-medium mb-1">
                  {activeBoost.resource.data?.name}
                </h3>
                <div className="text-xs text-gray-500 mb-2">
                  {activeBoost.resource.data?.address}
                </div>
              </div>
            </div>

            <div className="mt-4 border-t pt-3">
              <div className="text-xs text-gray-500 mb-2">Owner</div>
              <div className="flex items-center gap-2">
                <div className="w-[2em] aspect-square bg-gray-500 rounded-full">
                  <UserAvatarV2 user={profileToUser(activeBoost.owner!)} />
                </div>
                <div className="text-sm">
                  {activeBoost.owner?.firstName || activeBoost.owner?.lastName
                    ? `${activeBoost.owner?.firstName} ${activeBoost.owner?.lastName}`
                    : activeBoost.owner?.username}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        {activeBoost && (
          <div className="flex items-center justify-end gap-3 mt-4 ml-auto">
            {!(
              (approving || rejecting) &&
              modifying.includes(activeBoost?.id)
            ) ? (
              <>
                <SecondaryButton
                  onClick={() => {
                    setRejectingBoost(activeBoost);
                    setShowRejectModal(true);
                    setResourceModalOpen(false);
                  }}
                  disabled={rejecting}
                  className="p-3 rounded-full py-2"
                >
                  Reject
                </SecondaryButton>
                <Button
                  onClick={() => handleApprove(activeBoost)}
                  disabled={approving}
                  className="p-3 rounded-full text-white py-2"
                >
                  Approve
                </Button>
              </>
            ) : (
              <Spinner />
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
