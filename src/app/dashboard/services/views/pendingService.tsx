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
import NoData from "@/app/_components/table/NoData";
import { User } from "@/contexts/AuthContext";
import SuspendUser from "../../users/components/suspendUser";
import DeclineVenue from "../../venues/components/declineVenue";
import DeclineService from "../components/declineService";

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
  const [selectedService, setSelectedService] = useState<any>({});

  const openModal = (service: any) => {
    setIsModalOpen(true);
    setSelectedService(service);
  };

  const [suspendUserOpened, setSuspendUserOpened] = useState(false);
  const onDecline = () => setSuspendUserOpened(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setSuspendUserOpened(false);
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
      {services?.length > 0 ? (
        <>
          <DashboardAction />
          {/* @ts-ignore */}
          <DefaultTable header={header}>
            {services?.map((_: any, key: number) => {
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
                    <h3 className="text-sm whitespace-nowrap">
                      {moment(_?.createdAt).format("MMM DD YYYY")}
                    </h3>
                  </td>
                  <td className={style}>
                    {isLoading ? (
                      <Spinner />
                    ) : (
                      <div className="flex items-center justify-space-around">
                        <div className="flex gap-0  w-[200px]">
                          <Image
                            src="/images/icons/dashboard/table/tick.svg"
                            alt=""
                            width={72}
                            height={72}
                            onClick={() => {
                              mutate({ eventId: _?.id, status: "approved" });
                            }}
                          />

                          <Image
                            src="/images/icons/dashboard/table/times.svg"
                            alt=""
                            width={72}
                            height={72}
                            onClick={() => {
                              mutate({ eventId: _?.id, status: "rejected" });
                            }}
                          />
                        </div>

                        <button>
                          <div className="w-10 h-10">
                            <img
                              src="/images/icons/dashboard/table/more.svg"
                              className="w-8 h-8"
                              alt=""
                              onClick={() => openModal(_)}
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
          <TablePagination
            loading={isFetchingNextPage}
            onFetchMore={fetchNextPage}
          />
        </>
      ) : (
        <NoData />
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {suspendUserOpened ? (
          <DeclineService service={selectedService} onClose={closeModal} />
        ) : (
          <ServiceDetails
            data={selectedService}
            onDecline={onDecline}
            onApprove={() => {
              mutate({ eventId: selectedService?.id, status: "approved" });
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default PendingService;
