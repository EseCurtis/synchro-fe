/* eslint-disable @next/next/no-img-element */
"use client";
import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import DefaultTable from "@/app/_components/table/defaultTable";
import TablePagination from "@/app/_components/table/tablePagination";
import { table } from "@/utils/contents/dummy/table";
import React, { useState } from "react";
import Image from "../../../../../node_modules/next/image";
import ServiceDetails from "../components/service_details";
import Modal from "@/app/_components/popups/modal";
import { useQueryClient } from "@tanstack/react-query";
import { useTQuery } from "@/hooks/api/useTQuery";
import { useTMutation } from "@/hooks/api/useTMutation";
import moment from "moment";
import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";
import { Spinner } from "@/app/_components/spinner/Spinner";

const header = [
  "Services ",
  "Location",
  "Packages",
  "Total Earned",
  "Date Created",
  "Actions",
];

const style = "px-6 py-4 whitespace-no-wrap border-b border-gray-300";
const PendingService = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const client = useQueryClient();

  const {
    isLoading: fetching,
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = usePaginatedQuery({
    url: "/service/for-admin?status=pending",
    queryKey: ["services", "pending-services"],
    enabled: true,
  });

  const services = data?.pages?.map((e: any) => e.data.data).flat() as any[];

  const { isLoading, mutate } = useTMutation({
    url: "/service/admin/update-status",
    method: "put",
    options: {
      onSuccess() {
        client.invalidateQueries(["services"]);
      },
    },
  });

  if (fetching) {
    return <Spinner />;
  }

  return (
    <div>
      <DashboardAction />
      {/* @ts-ignore */}
      <DefaultTable header={header}>
        {services?.map((_: any, key: number) => {
          return (
            <tr key={key}>
              <td className={style}>
                <h3>{_.name}</h3>
              </td>
              <td className={style}>
                <h3>{_.address}</h3>
              </td>
              <td className={style}>
                <h3>{_?.packages?.length} Packages</h3>
              </td>
              <td className={style}>
                <h3>{_?.totalRatings}</h3>
              </td>
              <td className={style}>
                <h3>{moment(_?.createdAt).format("MMM DD YYYY")}</h3>
              </td>
              <td className={style}>
                {isLoading ? (
                  <Spinner />
                ) : (
                  <div className="flex items-center justify-space-around">
                    <button
                      onClick={() => {
                        mutate({ eventId: _?.id, status: "approved" });
                      }}
                    >
                      <div className="w-20 h-20">
                        <img
                          src="/images/icons/dashboard/table/tick.svg"
                          className="w-20 h-20 object-contain"
                          alt=""
                        />
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        mutate({ eventId: _?.id, status: "rejected" });
                      }}
                    >
                      <div className="w-20 h-20">
                        <img
                          src="/images/icons/dashboard/table/times.svg"
                          className="w-20 h-20 object-contain"
                          alt=""
                        />
                      </div>
                    </button>

                    <button>
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
              </td>
            </tr>
          );
        })}
      </DefaultTable>

      {services?.length > 0 ? (
        <TablePagination
          loading={isFetchingNextPage}
          onFetchMore={fetchNextPage}
        />
      ) : (
        <p className="pt-4 text-center">No data to display</p>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ServiceDetails />
      </Modal>
    </div>
  );
};

export default PendingService;
