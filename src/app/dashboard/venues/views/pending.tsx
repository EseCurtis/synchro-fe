"use client";
import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import DefaultTable from "@/app/_components/table/defaultTable";
import TablePagination from "@/app/_components/table/tablePagination";
import { table } from "@/utils/contents/dummy/table";
import React, { useState } from "react";
import Image from "../../../../../node_modules/next/image";
import Modal from "@/app/_components/popups/modal";
import VenueDetails from "../../users/components/user/venue_details";
import { useTQuery } from "@/hooks/api/useTQuery";
import moment from "moment";
import Link from "next/link";
import { Spinner } from "@/app/_components/spinner/Spinner";
import { useTMutation } from "@/hooks/api/useTMutation";
import { useQueryClient } from "@tanstack/react-query";
import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";
import NoData from "@/app/_components/table/NoData";

const header = [
  "Venue ",
  "User",
  "Location",
  "Type",
  "Date Created",
  "Actions",
];

const style = "px-6 py-4 whitespace-no-wrap border-b border-gray-300";
const PendingVenues = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  const openModal = (data: any) => {
    setIsModalOpen(true);
    setSelectedData(data);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const client = useQueryClient();

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    usePaginatedQuery({
      url: "/venue/for-admin?status=pending",
      queryKey: ["venues", "pending-venues"],
      enabled: true,
    });

  const venue = data?.pages?.map((e: any) => e.data.data).flat() as any[];

  const { isLoading, mutate } = useTMutation({
    url: "/venue/admin/update-status",
    method: "put",
    options: {
      onSuccess() {
        client.invalidateQueries(["venues"]);
      },
    },
  });

  return (
    <div>
      {venue?.length > 0 ? (
        <>
          <DashboardAction />
          {/* @ts-ignore */}
          <DefaultTable header={header}>
            {venue?.map((_: any, key: number) => {
              return (
                <tr key={key}>
                  <td className={style}>
                    <div className="flex gap-2">
                      <div className="flex overflow-hidden w-[3em] h-[3em] bg-gray-500 rounded-lg">
                        <Image
                          src={JSON.parse(_?.images[0]).url}
                          className="w-[100%] h-[100%] object-fit"
                          alt=""
                          width={50}
                          height={50}
                        />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-sm whitespace-nowrap">{_.name}</h3>
                        <u className="text-xs text-gray-400">
                          @{_.user.username}
                        </u>
                      </div>
                    </div>
                  </td>
                  <td className={style}>
                    <h3 className="text-sm">{_.address}</h3>
                  </td>
                  <td className={style}>
                    <h3 className="whitespace-nowrap text-sm">
                      {_?.packages?.length} Packages
                    </h3>
                  </td>
                  <td className={style}>
                    <h3 className="text-sm">{_?.totalRatings}</h3>
                  </td>
                  <td className={style}>
                    <h3 className="text-sm">
                      {moment(_?.createdAt).format("MMM DD YYYY")}
                    </h3>
                  </td>
                  <td className={style}>
                    <div>
                      {isLoading ? (
                        <Spinner />
                      ) : (
                        <div className="flex items-center justify-space-around">
                          <button
                            onClick={() => {
                              mutate({ eventId: _?.id, status: "approved" });
                            }}
                          >
                            <Image
                              src="/images/icons/dashboard/table/tick.svg"
                              width={80}
                              height={80}
                              alt=""
                            />
                          </button>

                          <button
                            onClick={() => {
                              mutate({ eventId: _?.id, status: "rejected" });
                            }}
                          >
                            <div className="w-10 h-10">
                              <img
                                src="/images/icons/dashboard/table/more.svg"
                                className="w-8 h-8"
                                alt=""
                                onClick={openModal}
                              />
                            </div>
                          </button>
                        </div>
                      )}
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

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <VenueDetails data={selectedData} />
      </Modal>
    </div>
  );
};

export default PendingVenues;
