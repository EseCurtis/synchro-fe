/* eslint-disable @next/next/no-img-element */
"use client";
import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import Modal from "@/app/_components/popups/modal";
import { Spinner } from "@/app/_components/spinner/Spinner";
import DefaultTable from "@/app/_components/table/defaultTable";
import NoData from "@/app/_components/table/NoData";
import TablePagination from "@/app/_components/table/tablePagination";
import {
  usePendingServices,
  useUpdateServiceStatus,
} from "@/hooks/api/v2/services";
import { BusinessProfile } from "@/v2/types/service.types";
import moment from "moment";
import { useState } from "react";
import DeclineService from "../components/declineService";
import ServiceDetails from "../components/service_details";

const header = [
  "Services ",
  "Bio",
  "Location",
  "Price",
  "Date Created",
  "Actions",
  "",
];

const style = "px-6 py-4 whitespace-no-wrap border-b border-gray-300";
const PendingService = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>({});
  const [search, setSearch] = useState("");

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

  const {
    isLoading: fetching,
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
  } = usePendingServices({ search });

  const services = data?.pages?.map((e: any) => e.data.data).flat() as any[];
  const { isLoading, mutate } = useUpdateServiceStatus();

  if (fetching) {
    return <Spinner />;
  }

  return (
    <div>
      {services?.length > 0 ? (
        <>
          {/* @ts-ignore */}
          <DashboardAction
            isLoading={isFetching}
            onChangeText={setSearch}
            textValue={search}
          />
          <DefaultTable header={header as any}>
            {services?.map((_: BusinessProfile, key: number) => {

              console.log("sdhjdfshjdsf", _)
              //return null;

              return (
                <tr key={key}>
                  <td className={style}>
                    <div className="flex gap-2">
                      <div className="flex overflow-hidden w-[3em] h-[3em] bg-gray-500 rounded-lg">
                        <img
                          src={_?.avatar}
                          className="w-[100%] h-[100%] object-fit"
                          alt=""
                          width={50}
                          height={50}
                        />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-sm whitespace-nowrap">
                          {_.services?.[0].name}
                        </h3>
                        <u className="text-xs text-gray-400">@{_?.username}</u>
                      </div>
                    </div>
                  </td>

                  <td className={style}>
                    <h3 className="text-sm">{_.bio}</h3>
                  </td>
                  <td className={style}>
                    <h3 className="text-sm">{_?.location}</h3>
                  </td>
                  <td className={style}>
                    <h3 className="whitespace-nowrap text-sm">
                      {_.currency}
                      {_.serviceType == "hourly" ? _.hourlyRate : _.dailyRate}
                    </h3>
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
                      <div className="flex items-center ">
                        <div className="flex gap-0  w-[200px]">
                          <img
                            src="/images/icons/dashboard/table/tick.svg"
                            alt=""
                            width={72}
                            height={72}
                            onClick={() => {
                              mutate({ eventId: _?.id, status: "approved" });
                            }}
                          />

                          <img
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
