"use client";
import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import Modal from "@/app/_components/popups/modal";
import { Spinner } from "@/app/_components/spinner/Spinner";
import DefaultTable from "@/app/_components/table/defaultTable";
import NoData from "@/app/_components/table/NoData";
import TablePagination from "@/app/_components/table/tablePagination";
import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";
import { BusinessProfile } from "@/v2/types/service.types";
import moment from "moment";
import { useState } from "react";
import ServiceDetails from "../../users/components/user/service_details";

const header = [
  "Services ",
  "Bio",
  "Location",
  "Price",
  "Date Created",
  "Actions",
];

const style = "px-6 py-4 whitespace-no-wrap border-b border-gray-300";
const ApprovedServices = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] =
    useState<BusinessProfile | null>(null);

  const openModal = (service: any) => {
    setIsModalOpen(true);
    setSelectedService(service);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const {
    isLoading,
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
  } = usePaginatedQuery({
    url: `/admin/services/for-admin?status=approved&search=${search}`,
    queryKey: ["services", "approved-services", search],
    enabled: true,
  });

  const services = data?.pages?.map((e: any) => e.data.data).flat() as any[];

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      {services?.length > 0 ? (
        <>
          <DashboardAction
            isLoading={isFetching}
            onChangeText={setSearch}
            textValue={search}
          />
          {/* @ts-ignore */}
          <DefaultTable header={header}>
            {services?.map((_: BusinessProfile, key: number) => {
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
                          {_.services?.[0]?.name}
                        </h3>
                        <u className="text-xs text-gray-400">@{_.username}</u>
                      </div>
                    </div>
                  </td>

                  <td className={style}>
                    <h3 className="text-sm">{_.bio}</h3>
                  </td>
                  <td className={style}>
                    <h3 className="text-sm whitespace-nowrap">{_.location}</h3>
                  </td>
                  <td className={style}>
                    <h3 className="whitespace-nowrap text-sm">
                      {_.currency}
                      {_.serviceType == "hourly" ? _.hourlyRate : _.dailyRate}
                    </h3>
                  </td>

                  <td className={style}>
                    <h3 className="text-xs">
                      {moment(_?.createdAt).format("MMM DD YYYY")}
                    </h3>
                  </td>
                  <td className={style}>
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
        className="md:min-w-[500px]"
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        <ServiceDetails data={selectedService!} />
      </Modal>
    </div>
  );
};

export default ApprovedServices;
