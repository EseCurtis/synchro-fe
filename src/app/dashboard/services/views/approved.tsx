"use client";
import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import DefaultTable from "@/app/_components/table/defaultTable";
import TablePagination from "@/app/_components/table/tablePagination";
import { table } from "@/utils/contents/dummy/table";
import { FiMoreHorizontal } from "react-icons/fi";
import React, { useState } from "react";
import Image from "../../../../../node_modules/next/image";
import Modal from "@/app/_components/popups/modal";
import { useTQuery } from "@/hooks/api/useTQuery";
import moment from "moment";
import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";
import { Spinner } from "@/app/_components/spinner/Spinner";
import ServiceDetails from "../../users/components/user/service_details";
import NoData from "@/app/_components/table/NoData";

const header = [
  "Services ",
  "Location",
  "Price",
  "Total Earned",
  "Date Created",
  "Actions",
];

const style = "px-6 py-4 whitespace-no-wrap border-b border-gray-300";
const ApprovedServices = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState({});

  const openModal = (service: any) => {
    setIsModalOpen(true);
    setSelectedService(service);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    usePaginatedQuery({
      url: "/service/for-admin?status=approved",
      queryKey: ["services", "approved-services"],
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
          {" "}
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
          <TablePagination
            loading={isFetchingNextPage}
            onFetchMore={fetchNextPage}
          />
        </>
      ) : (
        <NoData/>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ServiceDetails data={selectedService} />
      </Modal>
    </div>
  );
};

export default ApprovedServices;
