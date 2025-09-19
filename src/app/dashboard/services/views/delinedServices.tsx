"use client";
import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import Modal from "@/app/_components/popups/modal";
import { Spinner } from "@/app/_components/spinner/Spinner";
import DefaultTable from "@/app/_components/table/defaultTable";
import NoData from "@/app/_components/table/NoData";
import TablePagination from "@/app/_components/table/tablePagination";
import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";
import { useTMutation } from "@/hooks/api/useTMutation";
import { BusinessProfile } from "@/v2/types/service.types";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import Image from "../../../../../node_modules/next/image";
import ServiceDetails from "../components/service_details";

const header = [
  "Services ",
  "Location",
  "Price",
  "Total Rating",
  "Date Created",
  "Actions",
];

const style = "px-6 py-4 whitespace-no-wrap border-b border-gray-300";
const DeclineServices = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>({});

  const openModal = (service: any) => {
    setIsModalOpen(true);
    setSelectedService(service);
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
    url: "/admin/services/for-admin?status=rejected",
    queryKey: ["services", "rejected-services"],
    enabled: true,
  });

  const services = data?.pages?.map((e: any) => e.data.data).flat() as any[];

  const { isLoading, mutate } = useTMutation({
    url: "/admin/services/update-status",
    method: "put",
    options: {
      onSuccess() {
        client.invalidateQueries(["services"]);
        closeModal()
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
            {services?.map((_: BusinessProfile, key: number) => {
              return (
                <tr key={key}>
                  <td className={style}>
                    <div className="flex gap-2">
                      <div className="flex overflow-hidden w-[3em] h-[3em] bg-gray-500 rounded-lg">
                        <Image
                          src={_?.avatar}
                          className="w-[100%] h-[100%] object-fit"
                          alt=""
                          width={50}
                          height={50}
                        />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-sm whitespace-nowrap">{_?.services?.[0].name}</h3>
                        <u className="text-xs text-gray-400">
                          @{_?.username}
                        </u>
                      </div>
                    </div>
                  </td>
                  <td className={style}>
                    <h3 className="text-sm">{_?.location}</h3>
                  </td>
                  <td className={style}>
                    <h3 className="whitespace-nowrap text-sm">
                      {_?.services?.length} Packages
                    </h3>
                  </td>
                  <td className={style}>
                    <h3 className="text-sm">{0.4}</h3>
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
        <ServiceDetails
          data={selectedService}
          onApprove={() => {
            mutate({ eventId: selectedService?.id, status: "approved" });
          }}

          isDeclined
        />
      </Modal>
    </div>
  );
};

export default DeclineServices;
